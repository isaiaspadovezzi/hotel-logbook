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
    document
    .getElementById("data")
    .addEventListener("change", mudarDataLogbook);

}
// =====================================================
// MUDAR DATA DO LOGBOOK
// =====================================================

function mudarDataLogbook() {

    carregarLocalStorage();

    atualizarTabela();

    atualizarContador();

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

    // Garante que o campo "Novo Quarto"
    // exista no formulário
    garantirCampoQuartoDestino();


    esconderTodosCampos();


    const atividade =
        document.getElementById("atividade").value;


    const config =
        CONFIG.atividades[atividade];


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


    // =================================================
    // TROCA / MUDANÇA DE QUARTO
    // =================================================

    if (
        atividade === "Troca de Quarto" ||
        atividade === "Mudança de Quarto"
    ) {

        mostrar("grupoQuartoDestino");

    }

}
// =====================================================
// CRIAR CAMPO NOVO QUARTO
// =====================================================

function garantirCampoQuartoDestino() {

    // Se já existe, não cria novamente
    if (
        document.getElementById("grupoQuartoDestino")
    ) {
        return;
    }


    const campoQuarto =
        document.getElementById("quarto");


    if (!campoQuarto) {
        return;
    }


    // Procura o container do campo Quarto
    const containerQuarto =
        campoQuarto.closest(".mb-3") ||
        campoQuarto.parentElement;


    if (!containerQuarto) {
        return;
    }


    // Cria o grupo
    const grupo =
        document.createElement("div");


    grupo.id =
        "grupoQuartoDestino";


    grupo.className =
        "mb-3";


    grupo.style.display =
        "none";


    grupo.innerHTML = `

        <label
            for="quartoDestino"
            class="form-label"
        >
            Novo quarto
        </label>


        <input
            type="text"
            class="form-control"
            id="quartoDestino"
            placeholder="Digite o novo quarto"
            autocomplete="off"
        >

    `;


    // Coloca logo depois do campo Quarto
    containerQuarto.after(grupo);

}
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

    hora:
        document.getElementById("hora").value,


    atividade:
        document.getElementById("atividade").value,


    quarto:
        document.getElementById("quarto").value,


    quartoDestino:
        document.getElementById("quartoDestino")?.value || "",


    pagamento:
        document.getElementById("pagamento").value,


    valor:
        document.getElementById("valor").value,


    reserva:
        document.getElementById("reserva").value,


    despertar:
        document.getElementById("horaDespertar").value,


    descricao:
        document.getElementById("descricao").value

};


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
    const quartoDestino =
    document.getElementById("quartoDestino");

if (quartoDestino) {

    quartoDestino.value = "";

}

    atualizarCampos();

}
const quartoDestino =
    document.getElementById("quartoDestino");


if (quartoDestino) {

    quartoDestino.value =
        registro.quartoDestino || "";

}

// =====================================================
// ATUALIZAR TABELA
// =====================================================
// =====================================================
// ÍCONE DA ATIVIDADE
// =====================================================

