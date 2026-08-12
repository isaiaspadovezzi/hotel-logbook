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
// CLASSE DE COR DO REPORT
// =====================================================

function classeAtividadeReport(atividade) {

    switch (atividade) {

        case "Manutenção":
            return "manutencao";

        case "Check-in":
            return "checkin";

        case "Check-out":
            return "checkout";

        case "Troca de Quarto":
        case "Mudança de Quarto":
            return "troca";

        case "Limpeza":
            return "limpeza";

        case "Aviso":
            return "aviso";

        case "Reclamação":
            return "reclamacao";

        case "Elogio":
            return "elogio";

        default:
            return "padrao";
    }

}
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

            <div class="report-card report-card-${classeAtividadeReport(registro.atividade)}">

    <!-- CABEÇALHO -->

    <div class="report-header">

        <div class="report-header-title">
            REGISTRO DE TURNO
        </div>

        <img
            src="img/logo.png"
            class="report-logo"
            alt="ibis Styles">

    </div>


    <!-- CONTEÚDO -->

    <div class="report-body">

        <div class="report-type">

            ${registro.atividade || "OCORRÊNCIA"}

        </div>


        <!-- QUARTO + DESCRIÇÃO -->

        <div class="report-main">

            <div class="report-room-box">

                <span class="report-room-label">
                    QUARTO
                </span>

                <strong class="report-room">
                    ${registro.quarto || "-"}
                </strong>

            </div>


            <div class="report-description">

                ${registro.descricao || "-"}

            </div>

        </div>


        <!-- INFORMAÇÕES -->

        <div class="report-info">

            <div class="report-info-item">

                <span class="report-info-label">
                    Funcionário
                </span>

                ${funcionario || "-"}

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


    <!-- RODAPÉ -->

    <div class="report-footer">

        <span>
            ibis Styles
        </span>

        <span>
            Comunicação interna
        </span>

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
    onclick="gerarCardReport()">

<i class="bi bi-save"></i>

    Gerar Card

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
// GERAR CARD
// =====================================================

async function gerarCardReport() {

    const card =
        document.querySelector(
            "#reportPreview .report-card"
        );

    if (!card) {

        alert("Não foi possível encontrar o card.");

        return;

    }

    if (typeof html2canvas === "undefined") {

        alert(
            "O gerador de imagem ainda não foi carregado."
        );

        return;

    }

    try {

        const canvas =
            await html2canvas(card, {

                scale: 2,

             backgroundColor: null,

                useCORS: true,

                logging: false

            });


        // Guarda a imagem para os outros botões

        window.reportCardCanvas = canvas;


        // Converte para PNG

        const imagem =
            canvas.toDataURL("image/png");


        // Remove botões antigos

        const botoesAntigos =
            document.getElementById(
                "acoesCardReport"
            );

        if (botoesAntigos) {

            botoesAntigos.remove();

        }


        // Cria os novos botões

        const acoes =
            document.createElement("div");

        acoes.id =
            "acoesCardReport";

        acoes.className =
            "report-card-actions";


        acoes.innerHTML = `

            <button
                type="button"
                class="btn btn-outline-success"
                onclick="baixarCardReport()">

                <i class=" -download"></i>

                Baixar Card

            </button>


            <button
                type="button"
                class="btn btn-success"
                onclick="copiarCardReport()">

                <i class=" -clipboard"></i>

                Copiar Card

            </button>

        `;


        // Coloca os botões depois do card

        card.parentElement.appendChild(acoes);


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
// =====================================================
// BAIXAR CARD
// =====================================================

function baixarCardReport() {

    if (!window.reportCardCanvas) {

        alert(
            "Primeiro clique em Gerar Card."
        );

        return;

    }


    const link =
        document.createElement("a");


    link.download =
        "LogBook_Report.png";


    link.href =
        window.reportCardCanvas.toDataURL(
            "image/png"
        );


    link.click();


    console.log(
        "Card baixado."
    );

}


// =====================================================
// COPIAR CARD
// =====================================================

async function copiarCardReport() {

    if (!window.reportCardCanvas) {

        alert(
            "Primeiro clique em Gerar Card."
        );

        return;

    }


    try {

        const canvas =
            window.reportCardCanvas;


        const blob =
            await new Promise(function(resolve) {

                canvas.toBlob(
                    resolve,
                    "image/png"
                );

            });


        if (!blob) {

            throw new Error(
                "Não foi possível criar a imagem."
            );

        }


        if (
            !navigator.clipboard ||
            !window.ClipboardItem
        ) {

            alert(
                "Seu navegador não permite copiar imagens diretamente."
            );

            return;

        }


        const item =
            new ClipboardItem({

                "image/png": blob

            });


        await navigator.clipboard.write([
            item
        ]);


        alert(
            "✅ Card copiado!\n\n" +
            "Agora você pode colar onde quiser."
        );


        console.log(
            "Card copiado para a área de transferência."
        );


    } catch (erro) {

        console.error(
            "Erro ao copiar card:",
            erro
        );


        alert(
            "Não foi possível copiar o card."
        );

    }

}


 
