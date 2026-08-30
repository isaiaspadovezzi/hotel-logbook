/* =====================================================
   CAPA NF-C
   CUPONS FISCAIS - NF-C
   IMPRESSÃO COMO IMAGEM
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
       COMO IMAGEM EM JANELA EXCLUSIVA
       ================================================= */

    async function imprimirNfc() {

        try {

            /*
             * Garante que a capa exista.
             */

            criarCapaNfc();


            /*
             * Atualiza a data.
             */

            preencherDataNfc();


            const elemento =
                document.getElementById(
                    "capaNfcImpressao"
                );


            if (!elemento) {

                throw new Error(
                    "Capa NF-C não encontrada."
                );

            }


            /*
             * Garante que o html2canvas
             * esteja disponível.
             */

            if (
                typeof html2canvas ===
                "undefined"
            ) {

                throw new Error(
                    "html2canvas não foi carregado."
                );

            }


            /*
             * =================================================
             * GUARDA O ESTADO ORIGINAL
             * =================================================
             */

            const estadoOriginal = {

                display:
                    elemento.style.display,

                position:
                    elemento.style.position,

                left:
                    elemento.style.left,

                top:
                    elemento.style.top,

                width:
                    elemento.style.width,

                height:
                    elemento.style.height,

                zIndex:
                    elemento.style.zIndex,

                visibility:
                    elemento.style.visibility

            };


            /*
             * =================================================
             * PREPARA A CAPA PARA CAPTURA
             * =================================================
             *
             * A mesma lógica utilizada na Capa Caixa.
             */

            elemento.classList.add(
                "capture-capa"
            );


            elemento.style.display =
                "flex";

            elemento.style.position =
                "fixed";

            elemento.style.left =
                "-10000px";

            elemento.style.top =
                "0";

            elemento.style.width =
                "190mm";

            elemento.style.height =
                "65mm";

            elemento.style.zIndex =
                "-1";

            elemento.style.visibility =
                "visible";


            /*
             * =================================================
             * ESPERA O LAYOUT TERMINAR
             * =================================================
             */

            await new Promise(
                function (resolve) {

                    requestAnimationFrame(
                        function () {

                            requestAnimationFrame(
                                resolve
                            );

                        }
                    );

                }
            );


            /*
             * =================================================
             * ESPERA A LOGO CARREGAR
             * =================================================
             */

            const imagens =
                elemento.querySelectorAll(
                    "img"
                );


            await Promise.all(

                Array.from(
                    imagens
                ).map(

                    function (img) {

                        if (
                            img.complete
                        ) {

                            return Promise.resolve();

                        }


                        return new Promise(
                            function (resolve) {

                                img.onload =
                                    resolve;

                                img.onerror =
                                    resolve;

                            }
                        );

                    }

                )

            );


            /*
             * =================================================
             * GERA A IMAGEM
             * =================================================
             */

            const canvas =
                await html2canvas(
                    elemento,
                    {

                        scale: 3,

                        backgroundColor:
                            "#ffffff",

                        useCORS:
                            true,

                        logging:
                            false

                    }
                );


            const imagem =
                canvas.toDataURL(
                    "image/png"
                );


            /*
             * =================================================
             * RESTAURA A CAPA ORIGINAL
             * =================================================
             */

            elemento.style.display =
                estadoOriginal.display;

            elemento.style.position =
                estadoOriginal.position;

            elemento.style.left =
                estadoOriginal.left;

            elemento.style.top =
                estadoOriginal.top;

            elemento.style.width =
                estadoOriginal.width;

            elemento.style.height =
                estadoOriginal.height;

            elemento.style.zIndex =
                estadoOriginal.zIndex;

            elemento.style.visibility =
                estadoOriginal.visibility;

            elemento.classList.remove(
                "capture-capa"
            );


            /*
             * =================================================
             * ABRE JANELA EXCLUSIVA
             * =================================================
             */

            const janela =
                window.open(
                    "",
                    "_blank"
                );


            if (!janela) {

                alert(
                    "O navegador bloqueou a janela de impressão. Permita pop-ups para este site."
                );

                return;

            }


            /*
             * =================================================
             * DOCUMENTO EXCLUSIVO DE IMPRESSÃO
             * ================================================= */

            janela.document.open();


            janela.document.write(`

                <!DOCTYPE html>

                <html lang="pt-BR">

                <head>

                    <meta charset="UTF-8">

                    <title>
                        Capa NF-C
                    </title>


                    <style>

                        @page {

                            size: A4 portrait;

                            margin: 0;

                        }


                        html,
                        body {

                            width:
                                210mm;

                            height:
                                297mm;

                            margin:
                                0;

                            padding:
                                0;

                            background:
                                #ffffff;

                        }


                        body {

                            position:
                                relative;

                        }


                        img {

                            position:
                                absolute;

                            left:
                                10mm;

                            bottom:
                                8mm;

                            width:
                                190mm;

                            height:
                                65mm;

                            display:
                                block;

                        }

                    </style>

                </head>


                <body>

                    <img
                        src="${imagem}"
                        alt="Capa NF-C"
                    >

                </body>

                </html>

            `);


            janela.document.close();


            /*
             * =================================================
             * AGUARDA A IMAGEM E IMPRIME
             * ================================================= */

            janela.onload =
                function () {

                    setTimeout(
                        function () {

                            janela.focus();

                            janela.print();

                        },
                        300
                    );

                };


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
