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
// ESTILO - MUDANÇA DE QUARTO
// =====================================================

(function () {

    const estilo =
        document.createElement("style");

    estilo.textContent = `

        /* =================================================
           REPORT DE MUDANÇA DE QUARTO
           ================================================= */

        .report-main.report-main-mudanca {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
        }


        .report-main.report-main-mudanca
        > .mudanca-quarto-report {

            display: block !important;

            width: 100% !important;

            max-width: 100% !important;

            min-width: 0 !important;

            box-sizing: border-box !important;

        }


        /* =================================================
           TRÊS COLUNAS
           QUARTO ATUAL | NOVO QUARTO | DESCRIÇÃO
           ================================================= */

        .mudanca-quarto-main {

            display: grid !important;

            grid-template-columns:
                1fr
                1fr
                2fr !important;

            gap: 12px !important;

            width: 100% !important;

            max-width: 100% !important;

            min-width: 0 !important;

            box-sizing: border-box !important;

        }


        /* =================================================
           CAIXAS
           ================================================= */

        .mudanca-quarto-box,
        .mudanca-quarto-descricao {

            min-width: 0 !important;

            box-sizing: border-box !important;

            border:
                2px solid
                #d2d6d3 !important;

            background:
                #ffffff !important;

        }


        /* =================================================
           QUARTOS
           ================================================= */

        .mudanca-quarto-box {

            min-height:
                150px !important;

            display:
                flex !important;

            flex-direction:
                column !important;

            align-items:
                center !important;

            justify-content:
                center !important;

            text-align:
                center !important;

            padding:
                14px !important;

        }


        /* =================================================
           QUARTO ATUAL
           ================================================= */

        .mudanca-quarto-atual {

            border-left:
                6px solid
                #e68100 !important;

            background:
                #e1e5df !important;

        }


        /* =================================================
           NOVO QUARTO
           ================================================= */

        .mudanca-quarto-novo {

            border-left:
                6px solid
                #63C132 !important;

            background:
                #f7faf5 !important;

        }


        /* =================================================
           LABEL
           ================================================= */

        .mudanca-quarto-label {

            display:
                block !important;

            margin:
                0 0 7px 0 !important;

            font-size:
                13px !important;

            line-height:
                1.1 !important;

            font-weight:
                700 !important;

            letter-spacing:
                .7px !important;

            color:
                #666 !important;

            text-transform:
                uppercase !important;

        }


        /* =================================================
           NÚMERO
           ================================================= */

        .mudanca-quarto-numero {

            display:
                block !important;

            font-size:
                42px !important;

            line-height:
                1 !important;

            font-weight:
                700 !important;

            color:
                #202020 !important;

        }


        /* =================================================
           TIPO
           ================================================= */

        .mudanca-quarto-tipo {

            display:
                block !important;

            margin-top:
                8px !important;

            font-size:
                18px !important;

            line-height:
                1 !important;

            font-weight:
                600 !important;

            color:
                #6c757d !important;

            letter-spacing:
                .5px !important;

        }


        /* =================================================
           DESCRIÇÃO
           ================================================= */

        .mudanca-quarto-descricao {

            min-height:
                150px !important;

            width:
                100% !important;

            display:
                flex !important;

            flex-direction:
                column !important;

            justify-content:
                flex-start !important;

            padding:
                16px !important;

            overflow:
                hidden !important;

        }


        .mudanca-quarto-descricao-texto {

            width:
                100% !important;

            min-width:
                0 !important;

            margin-top:
                8px !important;

            font-size:
                16px !important;

            line-height:
                1.4 !important;

            color:
                #333 !important;

            overflow-wrap:
                anywhere !important;

            word-break:
                break-word !important;

        }


        /* =================================================
           RESPONSIVO
           ================================================= */

        @media (max-width: 700px) {

            .mudanca-quarto-main {

                grid-template-columns:
                    1fr !important;

            }

        }

    `;

    document.head.appendChild(
        estilo
    );

})();


// =====================================================
// HTML - MUDANÇA DE QUARTO
// =====================================================

