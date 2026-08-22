
/* =====================================================
   CAPA FRNH
   REGISTRO DE HÓSPEDES
   ===================================================== */

(function () {

    "use strict";


    /* =================================================
       CRIA A ESTRUTURA DA CAPA
       ================================================= */

    function criarCapaFrnh() {

        if (
            document.getElementById(
                "capaFrnhImpressao"
            )
        ) {

            return;

        }


        const capa =
            document.createElement(
                "div"
            );


        capa.id =
            "capaFrnhImpressao";


        capa.innerHTML = `

            <div class="frnh-cabecalho">

                <img
                    class="frnh-logo"
                    src="img/logo.png"
                    alt="ibis Styles"
                >


                <div class="frnh-titulo">

                    REGISTRO DE HÓSPEDES -
                    <br>
                    FRNH

                </div>

            </div>


            <div class="frnh-checkout">

                <div class="frnh-checkout-label">

                    CHECK OUT

                </div>


                <div
                    class="frnh-data"
                    id="frnhData">

                </div>

            </div>


            <div class="frnh-assinatura">

                ASSINATURA

            </div>

        `;


        document.body.appendChild(
            capa
        );

    }


    /* =================================================
       PEGA A DATA DO LOGBOOK
       ================================================= */

    function obterDataFrnh() {

        const campo =
            document.getElementById(
                "data"
            );


        if (
            !campo ||
            !campo.value
        ) {

            return "";

        }


        const valor =
            campo.value;


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


    /* =================================================
       PREENCHE A DATA
       ================================================= */

    function preencherDataFrnh() {

        const elemento =
            document.getElementById(
                "frnhData"
            );


        if (!elemento) {

            return;

        }


        elemento.textContent =
            obterDataFrnh();

    }


    /* =================================================
       IMPRIMIR FRNH
       ================================================= */

    function imprimirCapaFrnh() {

        try {

            criarCapaFrnh();

            preencherDataFrnh();


            document.body.classList.add(
                "imprimindo-frnh"
            );


            setTimeout(
                function () {

                    window.print();

                },
                100
            );


        } catch (erro) {

            console.error(
                "Erro ao imprimir Capa FRNH:",
                erro
            );


            alert(
                "Não foi possível preparar a Capa FRNH."
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
                "imprimindo-frnh"
            );

        }
    );


    /* =================================================
       CRIA BOTÃO
       ================================================= */

    function criarBotaoFrnh() {

        if (
            document.getElementById(
                "btnCapaFrnh"
            )
        ) {

            return;

        }


        /*
         * Procura o botão da Capa Caixa.
         * Assim colocamos a FRNH exatamente
         * ao lado dele.
         */

        const botaoCapaCaixa =
            document.getElementById(
                "btnCapaCaixa"
            );


        if (!botaoCapaCaixa) {

            console.warn(
                "Capa FRNH: botão Capa Caixa não encontrado."
            );

            return;

        }


        const botao =
            document.createElement(
                "button"
            );


        botao.id =
            "btnCapaFrnh";


        botao.type =
            "button";


        botao.className =
            "btn btn-outline-success";


        botao.innerHTML = `

            <i class="bi bi-person-vcard"></i>

            Capa FRNH

        `;


        botao.addEventListener(
            "click",
            imprimirCapaFrnh
        );


        /*
         * Coloca logo depois da Capa Caixa.
         */

        botaoCapaCaixa
            .parentNode
            .insertBefore(
                botao,
                botaoCapaCaixa.nextSibling
            );

    }


    /* =================================================
       INICIALIZAÇÃO
       ================================================= */

    function iniciarFrnh() {

        criarCapaFrnh();

        criarBotaoFrnh();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            iniciarFrnh
        );

    } else {

        iniciarFrnh();

    }


    /* =================================================
       FUNÇÃO GLOBAL
       ================================================= */

    window.imprimirCapaFrnh =
        imprimirCapaFrnh;


})();
