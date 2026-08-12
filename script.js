// =====================================================
// LOGBOOK - ibis Styles
// Versão 2.0
// Parte 1
// =====================================================

// ================================================
// DADOS
// ================================================

let registros = [];

let registroEditando = -1;

// ================================================
// INICIALIZAÇÃO
// ================================================

document.addEventListener("DOMContentLoaded", iniciarSistema);

// ================================================
// INICIAR SISTEMA
// ================================================

function iniciarSistema() {

    preencherDataAtual();

    preencherHoraAtual();

    carregarLocalStorage();

    configurarEventos();

    atualizarTabela();

    atualizarContador();

    atualizarCampos();

}

// ================================================
// EVENTOS
// ================================================

function configurarEventos() {

    document
        .getElementById("atividade")
        .addEventListener("change", atualizarCampos);

    document
        .getElementById("btnSalvar")
        .addEventListener("click", salvarRegistro);

    document
        .getElementById("pesquisa")
        .addEventListener("input", pesquisarRegistros);

}

// ================================================
// DATA
// ================================================

function preencherDataAtual() {

    const hoje = new Date();

    document.getElementById("data").value =
        hoje.toISOString().split("T")[0];

}

// ================================================
// HORA
// ================================================

function preencherHoraAtual() {

    const agora = new Date();

    const hora =
        String(agora.getHours()).padStart(2, "0");

    const minuto =
        String(agora.getMinutes()).padStart(2, "0");

    document.getElementById("hora").value =
        hora + ":" + minuto;

}

// ================================================
// MOSTRAR / ESCONDER CAMPOS
// ================================================

function atualizarCampos() {

    esconderTodosCampos();

    const atividade = document.getElementById("atividade").value;

    const config = CONFIG.atividades[atividade];

    if (!config) return;

    config.campos.forEach(function(campo){

        switch(campo){

            case "pagamento":
                mostrar("grupoPagamento");
                break;

            case "valor":
                mostrar("grupoValor");
                break;

            case "reserva":
                mostrar("grupoReserva");
                break;

            case "despertar":
                mostrar("grupoDespertar");
                break;

        }

    });

}

// ================================================
// ESCONDER CAMPOS
// ================================================

function esconderTodosCampos() {

    esconder("grupoPagamento");

    esconder("grupoValor");

    esconder("grupoReserva");

    esconder("grupoDespertar");

}

// ================================================
// MOSTRAR
// ================================================

function mostrar(id) {

    console.log("Mostrando:", id);

    const elemento = document.getElementById(id);

    if (!elemento) {

        console.error("Elemento não encontrado:", id);

        return;

    }

    elemento.style.display = "block";

}

// ================================================
// ESCONDER
// ================================================

function esconder(id) {

    document.getElementById(id).style.display = "none";

}
// =====================================================
// PARTE 2
// SALVAR REGISTRO
// =====================================================

function salvarRegistro() {

    const registro = {

        hora: document.getElementById("hora").value,

        atividade: document.getElementById("atividade").value,

        quarto: document.getElementById("quarto").value,

        pagamento: document.getElementById("pagamento").value,

        valor: document.getElementById("valor").value,

        reserva: document.getElementById("reserva").value,

        despertar: document.getElementById("horaDespertar").value,

        descricao: document.getElementById("descricao").value

    };

    if (registro.descricao.trim() === "") {

        alert("Digite uma descrição.");

        return;

    }

    if (registroEditando === -1) {

        registros.push(registro);

    } else {

        registros[registroEditando] = registro;

        registroEditando = -1;

    }

    salvarLocalStorage();

    atualizarTabela();

    atualizarContador();

    limparFormulario();

    bootstrap.Modal
        .getInstance(document.getElementById("modalRegistro"))
        .hide();

}

// =====================================================
// LIMPAR FORMULÁRIO
// =====================================================

function limparFormulario() {

    preencherHoraAtual();

    document.getElementById("atividade").selectedIndex = 0;

    document.getElementById("quarto").value = "";

    document.getElementById("pagamento").selectedIndex = 0;

    document.getElementById("valor").value = "";

    document.getElementById("reserva").value = "";

    document.getElementById("horaDespertar").value = "";

    document.getElementById("descricao").value = "";

    atualizarCampos();

}

// =====================================================
// ATUALIZAR TABELA
// =====================================================