function htmlMudancaQuartoReport(
    registro
) {

    const quartoAtual =
        registro && registro.quarto
            ? String(registro.quarto)
            : "-";


    const quartoNovo =
        registro && registro.quartoDestino
            ? String(registro.quartoDestino)
            : "-";


    const tipoAtual =
        obterTipoQuartoReport(
            registro
        );


    const tipoNovo =
        quartoNovo !== "-"
            ? obterTipoQuartoReport({
                quarto: quartoNovo
            })
            : "";


    const descricao =
        registro && registro.descricao
            ? registro.descricao
            : "-";


    return `

        <div class="mudanca-quarto-report">

            <div class="mudanca-quarto-main">


                <!-- ======================================
                     QUARTO ATUAL
                     ====================================== -->

                <div
                    class="
                        mudanca-quarto-box
                        mudanca-quarto-atual
                    "
                >

                    <span
                        class="mudanca-quarto-label"
                    >
                        QUARTO
                    </span>


                    <strong
                        class="mudanca-quarto-numero"
                    >
                        ${quartoAtual}
                    </strong>


                    ${
                        tipoAtual
                            ? `

                                <span
                                    class="
                                        mudanca-quarto-tipo
                                    "
                                >
                                    ${tipoAtual}
                                </span>

                              `
                            : ""
                    }

                </div>


                <!-- ======================================
                     NOVO QUARTO
                     ====================================== -->

                <div
                    class="
                        mudanca-quarto-box
                        mudanca-quarto-novo
                    "
                >

                    <span
                        class="mudanca-quarto-label"
                    >
                        NOVO QUARTO
                    </span>


                    <strong
                        class="mudanca-quarto-numero"
                    >
                        ${quartoNovo}
                    </strong>


                    ${
                        tipoNovo
                            ? `

                                <span
                                    class="
                                        mudanca-quarto-tipo
                                    "
                                >
                                    ${tipoNovo}
                                </span>

                              `
                            : ""
                    }

                </div>


                <!-- ======================================
                     DESCRIÇÃO
                     ====================================== -->

                <div
                    class="mudanca-quarto-descricao"
                >

                    <span
                        class="mudanca-quarto-label"
                    >
                        DESCRIÇÃO
                    </span>


                    <div
                        class="
                            mudanca-quarto-descricao-texto
                        "
                    >
                        ${descricao}
                    </div>

                </div>


            </div>

        </div>

    `;

}


// =====================================================
// CONTEÚDO PRINCIPAL DO REPORT
// =====================================================

function htmlConteudoReport(
    registro,
    descricaoOverride
) {

    const descricao =
        descricaoOverride !== undefined
            ? descricaoOverride
            : (
                registro &&
                registro.descricao
                    ? registro.descricao
                    : "-"
              );


    const ehMudanca =
        registro.atividade ===
            "Mudança de Quarto" ||

        registro.atividade ===
            "Troca de Quarto";


    // =================================================
    // MUDANÇA DE QUARTO
    // =================================================

    if (ehMudanca) {

        const registroReport = {

            ...registro,

            descricao:
                descricao

        };


        return htmlMudancaQuartoReport(
            registroReport
        );

    }


    // =================================================
    // PROCEDIMENTOS / CONFERÊNCIA
    // =================================================

    if (
        registro.atividade ===
            "Procedimentos" ||

        registro.atividade ===
            "Conferência"
    ) {

        return `

            <div
                class="
                    report-description
                    report-description-full
                "
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
                ${descricao}
            </div>

        `;

    }


    // =================================================
    // REPORT NORMAL
    // =================================================

    return `

        ${htmlQuartoReport(registro)}

        <div class="report-description">

            ${descricao}

        </div>

    `;

}


// =====================================================
// REPORTAR REGISTRO
// =====================================================

