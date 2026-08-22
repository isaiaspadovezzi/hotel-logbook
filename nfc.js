/* =====================================================
   CAPA NF-C
   CUPONS FISCAIS - NF-C
   ===================================================== */

(function () {

    "use strict";


    /* =================================================
       CRIA A CAPA
       ================================================= */

    function criarCapaNfc() {

        if (
            document.getElementById(
                "capaNfcImpressao"
            )
        ) {

            return;

        }


        const capa =
            document.createElement(
                "div"
            );


        capa.id =
            "capaNfcImpressao";


        capa.innerHTML = `

            <div class="nfc-titulo">

                CUPONS FISCAIS - NF-C

            </div>


            <div class="nfc-conteudo">

                <div
                    class="nfc-data"
                    id="nfcData">
                </div>


                <img
                    class="nfc-logo"
                    src="img/logo.png"
                    alt="ibis Styles"
                >

            </div>

        `;


        document.body.appendChild(
            capa
        );

    }


    /* =================================================
       OBTÉM A DATA DO LOGBOOK
       ================================================= */

    function obterDataNfc() {

        /*
         * Primeiro tenta encontrar o campo
         * de data pelo ID.
         */

        const campo =
            document.getElementById(
                "data"
            );


        if (
            campo &&
            campo.value
        ) {

            const valor =
                campo.value;


            /*
             * Caso o campo esteja no formato:
             *
             * YYYY-MM-DD
             */

            const partes =
                valor.split("-");


            if (
                partes.length === 3
            ) {

                return (
                    partes[2] +
                    "/" +
                    partes[1] +
                    "/" +
                    partes[0]
                );

            }


            return valor;

        }


        /*
         * Caso o ID não seja "data",
         * procura um input de data.
         */

        const campoData =
            document.querySelector(
                'input[type="date"]'
            );


        if (
            campoData &&
            campoData.value
        ) {

            const valor =
                campoData.value;


            const partes =
                valor.split("-");


            if (
                partes.length === 3
            ) {

                return (
                    partes[2] +
                    "/" +
                    partes[1] +
                    "/" +
                    partes[0]
                );

            }


            return valor;

        }


        return "";

    }


    /* =================================================
       PREENCHE A DATA
       ================================================= */

    function preencherDataNfc() {

        const elemento =
            document.getElementById(
                "nfcData"
            );


        if (!elemento) {

            return;

        }


        const data =
            obterDataNfc();


        elemento.textContent =
            data || "—";

    }


    /* =================================================
       IMPRIMIR CAPA NF-C
       ================================================= */

    function imprimirNfc() {

        try {

            criarCapaNfc();

            preencherDataNfc();


            document.body.classList.add(
                "imprimindo-nfc"
            );


            setTimeout(
                function () {

                    window.print();

                },
                100
            );


        } catch (erro) {

            console.error(
                "Erro ao imprimir Capa NF-C:",
                erro
            );


            alert(
                "Não foi possível preparar a Capa NF-C."
            );

        }

    }


    /* =================================================
       APÓS A IMPRESSÃO
       ================================================= */

    window.addEventListener(
        "afterprint",
        function () {

            document.body.classList.remove(
                "imprimindo-nfc"
            );

        }
    );


    /* =================================================
       CRIA O BOTÃO
       ================================================= */

    function criarBotaoNfc() {

        if (
            document.getElementById(
                "btnCapaNfc"
            )
        ) {

            return;

        }


        /*
         * Procura primeiro a Capa FRNH.
         */

        const botaoFrnh =
            document.getElementById(
                "btnCapaFrnh"
            );


        /*
         * Se não encontrar a FRNH,
         * procura a Capa Caixa.
         */

        const botaoCaixa =
            document.getElementById(
                "btnCapaCaixa"
            );


        const referencia =
            botaoFrnh ||
            botaoCaixa;


        if (!referencia) {

            console.warn(
                "Capa NF-C: botão de referência não encontrado."
            );

            return;

        }


        const botao =
            document.createElement(
                "button"
            );


        botao.id =
            "btnCapaNfc";


        botao.type =
            "button";


        botao.className =
            "btn btn-outline-success";


        botao.innerHTML = `

            <i class="bi bi-receipt"></i>

            Capa NF-C

        `;


        botao.addEventListener(
            "click",
            imprimirNfc
        );


        /*
         * Coloca o botão depois da
         * referência encontrada.
         */

        referencia
            .parentNode
            .insertBefore(
                botao,
                referencia.nextSibling
            );

    }


    /* =================================================
       INICIALIZAÇÃO
       ================================================= */

    function iniciarNfc() {

        criarCapaNfc();

        criarBotaoNfc();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            iniciarNfc
        );

    } else {

        iniciarNfc();

    }


    /* =================================================
       FUNÇÃO GLOBAL
       ================================================= */

    window.imprimirNFC =
        imprimirNfc;


})();