function iconeAtividade(atividade) {

    const nome =
        (atividade || "")
            .toLowerCase()
            .trim();


    if (nome === "check-in") {

        return `
            <i
                class="bi bi-person-check"
                title="Check-in">
            </i>
        `;

    }


    if (nome === "check-out") {

        return `
            <i
                class="bi bi-box-arrow-right"
                title="Check-out">
            </i>
        `;

    }


    if (nome === "manutenção") {

        return `
            <i
                class="bi bi-tools"
                title="Manutenção">
            </i>
        `;

    }


    if (nome === "reserva") {

        return `
            <i
                class="bi bi-calendar-check"
                title="Reserva">
            </i>
        `;

    }


    if (nome === "pagamento") {

        return `
            <i
                class="bi bi-credit-card"
                title="Pagamento">
            </i>
        `;

    }


    if (nome === "despertar") {

        return `
            <i
                class="bi bi-alarm"
                title="Despertar">
            </i>
        `;

    }


    return `
        <i
            class="bi bi-clipboard"
            title="${atividade}">
        </i>
    `;

}
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
        if (
    registro.quartoDestino &&
    (
        registro.atividade === "Troca de Quarto" ||
        registro.atividade === "Mudança de Quarto"
    )
) {

    resumo +=
        "Novo quarto: " +
        registro.quartoDestino +
        " ";

}

        if (resumo === "")
            resumo = registro.descricao;

        tbody.innerHTML += `

        <tr>

            <td>${registro.hora}</td>

       <td>
    ${iconeAtividade(registro.atividade)}
    ${registro.atividade}
</td>

        <td>
    <strong>${registro.quarto || "-"}</strong>
</td>

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

// =====================================================
// SALVAR LOGBOOK POR DATA
// =====================================================

function salvarLocalStorage() {

    const data =
        document.getElementById("data").value;

    if (!data) {

        console.error(
            "Data do LogBook não encontrada."
        );

        return;

    }

    let arquivo =
        JSON.parse(
            localStorage.getItem("logbookArquivo")
        ) || {};

    arquivo[data] = registros;

    localStorage.setItem(
        "logbookArquivo",
        JSON.stringify(arquivo)
    );

}



// =====================================================
// CARREGAR LOGBOOK DA DATA SELECIONADA
// COM MIGRAÇÃO DOS REGISTROS ANTIGOS
// =====================================================

function carregarLocalStorage() {

    const data =
        document.getElementById("data").value;

    if (!data) {

        registros = [];

        return;

    }


    // =================================================
    // NOVO ARQUIVO POR DATA
    // =================================================

    let arquivo =
        JSON.parse(
            localStorage.getItem("logbookArquivo")
        ) || {};


    // =================================================
    // VERIFICA SE EXISTE O LOGBOOK ANTIGO
    // =================================================

    const antigo =
        localStorage.getItem("logbook");


    if (
        antigo &&
        Object.keys(arquivo).length === 0
    ) {

        try {

            const registrosAntigos =
                JSON.parse(antigo);


            if (
                Array.isArray(registrosAntigos) &&
                registrosAntigos.length > 0
            ) {

                // Coloca os registros antigos
                // na data que está selecionada

                arquivo[data] =
                    registrosAntigos;


                // Salva no novo sistema

                localStorage.setItem(
                    "logbookArquivo",
                    JSON.stringify(arquivo)
                );

                console.log(
                    "Registros antigos migrados para:",
                    data
                );

            }

        } catch (erro) {

            console.error(
                "Erro ao migrar registros antigos:",
                erro
            );

        }

    }


    // =================================================
    // CARREGA A DATA ATUAL
    // =================================================

    registros =
        arquivo[data] || [];


    console.log(
        "LogBook carregado:",
        data,
        registros.length,
        "registros"
    );

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
// =====================================================
// ABRIR ARQUIVO DO LOGBOOK
// =====================================================

function abrirArquivoLogbook() {

    const arquivo =
        JSON.parse(
            localStorage.getItem("logbookArquivo")
        ) || {};


    const datas =
        Object.keys(arquivo)
            .sort()
            .reverse();


    const lista =
        document.getElementById(
            "listaArquivoLogbook"
        );


    lista.innerHTML = "";


    // =============================================
    // NENHUM ARQUIVO
    // =============================================

    if (datas.length === 0) {

        lista.innerHTML = `

            <div class="text-center text-muted py-4">

                <i class="bi bi-folder2"
                   style="font-size: 32px;">
                </i>

                <p class="mt-2 mb-0">

                    Nenhum dia arquivado.

                </p>

            </div>

        `;

    }


    // =============================================
    // LISTA DE DATAS
    // =============================================

    datas.forEach(function(data) {

        const quantidade =
            Array.isArray(arquivo[data])
                ? arquivo[data].length
                : 0;


        const partes =
            data.split("-");


        const dataFormatada =
            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0];


        lista.innerHTML += `

            <button
                type="button"
                class="list-group-item
                       list-group-item-action
                       d-flex
                       justify-content-between
                       align-items-center"
                onclick="abrirDiaArquivo('${data}')">

                <div>

                    <i class="bi bi-calendar3
                              text-success me-2">
                    </i>

                    <strong>
                        ${dataFormatada}
                    </strong>

                </div>


                <span class="badge
                             bg-success
                             rounded-pill">

                    ${quantidade}

                </span>

            </button>

        `;

    });


    // =============================================
    // ABRIR MODAL
    // =============================================

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "modalArquivoLogbook"
            )
        );


    modal.show();

}
// =====================================================
// ABRIR DIA DO ARQUIVO
// =====================================================

function abrirDiaArquivo(data) {

    const arquivo =
        JSON.parse(
            localStorage.getItem("logbookArquivo")
        ) || {};


    // Carrega os registros daquele dia

    registros =
        arquivo[data] || [];


    // Altera a data do LogBook

    document.getElementById("data").value = data;


    // Atualiza a tabela

    atualizarTabela();


    // Atualiza contador

    atualizarContador();


    // Limpa pesquisa

    const pesquisa =
        document.getElementById("pesquisa");

    if (pesquisa) {

        pesquisa.value = "";

    }


    // Fecha o modal do Arquivo

    const elementoModal =
        document.getElementById(
            "modalArquivoLogbook"
        );


    const modal =
        bootstrap.Modal.getInstance(
            elementoModal
        );


    if (modal) {

        modal.hide();

    }


    console.log(
        "Dia do LogBook aberto:",
        data,
        registros.length,
        "registros"
    );

}
