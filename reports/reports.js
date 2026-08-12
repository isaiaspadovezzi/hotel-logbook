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
                            alt="is Styles">

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
    onclick="enviarWhatsApp()">

    <i class="bi bi-whatsapp"></i>

    WhatsApp

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
// =====================================================
// COMPARTILHAR REPORT
// =====================================================

// =====================================================
// ENVIAR REPORT PARA WHATSAPP
// =====================================================

async function enviarWhatsApp() {

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

    if (typeof html2canvas === "undefined") {

        alert(
            "O gerador de imagem ainda não foi carregado."
        );

        return;

    }

    try {

        console.log(
            "Gerando imagem para WhatsApp..."
        );


        // =================================================
        // 1. GERAR IMAGEM
        // =================================================

        const canvas =
            await html2canvas(card, {

                scale: 2,

                backgroundColor: "#ffffff",

                useCORS: true,

                logging: false

            });


        // =================================================
        // 2. CONVERTER PARA BLOB
        // =================================================

        const blob =
            await new Promise(function(resolve) {

                canvas.toBlob(

                    resolve,

                    "image/png"

                );

            });


        if (!blob) {

            throw new Error(
                "Não foi possível gerar a imagem."
            );

        }


        // =================================================
        // 3. COPIAR IMAGEM PARA ÁREA DE TRANSFERÊNCIA
        // =================================================

        let imagemCopiada = false;


        if (
            navigator.clipboard &&
            window.ClipboardItem
        ) {

            try {

                const item =
                    new ClipboardItem({

                        "image/png": blob

                    });


                await navigator.clipboard.write([item]);


                imagemCopiada = true;


                console.log(
                    "Imagem copiada para a área de transferência."
                );


            } catch (erroClipboard) {

                console.warn(
                    "Não foi possível copiar a imagem:",
                    erroClipboard
                );

            }

        }


        // =================================================
        // 4. ABRIR WHATSAPP WEB
        // =================================================

        window.open(
            "https://web.whatsapp.com/",
            "_blank"
        );


        // =================================================
        // 5. ORIENTAÇÃO PARA O USUÁRIO
        // =================================================

        if (imagemCopiada) {

            alert(
                "Card copiado!\n\n" +

                "O WhatsApp Web será aberto.\n\n" +

                "1. Entre no grupo desejado.\n" +

                "2. Pressione Ctrl + V.\n" +

                "3. Envie a imagem."
            );

        } else {

            // Fallback caso o navegador não permita
            // copiar a imagem.

            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;


            link.download =
                "LogBook_Report.png";


            document.body.appendChild(link);


            link.click();


            document.body.removeChild(link);


            URL.revokeObjectURL(url);


            alert(
                "O WhatsApp foi aberto, mas o navegador " +
                "não permitiu copiar a imagem automaticamente.\n\n" +

                "A imagem foi salva como LogBook_Report.png."
            );

        }


    } catch (erro) {

        console.error(
            "Erro ao enviar para WhatsApp:",
            erro
        );


        alert(
            "Não foi possível preparar o report para o WhatsApp."
        );

    }

}
