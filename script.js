// ==========================================
// LOGBOOK - IBIS STYLES
// Versão 0.2
// ==========================================

let registros = [];

// -------------------------------
// Inicialização
// -------------------------------

window.onload = function () {

    preencherData();

    preencherHora();

    carregarRegistros();

    document
        .getElementById("btnSalvar")
        .addEventListener("click", salvarRegistro);

};

// -------------------------------
// Data atual
// -------------------------------

function preencherData() {

    const hoje = new Date();

    document.getElementById("data").value =
        hoje.toISOString().split("T")[0];

}

// -------------------------------
// Hora atual
// -------------------------------

function preencherHora() {

    const agora = new Date();

    let hora = String(agora.getHours()).padStart(2, "0");
    let minuto = String(agora.getMinutes()).padStart(2, "0");

    document.getElementById("hora").value =
        hora + ":" + minuto;

}

// -------------------------------
// Salvar Registro
// -------------------------------

function salvarRegistro() {

    const hora =
        document.getElementById("hora").value;

    const atividade =
        document.getElementById("atividade").value;

    const quarto =
        document.getElementById("quarto").value;

    const descricao =
        document.getElementById("descricao").value;

    if (descricao.trim() == "") {

        alert("Digite uma descrição.");

        return;

    }

    registros.push({

        hora,
        atividade,
        quarto,
        descricao

    });

    salvarLocal();

    atualizarTabela();

    limparFormulario();

    bootstrap.Modal
        .getInstance(document.getElementById("modalRegistro"))
        .hide();

}

// -------------------------------
// Atualizar tabela
// -------------------------------

function atualizarTabela() {

    const tabela =
        document.getElementById("listaRegistros");

    tabela.innerHTML = "";

    if (registros.length == 0) {

        tabela.innerHTML = `

        <tr>

            <td colspan="5"
                class="text-center text-muted py-5">

                Nenhum registro encontrado.

            </td>

        </tr>

        `;

        return;

    }

    registros.forEach(function (registro, indice) {

        tabela.innerHTML += `

        <tr>

            <td>${registro.hora}</td>

            <td>${registro.atividade}</td>

            <td>${registro.quarto}</td>

            <td>${registro.descricao}</td>

            <td>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="excluirRegistro(${indice})">

                    🗑

                </button>

            </td>

        </tr>

        `;

    });

}

// -------------------------------
// Excluir
// -------------------------------

function excluirRegistro(indice){

    if(confirm("Excluir este registro?")){

        registros.splice(indice,1);

        salvarLocal();

        atualizarTabela();

    }

}

// -------------------------------
// Local Storage
// -------------------------------

function salvarLocal(){

    localStorage.setItem(

        "logbook",

        JSON.stringify(registros)

    );

}

function carregarRegistros(){

    let dados =

        localStorage.getItem("logbook");

    if(dados){

        registros = JSON.parse(dados);

    }

    atualizarTabela();

}

// -------------------------------
// Limpar formulário
// -------------------------------

function limparFormulario(){

    preencherHora();

    document.getElementById("quarto").value="";

    document.getElementById("descricao").value="";

}