async function reportarRegistro(
    indice
) {

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
            class="
                report-card
                report-card-${classeAtividadeReport(
                    registro.atividade
                )}
            "
        >

            <div class="report-header">

                <div
                    class="report-header-title"
                >

                    ${iconeAtividadeReport(
                        registro.atividade
                    )}

                    ${registro.atividade ||
                        "OCORRÊNCIA"}

                </div>


                <img
                    src="img/logo.png"
                    class="report-logo"
                    alt="ibis Styles"
                >

            </div>


            <div class="report-body">


                <div
                    class="
                        report-main${
                            registro.atividade ===
                                "Mudança de Quarto" ||
                            registro.atividade ===
                                "Troca de Quarto"
                                ? " report-main-mudanca"
                                : ""
                        }
                    "
                >

                    ${htmlConteudoReport(
                        registro
                    )}

                </div>


                <div class="report-info">


                    <div
                        class="report-info-item"
                    >

                        <span
                            class="report-info-label"
                        >
                            Funcionário
                        </span>

                        ${funcionario || "-"}

                    </div>


                    <div
                        class="report-info-item"
                    >

                        <span
                            class="report-info-label"
                        >
                            Data
                        </span>

                        ${data || "-"}

                    </div>


                    <div
                        class="report-info-item"
                    >

                        <span
                            class="report-info-label"
                        >
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

                "image/png":
                    blob

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

                <span>
                    Copiado
                </span>

            `;


            setTimeout(
                function() {

                    botao.innerHTML = `

                        <i
                            class="bi bi-clipboard"
                        ></i>

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

function formatarDataReport(
    data
) {

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
    "Módulo Reports v1.3 carregado."
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
                    style="
                        margin-right: 6px;
                    "
                ></i>

            `;


        case "Check-out":

            return `

                <i
                    class="
                        bi
                        bi-box-arrow-right
                    "
                    style="
                        margin-right: 6px;
                    "
                ></i>

            `;


        case "Manutenção":

            return `

                <i
                    class="bi bi-tools"
                    style="
                        margin-right: 6px;
                    "
                ></i>

            `;


        case "Troca de Quarto":

        case "Mudança de Quarto":

            return `

                <i
                    class="
                        bi
                        bi-door-open
                    "
                    style="
                        margin-right: 6px;
                    "
                ></i>

            `;


        case "Limpeza":

            return `

                <i
                    class="bi bi-stars"
                    style="
                        margin-right: 6px;
                    "
                ></i>

            `;


        case "Procedimentos":

            return `

                <i
                    class="
                        bi
                        bi-clipboard-check
                    "
                    style="
                        margin-right: 6px;
                    "
                ></i>

            `;


        case "Aviso":

            return `

                <i
                    class="
                        bi
                        bi-info-circle
                    "
                    style="
                        margin-right: 6px;
                    "
                ></i>

            `;


        case "Reclamação":

            return `

                <i
                    class="
                        bi
                        bi-exclamation-circle
                    "
                    style="
                        margin-right: 6px;
                    "
                ></i>

            `;


        default:

            return `

                <i
                    class="bi bi-clipboard"
                    style="
                        margin-right: 6px;
                    "
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


    /*
     * IMPORTANTE:
     * Para mudança de quarto o novo quarto
     * é mostrado pelo layout próprio.
     *
     * Portanto NÃO adicionamos aqui
     * "Novo quarto: XXX" novamente.
     */


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


    // =================================================
    // REMOVE PRÉVIA ANTERIOR
    // =================================================

    const anterior =
        document.getElementById(
            "reportPreview"
        );


    if (anterior) {

        anterior.remove();

    }


    // =================================================
    // CRIA JANELA
    // =================================================

    const overlay =
        document.createElement(
            "div"
        );


    overlay.id =
        "reportPreview";


    overlay.className =
        "report-preview-overlay";


    overlay.innerHTML = `

        <div
            class="report-preview-modal"
        >

            <div
                class="report-preview-header"
            >

                <strong>
                    Prévia do Report
                </strong>


                <button
                    type="button"
                    class="
                        report-preview-close
                    "
                    onclick="
                        fecharPreviewReport()
                    "
                >

                    ×

                </button>

            </div>


            <div
                class="
                    report-preview-content
                "
            >


                <div
                    class="
                        report-card
                        report-card-${classeAtividadeReport(
                            registro.atividade
                        )}
                    "
                >


                    <!-- =================================
                         CABEÇALHO
                         ================================= -->

                    <div
                        class="report-header"
                    >

                        <div
                            class="
                                report-header-title
                            "
                        >

                            ${iconeAtividadeReport(
                                registro.atividade
                            )}

                            ${registro.atividade ||
                                "OCORRÊNCIA"}

                        </div>


                        <img
                            src="img/logo.png"
                            class="report-logo"
                            alt="ibis Styles"
                        >

                    </div>


                    <!-- =================================
                         CONTEÚDO
                         ================================= -->

                    <div
                        class="report-body"
                    >


                        <div
                            class="report-type"
                        >

                            ${registro.atividade ||
                                "OCORRÊNCIA"}

                        </div>


                        <!-- =============================
                             QUARTO + DESCRIÇÃO
                             ============================= -->

                        <div
                            class="
                                report-main${
                                    registro.atividade ===
                                        "Mudança de Quarto" ||
                                    registro.atividade ===
                                        "Troca de Quarto"
                                        ? " report-main-mudanca"
                                        : ""
                                }
                            "
                        >

                            ${htmlConteudoReport(
                                registro,
                                descricaoReport
                            )}

                        </div>


                        <!-- =============================
                             INFORMAÇÕES
                             ============================= -->

                        <div
                            class="report-info"
                        >


                            <div
                                class="
                                    report-info-item
                                "
                            >

                                <span
                                    class="
                                        report-info-label
                                    "
                                >
                                    Funcionário
                                </span>

                                ${funcionario ||
                                    "-"}

                            </div>


                            <div
                                class="
                                    report-info-item
                                "
                            >

                                <span
                                    class="
                                        report-info-label
                                    "
                                >
                                    Data
                                </span>

                                ${data || "-"}

                            </div>


                            <div
                                class="
                                    report-info-item
                                "
                            >

                                <span
                                    class="
                                        report-info-label
                                    "
                                >
                                    Hora
                                </span>

                                ${registro.hora ||
                                    "-"}

                            </div>


                        </div>

                    </div>


                    <!-- =================================
                         RODAPÉ
                         ================================= -->

                    <div
                        class="report-footer"
                    >

                        <span>
                            ibis Styles
                        </span>


                        <span>
                            Comunicação interna
                        </span>

                    </div>


                </div>


                <!-- =================================
                     BOTÕES
                     ================================= -->

                <div
                    class="
                        report-preview-footer
                    "
                >

                    <button
                        type="button"
                        class="
                            btn
                            btn-secondary
                        "
                        onclick="
                            fecharPreviewReport()
                        "
                    >

                        Cancelar

                    </button>


                    <button
                        type="button"
                        class="
                            btn
                            btn-success
                        "
                        onclick="
                            gerarCardReport()
                        "
                    >

                        <i
                            class="bi bi-save"
                        ></i>

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

                    backgroundColor:
                        null,

                    useCORS:
                        true,

                    logging:
                        false

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


        // =================================================
        // CRIA BOTÕES
        // =================================================

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
                class="
                    btn
                    btn-outline-success
                "
                onclick="
                    baixarCardReport()
                "
            >

                <i
                    class="bi bi-download"
                ></i>

                Baixar Card

            </button>


            <button
                type="button"
                id="btnCopiarCardReport"
                class="
                    btn
                    btn-success
                "
                onclick="
                    copiarCardReport()
                "
            >

                <i
                    class="bi bi-clipboard"
                ></i>

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

                "image/png":
                    blob

            });


        await navigator.clipboard.write([
            item
        ]);


        // ============================================
        // RETORNO VISUAL NO BOTÃO
        // ============================================

        if (botao) {

            botao.innerHTML = `

                <i
                    class="bi bi-check-lg"
                ></i>

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


        // =================================================
        // VOLTA AO ESTADO ORIGINAL
        // =================================================

        setTimeout(
            function() {

                if (botao) {

                    botao.innerHTML = `

                        <i
                            class="bi bi-clipboard"
                        ></i>

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
