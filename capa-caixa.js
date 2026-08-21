/* =========================================================
   CAPA CAIXA - LOGBOOK IBIS STYLES
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURAÇÃO
       ===================================================== */

    const ALTURA_CAPA = "78mm";


    /* =====================================================
       CRIA O BOTÃO "CAPA CAIXA"
       ===================================================== */

    function criarBotaoCapaCaixa() {

        // Evita criar o botão duas vezes
        if (
            document.getElementById(
                "btnCapaCaixa"
            )
        ) {
            return;
        }


        // Procura a área onde ficam os botões
        const botoes =
            document.querySelector(
                ".d-flex.justify-content-between.flex-wrap.gap-3.mb-4"
            );


        if (!botoes) {

            console.warn(
                "Capa Caixa: área dos botões não encontrada."
            );

            return;

        }


        // Cria o botão
        const botao =
            document.createElement(
                "button"
            );


        botao.id =
            "btnCapaCaixa";


        botao.type =
            "button";


        botao.className =
            "btn btn-outline-success";


        botao.innerHTML = `
            <i class="bi bi-cash-stack"></i>
            Capa Caixa
        `;


        botao.addEventListener(
            "click",
            imprimirCapaCaixa
        );


        // Procura a área dos botões da direita
        const grupoBotoes =
            botoes.querySelector(
                ".d-flex.flex-wrap.gap-2"
            );


        if (grupoBotoes) {

            grupoBotoes.appendChild(
                botao
            );

        } else {

            botoes.appendChild(
                botao
            );

        }

    }


    /* =====================================================
       CRIA A CAPA
       ===================================================== */

    function criarCapaCaixa() {

        let capa =
            document.getElementById(
                "capaCaixaImpressao"
            );


        if (capa) {

            return capa;

        }


        capa =
            document.createElement(
                "div"
            );


        capa.id =
            "capaCaixaImpressao";


        capa.innerHTML = `

            <div class="capa-caixa-titulo">

                <span>
                    <i class="bi bi-cash-stack"></i>
                    FECHAMENTO DE CAIXA
                </span>

                <img
                    class="capa-caixa-logo"
                    src="img/logo.png"
                    alt="ibis Styles"
                >

            </div>


            <div class="capa-caixa-conteudo">

                <div
                    class="capa-caixa-numero"
                    id="capaCaixaNumero">
                </div>


                <div
                    class="capa-caixa-funcionario"
                    id="capaCaixaFuncionario">
                </div>


                <div
                    class="capa-caixa-data"
                    id="capaCaixaData">
                </div>

            </div>

        `;


        document.body.appendChild(
            capa
        );


        return capa;

    }


    /* =====================================================
       PEGA A DATA DO LOGBOOK
       ===================================================== */

    function obterData() {

        const campo =
            document.getElementById(
                "data"
            );


        if (!campo) {

            return "";

        }


        const valor =
            campo.value;


        if (!valor) {

            return "";

        }


        const partes =
            valor.split("-");


        if (
            partes.length !== 3
        ) {

            return valor;

        }


        return (
            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0]
        );

    }


    /* =====================================================
       PEGA O FUNCIONÁRIO
       ===================================================== */

    function obterFuncionario() {

        const campo =
            document.getElementById(
                "funcionario"
            );


        if (!campo) {

            return "";

        }


        if (
            campo.selectedOptions &&
            campo.selectedOptions.length
        ) {

            return (
                campo
                    .selectedOptions[0]
                    .textContent
                    .trim()
            );

        }


        return (
            campo.value ||
            ""
        );

    }


    /* =====================================================
       PEGA O NÚMERO DO CAIXA
       ===================================================== */

    function obterNumeroCaixa() {

        /*
         * Primeiro procura campos que já possam existir
         * no LogBook.
         */

        const idsPossiveis = [

            "numeroCaixa",

            "caixa",

            "numero-caixa",

            "caixaNumero",

            "numero_do_caixa"

        ];


        for (
            const id of idsPossiveis
        ) {

            const campo =
                document.getElementById(
                    id
                );


            if (
                campo &&
                campo.value
            ) {

                return (
                    campo.value
                    .trim()
                );

            }

        }


        /*
         * Também procura inputs/selects
         * cujo name tenha relação com caixa.
         */

        const campoPorName =
            document.querySelector(
                `
                input[name*="caixa" i],
                select[name*="caixa" i]
                `
            );


        if (
            campoPorName &&
            campoPorName.value
        ) {

            return (
                campoPorName.value
                .trim()
            );

        }


        /*
         * Se não encontrar, deixa vazio.
         * Não inventa um número.
         */

        return "";

    }


    /* =====================================================
       PREENCHE A CAPA
       ===================================================== */

    function preencherCapa() {

        const capa =
            criarCapaCaixa();


        const data =
            obterData();


        const funcionario =
            obterFuncionario();


        const numeroCaixa =
            obterNumeroCaixa();


        const elementoNumero =
            document.getElementById(
                "capaCaixaNumero"
            );


        const elementoFuncionario =
            document.getElementById(
                "capaCaixaFuncionario"
            );


        const elementoData =
            document.getElementById(
                "capaCaixaData"
            );


        if (elementoNumero) {

            if (numeroCaixa) {

                elementoNumero.textContent =
                    "CAIXA - " +
                    numeroCaixa;

            } else {

                elementoNumero.textContent =
                    "CAIXA";

            }

        }


        if (elementoFuncionario) {

            elementoFuncionario.textContent =
                funcionario ||
                "";

        }


        if (elementoData) {

            elementoData.textContent =
                data ||
                "";

        }


        return capa;

    }


    /* =====================================================
       IMPRIMIR
       ===================================================== */

    function imprimirCapaCaixa() {

        try {

            preencherCapa();


            document.body.classList.add(
                "imprimindo-capa-caixa"
            );


            setTimeout(
                function () {

                    window.print();

                },
                100
            );


        } catch (erro) {

            console.error(
                "Erro ao imprimir Capa Caixa:",
                erro
            );


            alert(
                "Não foi possível preparar a Capa Caixa."
            );

        }

    }


    /* =====================================================
       FINALIZA IMPRESSÃO
       ===================================================== */

    window.addEventListener(
        "afterprint",
        function () {

            document.body.classList.remove(
                "imprimindo-capa-caixa"
            );

        }
    );


    /* =====================================================
       CSS DA CAPA
       ===================================================== */

    function adicionarEstilos() {

        if (
            document.getElementById(
                "estilosCapaCaixa"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "estilosCapaCaixa";


        style.textContent = `

            /* =========================================
               CAPA NORMALMENTE ESCONDIDA
               ========================================= */

            #capaCaixaImpressao {

                display: none;

            }


            /* =========================================
               IMPRESSÃO
               ========================================= */

            @media print {

                @page {

                    size: A4 portrait;

                    margin: 0;

                }


                html,
                body {

                    width: 210mm !important;

                    height: 297mm !important;

                    margin: 0 !important;

                    padding: 0 !important;

                    background: #ffffff !important;

                }


                /*
                 * Quando NÃO estamos imprimindo
                 * a capa, não interfere no LogBook.
                 */

                body.imprimindo-capa-caixa
                > *:not(#capaCaixaImpressao) {

                    display: none !important;

                }


                /*
                 * CARTÃO
                 */

                body.imprimindo-capa-caixa
                #capaCaixaImpressao {

                    display: flex !important;

                    position: fixed !important;

                    left: 10mm !important;

                    bottom: 7mm !important;

                    width: 190mm !important;

                    height: ${ALTURA_CAPA} !important;

                    box-sizing: border-box !important;

                    background: #ffffff !important;

                    border: 0.6mm solid #c8d0ca !important;

                    border-radius: 3mm !important;

                    overflow: hidden !important;

                    flex-direction: column !important;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif !important;

                    color: #202020 !important;

                }


                /*
                 * CABEÇALHO VERDE
                 */

                body.imprimindo-capa-caixa
                .capa-caixa-titulo {

                    width: 100% !important;

                    height: 18mm !important;

                    min-height: 18mm !important;

                    box-sizing: border-box !important;

                    background: #16733c !important;

                    color: #ffffff !important;

                    display: flex !important;

                    align-items: center !important;

                    justify-content: space-between !important;

                    padding:
                        0 7mm 0 7mm !important;

                    font-size: 15pt !important;

                    font-weight: 700 !important;

                }


                /*
                 * TÍTULO
                 */

                body.imprimindo-capa-caixa
                .capa-caixa-titulo span {

                    display: flex !important;

                    align-items: center !important;

                    gap: 3mm !important;

                    white-space: nowrap !important;

                }


                /*
                 * LOGO
                 */

                body.imprimindo-capa-caixa
                .capa-caixa-logo {

                    width: 20mm !important;

                    height: auto !important;

                    object-fit: contain !important;

                }


                /*
                 * ÁREA CENTRAL
                 */

                body.imprimindo-capa-caixa
                .capa-caixa-conteudo {

                    flex: 1 !important;

                    position: relative !important;

                    display: flex !important;

                    flex-direction: column !important;

                    align-items: center !important;

                    justify-content: center !important;

                    box-sizing: border-box !important;

                    padding:
                        4mm 12mm 5mm 12mm !important;

                    background: #ffffff !important;

                }


                /*
                 * NÚMERO DO CAIXA
                 */

                body.imprimindo-capa-caixa
                .capa-caixa-numero {

                    font-size: 11pt !important;

                    font-weight: 700 !important;

                    font-style: italic !important;

                    color: #4b514c !important;

                    line-height: 1.1 !important;

                    margin-bottom: 2mm !important;

                }


                /*
                 * FUNCIONÁRIO
                 */

                body.imprimindo-capa-caixa
                .capa-caixa-funcionario {

                    font-size: 20pt !important;

                    font-weight: 800 !important;

                    text-transform: uppercase !important;

                    color: #202020 !important;

                    text-align: center !important;

                    line-height: 1.05 !important;

                    margin-bottom: 2mm !important;

                }


                /*
                 * DATA
                 */

                body.imprimindo-capa-caixa
                .capa-caixa-data {

                    font-size: 14pt !important;

                    color: #404040 !important;

                    text-align: center !important;

                    line-height: 1.1 !important;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       INICIALIZAÇÃO
       ===================================================== */

    function iniciar() {

        adicionarEstilos();

        criarCapaCaixa();

        criarBotaoCapaCaixa();

    }


    /*
     * Aguarda o LogBook terminar de carregar.
     */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            iniciar
        );

    } else {

        iniciar();

    }


    /* =====================================================
       FUNÇÃO GLOBAL
       ===================================================== */

    window.imprimirCapaCaixa =
        imprimirCapaCaixa;


})();
