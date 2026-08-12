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

   abrirPreviewReport(registro);

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
// =====================================================
// PRÉVIA DO REPORT
// =====================================================

function abrirPreviewReport(registro) {

    const funcionarioElemento =
        document.getElementById("funcionario");

    const turnoElemento =
        document.getElementById("turno");

    const dataElemento =
        document.getElementById("data");


    const funcionario =
        funcionarioElemento
            ? funcionarioElemento.value
            : "";

    const turno =
        turnoElemento
            ? turnoElemento.value
            : "";

    const data =
        dataElemento
            ? formatarDataReport(dataElemento.value)
            : "";


    // Remove uma prévia anterior

    const anterior =
        document.getElementById("reportPreview");

    if (anterior) {

        anterior.remove();

    }


    // Cria a janela

    const overlay =
        document.createElement("div");

    overlay.id =
        "reportPreview";

    overlay.className =
        "report-preview-overlay";


    overlay.innerHTML = `

        <div class="report-preview-modal">

            <div class="report-preview-header">

                <strong>
                    Prévia do Report
                </strong>

                <button
                    type="button"
                    class="report-preview-close"
                    onclick="fecharPreviewReport()">

                    ×

                </button>

            </div>


            <div class="report-preview-content">

                <div class="report-card">

                    <div class="report-header">

                        <div class="report-header-title">

                            LOGBOOK

                        </div>

                        <img
                            src="img/logo.png"
                            class="report-logo"
                            alt="ibis Styles">

                    </div>


                    <div class="report-body">

                        <div class="report-type">

                            ${registro.atividade || "OCORRÊNCIA"}

                        </div>


                        <div class="report-room-label">

                            QUARTO

                        </div>


                        <div class="report-room">

                            ${registro.quarto || "-"}

                        </div>


                        <div class="report-description">

                            ${registro.descricao || "-"}

                        </div>


                        <div class="report-info">

                            <div class="report-info-item">

                                <span class="report-info-label">
                                    Funcionário
                                </span>

                                ${funcionario || "-"}

                            </div>


                            <div class="report-info-item">

                                <span class="report-info-label">
                                    Turno
                                </span>

                                ${turno || "-"}

                            </div>


                            <div class="report-info-item">

                                <span class="report-info-label">
                                    Data
                                </span>

                                ${data || "-"}

                            </div>


                            <div class="report-info-item">

                                <span class="report-info-label">
                                    Hora
                                </span>

                                ${registro.hora || "-"}

                            </div>

                        </div>

                    </div>


                    <div class="report-footer">

                        <span>
                            ibis Styles
                        </span>

                        <span>
                            Comunicação interna
                        </span>

                    </div>

                </div>

            </div>


            <div class="report-preview-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="fecharPreviewReport()">

                    Cancelar

                </button>

<button
    type="button"
    class="btn btn-success"
    onclick="compartilharReport()">

    <i class="bi bi-share"></i>

    Compartilhar Report

</button>

            </div>

        </div>

    `;


    document.body.appendChild(overlay);

}


// =====================================================
// FECHAR PRÉVIA
// =====================================================

function fecharPreviewReport() {

    const preview =
        document.getElementById("reportPreview");

    if (preview) {

        preview.remove();

    }

}
// =====================================================
// GERAR CARD COMO IMAGEM
// =====================================================

async function gerarCardReport() {

    const card =
        document.querySelector(
            "#reportPreview .report-card"
        );

    if (!card) {

        alert(
            "Não foi possível encontrar o card."
        );

        return;

    }

    if (
        typeof html2canvas === "undefined"
    ) {

        alert(
            "O gerador de imagem ainda não foi carregado."
        );

        return;

    }

    try {

        const canvas =
            await html2canvas(card, {

                scale: 2,

                backgroundColor: "#ffffff",

                useCORS: true,

                logging: false

            });


        const imagem =
            canvas.toDataURL(
                "image/png"
            );


        // Cria o download temporariamente

        const link =
            document.createElement("a");

        link.href = imagem;

        link.download =
            "LogBook_Report.png";

        link.click();


        console.log(
            "Card gerado com sucesso."
        );


    } catch (erro) {

        console.error(
            "Erro ao gerar card:",
            erro
        );

        alert(
            "Não foi possível gerar o card."
        );

    }

}
