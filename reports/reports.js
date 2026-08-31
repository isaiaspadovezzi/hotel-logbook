// =====================================================
// LOGBOOK - REPORTS
// Sistema de notificações
// Versão 1.2
// =====================================================


// =====================================================
// CONFIGURAÇÃO
// =====================================================

const REPORTS_CONFIG = {

    nomeSistema: "LogBook",

    nomeHotel: "ibis Styles"

};
// =====================================================
// ESTILO DO REPORT DE MUDANÇA DE QUARTO
// =====================================================

(function () {

    const estilo =
        document.createElement("style");

    estilo.textContent = `

        .report-card-mudanca-quarto {
            width: 100%;
            height: 100%;
        }


        .report-card-mudanca-quarto
        .mudanca-quarto-main {

            display: grid;

            grid-template-columns:
                1fr 1fr 2fr;

            gap: 12px;

            width: 100%;

            min-height: 150px;

        }


        .report-card-mudanca-quarto
        .mudanca-quarto-box,

        .report-card-mudanca-quarto
        .mudanca-quarto-descricao {

            border:
                2px solid #555;

            background:
                #ffffff;

            box-sizing:
                border-box;

        }


        .report-card-mudanca-quarto
        .mudanca-quarto-box {

            display: flex;

            flex-direction:
                column;

            align-items:
                center;

            justify-content:
                center;

            text-align:
                center;

            padding:
                12px;

        }


        .report-card-mudanca-quarto
        .mudanca-quarto-atual {

            border-left:
                6px solid #e68100;

            background:
                #e1e5df;

        }


        .report-card-mudanca-quarto
        .mudanca-quarto-label {

            font-size:
                13px;

            font-weight:
                700;

            letter-spacing:
                0.5px;

            color:
                #666;

            margin-bottom:
                5px;

        }


        .report-card-mudanca-quarto
        .mudanca-quarto-numero {

            font-size:
                42px;

            line-height:
                1;

            font-weight:
                700;

            color:
                #202020;

        }


        .report-card-mudanca-quarto
        .mudanca-quarto-tipo {

            margin-top:
                7px;

            font-size:
                18px;

            line-height:
                1;

            font-weight:
                600;

            color:
                #6c757d;

            letter-spacing:
                0.5px;

        }


        .report-card-mudanca-quarto
        .mudanca-quarto-descricao {

            padding:
                14px;

            display:
                flex;

            flex-direction:
                column;

            overflow:
                hidden;

        }


        .report-card-mudanca-quarto
        .mudanca-quarto-descricao-texto {

            margin-top:
                10px;

            font-size:
                17px;

            line-height:
                1.35;

            color:
                #333;

            overflow-wrap:
                anywhere;

        }

    `;


    document.head.appendChild(
        estilo
    );

})();

// =====================================================
// OBTER TIPO DO QUARTO
// =====================================================

function obterTipoQuartoReport(registro) {

    if (!registro) {
        return "";
    }

    // 1. Tipo já salvo no registro
    if (
        registro.tipoQuarto !== undefined &&
        registro.tipoQuarto !== null &&
        String(registro.tipoQuarto).trim() !== ""
    ) {
        return String(registro.tipoQuarto).trim();
    }

    const numero =
        String(registro.quarto || "").trim();

    if (!numero) {
        return "";
    }


    // 2. Tipo atualmente associado ao campo de quarto

    const campoQuarto =
        document.getElementById("quarto");

    if (
        campoQuarto &&
        String(campoQuarto.value || "").trim() === numero &&
        campoQuarto.dataset &&
        campoQuarto.dataset.tipo
    ) {
        return String(
            campoQuarto.dataset.tipo
        ).trim();
    }


    // 3. Tabela carregada pelo quartos.js

    const fontes = [

        window.quartos,

        window.QUARTOS,

        window.listaQuartos,

        window.dadosQuartos,

        window.quartosHotel

    ];


    for (const fonte of fontes) {

        if (!fonte) {
            continue;
        }


        // -------------------------------------------------
        // FORMATO:
        // { 456: "DBC" }
        // -------------------------------------------------

        if (
            typeof fonte === "object" &&
            !Array.isArray(fonte) &&
            fonte[numero] !== undefined
        ) {

            const valor =
                fonte[numero];


            if (typeof valor === "string") {

                return valor.trim();

            }


            if (
                valor &&
                typeof valor === "object"
            ) {

                const tipo =
                    valor.tipoQuarto ||
                    valor.tipo ||
                    valor.codigo ||
                    valor.code ||
                    "";


                if (
                    String(tipo).trim() !== ""
                ) {

                    return String(
                        tipo
                    ).trim();

                }

            }

        }


        // -------------------------------------------------
        // FORMATO:
        // [
        //     {
        //         numero: 456,
        //         tipo: "DBC"
        //     }
        // ]
        // -------------------------------------------------

        if (Array.isArray(fonte)) {

            const item =
                fonte.find(
                    function(item) {

                        if (
                            !item ||
                            typeof item !== "object"
                        ) {
                            return false;
                        }


                        const n =
                            item.numero ??
                            item.quarto ??
                            item.room ??
                            item.number;


                        return (
                            String(
                                n ?? ""
                            ).trim() === numero
                        );

                    }
                );


            if (item) {

                const tipo =
                    item.tipoQuarto ||
                    item.tipo ||
                    item.codigo ||
                    item.code ||
                    "";


                if (
                    String(tipo).trim() !== ""
                ) {

                    return String(
                        tipo
                    ).trim();

                }

            }

        }

    }


    return "";

}