function atualizarTabela(lista = registros) {

    const tbody =
        document.getElementById("listaRegistros");

    tbody.innerHTML = "";

    if (lista.length === 0) {

        tbody.innerHTML = `

        <tr>

            <td colspan="5"
                class="text-center text-muted py-5">

                Nenhum registro encontrado.

            </td>

        </tr>

        `;

        return;

    }

    lista.forEach((registro, indice) => {

        let resumo = "";

        if (registro.pagamento)
            resumo += "💳 " + registro.pagamento + " ";

        if (registro.valor)
            resumo += "R$ " + registro.valor + " ";

        if (registro.reserva)
            resumo += "Reserva: " + registro.reserva + " ";

        if (registro.despertar)
            resumo += "Despertar: " + registro.despertar + " ";

        if (resumo === "")
            resumo = registro.descricao;

        tbody.innerHTML += `

        <tr>

            <td>${registro.hora}</td>

            <td>${registro.atividade}</td>

            <td>${registro.quarto}</td>

            <td>${resumo}</td>

            <td>

                <button
                    class="btn btn-sm btn-outline-primary"
                    onclick="editarRegistro(${indice})">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-sm btn-outline-danger"
                    onclick="excluirRegistro(${indice})">

                    <i class="bi bi-trash"></i>

              <button
    class="btn btn-sm btn-outline-success"
    onclick="reportarRegistro(${indice})"
    title="Gerar Report">

    <i class="bi bi-save"></i>

</button>

            </td>

        </tr>

        `;

    });

}
// =====================================================
// PARTE 3
// EDITAR REGISTRO
// =====================================================

function editarRegistro(indice) {

    const registro = registros[indice];

    registroEditando = indice;

    document.getElementById("hora").value = registro.hora;
    document.getElementById("atividade").value = registro.atividade;
    document.getElementById("quarto").value = registro.quarto;

    atualizarCampos();

    document.getElementById("pagamento").value = registro.pagamento || "";
    document.getElementById("valor").value = registro.valor || "";
    document.getElementById("reserva").value = registro.reserva || "";
    document.getElementById("horaDespertar").value = registro.despertar || "";

    document.getElementById("descricao").value = registro.descricao;

    const modal = new bootstrap.Modal(
        document.getElementById("modalRegistro")
    );

    modal.show();

}

// =====================================================
// EXCLUIR
// =====================================================

function excluirRegistro(indice) {

    if (!confirm("Deseja excluir este registro?"))
        return;

    registros.splice(indice, 1);

    salvarLocalStorage();

    atualizarTabela();

    atualizarContador();

}

// =====================================================
// LOCAL STORAGE
// =====================================================

function salvarLocalStorage() {

    localStorage.setItem(

        "logbook",

        JSON.stringify(registros)

    );

}

function carregarLocalStorage() {

    const dados = localStorage.getItem("logbook");

    if (dados) {

        registros = JSON.parse(dados);

    }

}

// =====================================================
// CONTADOR
// =====================================================

function atualizarContador() {

    document.getElementById("contadorRegistros").innerHTML =

        registros.length +

        (registros.length === 1

            ? " registro"

            : " registros");

}

// =====================================================
// PESQUISA
// =====================================================

function pesquisarRegistros() {

    const texto =

        document
            .getElementById("pesquisa")
            .value
            .toLowerCase();

    if (texto === "") {

        atualizarTabela();

        return;

    }

    const filtrados = registros.filter(function(registro){

        return (

            registro.hora.toLowerCase().includes(texto) ||

            registro.atividade.toLowerCase().includes(texto) ||

            registro.quarto.toString().includes(texto) ||

            registro.descricao.toLowerCase().includes(texto) ||

            (registro.pagamento || "").toLowerCase().includes(texto) ||

            (registro.reserva || "").toLowerCase().includes(texto)

        );

    });

    atualizarTabela(filtrados);

}
// =====================================================
// PARTE 4
// UTILITÁRIOS
// =====================================================

// -------------------------------------
// Retorna um resumo do registro
// -------------------------------------

function gerarResumo(registro){

    switch(registro.atividade){

        case "Check-in":

        case "Check-out":

        case "Walk-in":

        case "Pagamento":

            return registro.pagamento
                ? "💳 " + registro.pagamento
                : registro.descricao;

        case "Estorno":

            return "💳 " +
                (registro.pagamento || "-") +
                " | 💲 " +
                (registro.valor || "-");

        case "Cancelamento":

        case "No Show":

            return registro.reserva
                ? "Reserva: " + registro.reserva
                : registro.descricao;

        case "Despertar":

            return registro.despertar
                ? "⏰ " + registro.despertar
                : registro.descricao;

        default:

            return registro.descricao;

    }

}

// =====================================================
// ABRIR MODAL PARA NOVO REGISTRO
// =====================================================

const modalRegistro = document.getElementById("modalRegistro");

modalRegistro.addEventListener("shown.bs.modal", function(){

    if(registroEditando === -1){

        limparFormulario();

    }

});

// =====================================================
// FECHAR MODAL
// =====================================================

modalRegistro.addEventListener("hidden.bs.modal", function(){

    registroEditando = -1;

});

// =====================================================
// EXPORTAÇÃO PDF
// (pdf.js utilizará o vetor registros)
// =====================================================

window.getRegistros = function(){

    return registros;

}

// =====================================================
// VERSÃO
// =====================================================

console.log("LogBook v2.0 carregado com sucesso.");
