// =====================================================
// LOGBOOK - REPORTS
// Sistema de notificações
// Versão 1.1
// =====================================================


// =====================================================
// CONFIGURAÇÃO
// =====================================================

const REPORTS_CONFIG = {

    nomeSistema: "LogBook",

    nomeHotel: "ibis Styles"

};


// =====================================================
// REPORTAR REGISTRO
// =====================================================

function reportarRegistro(indice) {

    console.log("=================================");
    console.log("REPORTANDO REGISTRO");
    console.log("Índice:", indice);
    console.log("=================================");


    // Verifica se o vetor de registros existe

    if (
        typeof registros === "undefined" ||
        !Array.isArray(registros)
    ) {

        console.error(
            "Não foi possível acessar os registros."
        );

        alert(
            "Erro: os registros não foram encontrados."
        );

        return;

    }


    // Verifica se o registro existe

    if (!registros[indice]) {

        console.error(
            "Registro não encontrado:",
            indice
        );

        alert(
            "Registro não encontrado."
        );

        return;

    }


    // Obtém o registro

    const registro =
        registros[indice];


    // Mostra os dados no console

    console.log(
        "Registro selecionado:",
        registro
    );


    // Obtém funcionário

    const funcionarioElemento =
        document.getElementById("funcionario");

    const funcionario =
        funcionarioElemento
            ? funcionarioElemento.value
            : "";


    // Obtém turno

    const turnoElemento =
        document.getElementById("turno");

    const turno =
        turnoElemento
            ? turnoElemento.value
            : "";


    // Obtém data

    const dataElemento =
        document.getElementById("data");

    const data =
        dataElemento
            ? dataElemento.value
            : "";


    // Mostra todas as informações

    console.log("Funcionário:", funcionario);

    console.log("Turno:", turno);

    console.log("Data:", data);

    console.log("Atividade:", registro.atividade);

    console.log("Quarto:", registro.quarto);

    console.log("Descrição:", registro.descricao);

    console.log("Hora:", registro.hora);


    // Confirmação temporária

    alert(
        "Registro selecionado para reportar:\n\n" +

        registro.atividade +

        "\nQuarto: " +

        (registro.quarto || "Não informado") +

        "\n\n" +

        registro.descricao

    );

}


// =====================================================
// FORMATA DATA
// =====================================================

function formatarDataReport(data) {

    if (!data) {

        return "";

    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {

        return data;

    }


    return (

        partes[2] +

        "/" +

        partes[1] +

        "/" +

        partes[0]

    );

}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

console.log(
    "Módulo Reports v1.1 carregado."
);