// =====================================================
// HTML DO QUARTO NO CARD
// =====================================================

function htmlQuartoReport(registro) {

    const numero =
        registro && registro.quarto
            ? String(registro.quarto)
            : "-";


    const tipo =
        obterTipoQuartoReport(
            registro
        );


    return `

        <div class="report-room-box">

            <span class="report-room-label">
                QUARTO
            </span>


            <strong
                class="report-room"
                style="
                    display: flex;
                    flex-direction: column;
                    line-height: 1;
                "
            >

                <span
                    style="
                        font-size: inherit;
                        line-height: 1;
                    "
                >
                    ${numero}
                </span>


                ${
                    tipo
                        ? `

                        <span style="
    display: block;
    width: 100%;
    margin-top: 6px;
    font-size: 13px;
    line-height: 1;
    font-weight: 600;
    color: #6c757d;
    letter-spacing: 0.5px;
    text-align: center;
">
    ${tipo}
</span>

                        `
                        : ""
                }

            </strong>

        </div>

    `;

}


// =====================================================
// REPORTAR REGISTRO
// =====================================================


// =====================================================
// REPORTAR / COPIAR CARD DIRETAMENTE
// =====================================================

async function reportarRegistro(indice) {

    const registro =
        registros[indice];


    if (!registro) {

        alert(
            "Registro não encontrado."
        );

        return;

    }


    const funcionarioElemento =
        document.getElementById(
            "funcionario"
        );


    const dataElemento =
        document.getElementById(
            "data"
        );


    const funcionario =
        funcionarioElemento
            ? funcionarioElemento.value
            : "";


    const data =
        dataElemento
            ? formatarDataReport(
                dataElemento.value
            )
            : "";


    // =================================================
    // CRIAR CARD TEMPORÁRIO
    // =================================================

    const container =
        document.createElement(
            "div"
        );


    container.style.position =
        "fixed";

    container.style.left =
        "-10000px";

    container.style.top =
        "0";

    container.style.background =
        "transparent";


    container.innerHTML = `

        <div
            class="report-card report-card-${classeAtividadeReport(registro.atividade)}"
        >

            <div class="report-header">

                <div class="report-header-title">

                    ${iconeAtividadeReport(
                        registro.atividade
                    )}

                    ${registro.atividade || "OCORRÊNCIA"}

                </div>


                <img
                    src="img/logo.png"
                    class="report-logo"
                    alt="ibis Styles"
                >

            </div>


            <div class="report-body">

                <div class="report-main">

                    ${
                        registro.atividade === "Procedimentos" ||
                        registro.atividade === "Conferência"

                        ? `

                            <div
                                class="report-description report-description-full"
                                style="
                                    width: 100% !important;
                                    max-width: none !important;
                                    min-width: 0 !important;
                                    min-height: 90px !important;
                                    box-sizing: border-box !important;
                                    display: block !important;
                                    flex: 1 1 100% !important;
                                    grid-column: 1 / -1 !important;
                                    margin: 0 !important;
                                    padding: 20px !important;
                                    font-size: 20px !important;
                                    line-height: 1.4 !important;
                                "
                            >

                                ${registro.descricao || "-"}

                            </div>

                        `

                        : `
                        registro.atividade === "Mudança de Quarto" ||
registro.atividade === "Troca de Quarto"

                            ${htmlQuartoReport(
                                registro
                            )}


                            <div class="report-description">

                                ${
                                    registro.descricao
                                        ? registro.descricao
                                        : ""
                                }


                                ${
                                    registro.quartoDestino &&
                                    (
                                        registro.atividade === "Mudança de Quarto" ||
                                        registro.atividade === "Troca de Quarto"
                                    )

                                        ? `

                                            <br><br>

                                            <strong>
                                                Novo quarto:
                                                ${registro.quartoDestino}
                                            </strong>

                                          `

                                        : ""
                                }


                                ${
                                    !registro.descricao &&
                                    !registro.quartoDestino

                                        ? "-"

                                        : ""
                                }

                            </div>

                        `
                    }

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

    `;


    document.body.appendChild(
        container
    );


    // =================================================
    // GERAR IMAGEM
    // =================================================

    try {

        const card =
            container.querySelector(
                ".report-card"
            );


        const canvas =
            await html2canvas(
                card,
                {

                    scale: 2,

                    backgroundColor: null,

                    useCORS: true,

                    logging: false

                }
            );


        // =================================================
        // COPIAR IMAGEM
        // =================================================

        const blob =
            await new Promise(
                function(resolve) {

                    canvas.toBlob(

                        resolve,

                        "image/png"

                    );

                }
            );


        if (!blob) {

            throw new Error(
                "Não foi possível criar a imagem."
            );

        }


        const item =
            new ClipboardItem({

                "image/png": blob

            });


        await navigator.clipboard.write([
            item
        ]);


        container.remove();


        const botao =
            document.getElementById(
                "btnCopiarCardReport"
            );


        if (botao) {

            botao.innerHTML = `

                <i class="bi bi-check-lg"></i>

                <span>Copiado</span>

            `;


            setTimeout(
                function() {

                    botao.innerHTML = `

                        <i class="bi bi-clipboard"></i>

                        <span>
                            Copiar Card
                        </span>

                    `;

                },
                2000
            );

        }


    } catch (erro) {

        console.error(
            "Erro ao copiar card:",
            erro
        );


        container.remove();


        alert(
            "Não foi possível copiar o card."
        );

    }

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

function classeAtividadeReport(
    atividade
) {

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
// ÍCONE DA ATIVIDADE NO CARD
// =====================================================

function iconeAtividadeReport(
    atividade
) {

    switch (atividade) {

        case "Check-in":

            return `

                <i
                    class="bi bi-person-check"
                    style="margin-right: 6px;"
                ></i>

            `;


        case "Check-out":

            return `

                <i
                    class="bi bi-box-arrow-right"
                    style="margin-right: 6px;"
                ></i>

            `;


        case "Manutenção":

            return `

                <i
                    class="bi bi-tools"
                    style="margin-right: 6px;"
                ></i>

            `;


        case "Troca de Quarto":

        case "Mudança de Quarto":

            return `

                <i
                    class="bi bi-door-open"
                    style="margin-right: 6px;"
                ></i>

            `;


        case "Limpeza":

            return `

                <i
                    class="bi bi-stars"
                    style="margin-right: 6px;"
                ></i>

            `;


        case "Procedimentos":

            return `

                <i
                    class="bi bi-clipboard-check"
                    style="margin-right: 6px;"
                ></i>

            `;


        case "Aviso":

            return `

                <i
                    class="bi bi-info-circle"
                    style="margin-right: 6px;"
                ></i>

            `;


        case "Reclamação":

            return `

                <i
                    class="bi bi-exclamation-circle"
                    style="margin-right: 6px;"
                ></i>

            `;


        default:

            return `

                <i
                    class="bi bi-clipboard"
                    style="margin-right: 6px;"
                ></i>

            `;

    }

}


// =====================================================
// PRÉVIA DO REPORT
// =====================================================

function abrirPreviewReport(
    registro
) {

    // ============================================
    // INFORMAÇÃO DO NOVO QUARTO
    // ============================================

    let descricaoReport =
        registro.descricao || "";


    if (
        registro.quartoDestino &&
        (
            registro.atividade === "Mudança de Quarto" ||
            registro.atividade === "Troca de Quarto"
        )
    ) {

        if (
            descricaoReport.trim() !== ""
        ) {

            descricaoReport +=

                "<br><br>" +

                "<strong>Novo quarto: " +

                registro.quartoDestino +

                "</strong>";

        } else {

            descricaoReport =

                "<strong>Novo quarto: " +

                registro.quartoDestino +

                "</strong>";

        }

    }


    if (
        !descricaoReport ||
        descricaoReport.trim() === ""
    ) {

        descricaoReport = "-";

    }


    const funcionarioElemento =
        document.getElementById(
            "funcionario"
        );


    const turnoElemento =
        document.getElementById(
            "turno"
        );


    const dataElemento =
        document.getElementById(
            "data"
        );


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
            ? formatarDataReport(
                dataElemento.value
            )
            : "";


    // Remove uma prévia anterior

    const anterior =
        document.getElementById(
            "reportPreview"
        );


    if (anterior) {

        anterior.remove();

    }


    // Cria a janela

    const overlay =
        document.createElement(
            "div"
        );


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
                    onclick="fecharPreviewReport()"
                >

                    ×

                </button>

            </div>


            <div class="report-preview-content">

                <div
                    class="report-card report-card-${classeAtividadeReport(registro.atividade)}"
                >

                    <!-- CABEÇALHO -->

                    <div class="report-header">

                        <div class="report-header-title">

                            REGISTRO DE TURNO

                        </div>


                        <img
                            src="img/logo.png"
                            class="report-logo"
                            alt="ibis Styles"
                        >

                    </div>


                    <!-- CONTEÚDO -->

                    <div class="report-body">

                        <div class="report-type">

                            ${registro.atividade || "OCORRÊNCIA"}

                        </div>


                        <!-- QUARTO + DESCRIÇÃO -->

                        <div class="report-main">

                            ${
                                registro.atividade === "Procedimentos" ||
                                registro.atividade === "Conferência"

                                ? `

                                    <div
                                        class="report-description"
                                        style="
                                            width: 100%;
                                            max-width: 100%;
                                            flex: 1 1 100%;
                                            box-sizing: border-box;
                                            grid-column: 1 / -1;
                                            min-height: 80px;
                                        "
                                    >

                                        ${descricaoReport}

                                    </div>

                                `

                                : `

                                    ${htmlQuartoReport(
                                        registro
                                    )}


                                    <div class="report-description">

                                        ${descricaoReport}

                                    </div>

                                `
                            }

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
                        onclick="fecharPreviewReport()"
                    >

                        Cancelar

                    </button>


                    <button
                        type="button"
                        class="btn btn-success"
                        onclick="gerarCardReport()"
                    >

                        <i class="bi bi-save"></i>

                        Gerar Card

                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(
        overlay
    );

}


// =====================================================
// FECHAR PRÉVIA
// =====================================================

function fecharPreviewReport() {

    const preview =
        document.getElementById(
            "reportPreview"
        );


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

        alert(
            "Não foi possível encontrar o card."
        );

        return;

    }


    if (
        typeof html2canvas ===
        "undefined"
    ) {

        alert(
            "O gerador de imagem ainda não foi carregado."
        );

        return;

    }


    try {

        const canvas =
            await html2canvas(
                card,
                {

                    scale: 2,

                    backgroundColor: null,

                    useCORS: true,

                    logging: false

                }
            );


        // Guarda a imagem para os outros botões

        window.reportCardCanvas =
            canvas;


        // Converte para PNG

        const imagem =
            canvas.toDataURL(
                "image/png"
            );


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
            document.createElement(
                "div"
            );


        acoes.id =
            "acoesCardReport";


        acoes.className =
            "report-card-actions";


        acoes.innerHTML = `

            <button
                type="button"
                class="btn btn-outline-success"
                onclick="baixarCardReport()"
            >

                <i class="bi bi-download"></i>

                Baixar Card

            </button>


            <button
                type="button"
                id="btnCopiarCardReport"
                class="btn btn-success"
                onclick="copiarCardReport()"
            >

                <i class="bi bi-clipboard"></i>

                <span>
                    Copiar Card
                </span>

            </button>

        `;


        // Coloca os botões depois do card

        card.parentElement.appendChild(
            acoes
        );


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

    if (
        !window.reportCardCanvas
    ) {

        alert(
            "Primeiro clique em Gerar Card."
        );

        return;

    }


    const link =
        document.createElement(
            "a"
        );


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

    if (
        !window.reportCardCanvas
    ) {

        alert(
            "Primeiro clique em Gerar Card."
        );

        return;

    }


    const botao =
        document.getElementById(
            "btnCopiarCardReport"
        );


    try {

        const canvas =
            window.reportCardCanvas;


        const blob =
            await new Promise(
                function(resolve) {

                    canvas.toBlob(

                        resolve,

                        "image/png"

                    );

                }
            );


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


        // ============================================
        // RETORNO VISUAL NO BOTÃO
        // ============================================

        if (botao) {

            botao.innerHTML = `

                <i class="bi bi-check-lg"></i>

                <span>
                    Copiado
                </span>

            `;


            botao.classList.remove(
                "btn-success"
            );


            botao.classList.add(
                "btn-dark"
            );

        }


        console.log(
            "Card copiado para a área de transferência."
        );


        // Volta ao estado original depois de 2 segundos

        setTimeout(
            function() {

                if (botao) {

                    botao.innerHTML = `

                        <i class="bi bi-clipboard"></i>

                        <span>
                            Copiar Card
                        </span>

                    `;


                    botao.classList.remove(
                        "btn-dark"
                    );


                    botao.classList.add(
                        "btn-success"
                    );

                }

            },
            2000
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
