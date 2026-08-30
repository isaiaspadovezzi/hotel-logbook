/* =====================================================
   CAPA NF-C
   CUPONS FISCAIS - NF-C
   IMPRESSÃO COMO IMAGEM
   ===================================================== */

(function () {

    "use strict";


    /* =================================================
       CRIA A CAPA ORIGINAL
       ================================================= */

    function criarCapaNfc() {

        let capa =
            document.getElementById(
                "capaNfcImpressao"
            );


        if (capa) {

            return capa;

        }


        capa =
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


        capa.style.display =
            "none";


        document.body.appendChild(
            capa
        );


        return capa;

    }


    /* =================================================
       OBTÉM A DATA
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
       ATUALIZA A DATA DA CAPA
       ================================================= */

    function preencherDataNfc() {

        const capa =
            document.getElementById(
                "capaNfcImpressao"
            );


        if (!capa) {

            return;

        }


        const elemento =
            capa.querySelector(
                "#nfcData"
            );


        if (!elemento) {

            return;

        }


        elemento.textContent =
            obterDataNfc() || "—";

    }


    /* =================================================
       CRIA UMA CAPA EXCLUSIVA PARA CAPTURA
       ================================================= */

    function criarCapaParaCaptura() {

        const captura =
            document.createElement(
                "div"
            );


        captura.id =
            "nfcCapturaTemporaria";


        /*
         * =================================================
         * TAMANHO DA CAPA
         * =================================================
         */

        captura.style.position =
            "fixed";

        captura.style.left =
            "-10000px";

        captura.style.top =
            "0";

        captura.style.width =
            "190mm";

        captura.style.height =
            "65mm";

        captura.style.boxSizing =
            "border-box";

        captura.style.margin =
            "0";

        captura.style.padding =
            "0";

        captura.style.background =
            "#ffffff";

        captura.style.overflow =
            "hidden";

        captura.style.display =
            "flex";

        captura.style.flexDirection =
            "column";

        captura.style.fontFamily =
            "Arial, Helvetica, sans-serif";


        /*
         * =================================================
         * CABEÇALHO
         * =================================================
         */

        const titulo =
            document.createElement(
                "div"
            );


        titulo.textContent =
            "CUPONS FISCAIS - NF-C";


        titulo.style.width =
            "100%";

        titulo.style.height =
            "15mm";

        titulo.style.minHeight =
            "15mm";

        titulo.style.boxSizing =
            "border-box";

        titulo.style.background =
            "#198754";

        titulo.style.color =
            "#ffffff";

        titulo.style.display =
            "flex";

        titulo.style.alignItems =
            "center";

        titulo.style.paddingLeft =
            "7mm";

        titulo.style.paddingRight =
            "7mm";

        titulo.style.fontSize =
            "15pt";

        titulo.style.fontWeight =
            "700";

        titulo.style.lineHeight =
            "1";


        captura.appendChild(
            titulo
        );


        /*
         * =================================================
         * ÁREA INTERNA
         * =================================================
         */

        const conteudo =
            document.createElement(
                "div"
            );


        conteudo.style.position =
            "relative";

        conteudo.style.width =
            "100%";

        conteudo.style.height =
            "50mm";

        conteudo.style.boxSizing =
            "border-box";

        conteudo.style.background =
            "#ffffff";

        conteudo.style.display =
            "flex";

        conteudo.style.flexDirection =
            "column";

        conteudo.style.alignItems =
            "center";

        conteudo.style.justifyContent =
            "center";


        captura.appendChild(
            conteudo
        );


        /*
         * =================================================
         * DATA
         * =================================================
         */

        const data =
            document.createElement(
                "div"
            );


        data.textContent =
            obterDataNfc() || "—";


        data.style.position =
            "absolute";

        data.style.left =
            "7mm";

        data.style.top =
            "5mm";

        data.style.fontSize =
            "11pt";

        data.style.fontWeight =
            "400";

        data.style.color =
            "#333333";

        data.style.lineHeight =
            "1.2";


        conteudo.appendChild(
            data
        );


        /*
         * =================================================
         * LOGO
         * =================================================
         */

        const logo =
            document.createElement(
                "img"
            );


        logo.src =
            "img/logo.png";


        logo.alt =
            "ibis Styles";


        logo.style.position =
            "absolute";

        logo.style.right =
            "7mm";

        logo.style.top =
            "5mm";

        logo.style.width =
            "21mm";

        logo.style.height =
            "auto";

        logo.style.maxWidth =
            "21mm";

        logo.style.maxHeight =
            "40mm";

        logo.style.objectFit =
            "contain";


        conteudo.appendChild(
            logo
        );


        document.body.appendChild(
            captura
        );


        return captura;

    }


    /* =================================================
       AGUARDA A LOGO
       ================================================= */

    function aguardarLogo(
        logo
    ) {

        return new Promise(
            function (resolve) {

                if (
                    logo.complete &&
                    logo.naturalWidth > 0
                ) {

                    resolve();

                    return;

                }


                logo.onload =
                    function () {

                        resolve();

                    };


                logo.onerror =
                    function () {

                        resolve();

                    };

            }
        );

    }


    /* =================================================
       IMPRIMIR NF-C
       ================================================= */

    async function imprimirNfc() {

        let captura = null;


        try {

            /*
             * Garante que a capa original exista.
             */

            criarCapaNfc();


            /*
             * Atualiza a data.
             */

            preencherDataNfc();


            /*
             * Verifica html2canvas.
             */

            if (
                typeof html2canvas ===
                "undefined"
            ) {

                throw new Error(
                    "html2canvas não está disponível."
                );

            }


            /*
             * Cria uma capa completamente
             * independente para captura.
             */

            captura =
                criarCapaParaCaptura();


            /*
             * Aguarda a logo.
             */

            const logo =
                captura.querySelector(
                    "img"
                );


            await aguardarLogo(
                logo
            );


            /*
             * Dá tempo para o navegador
             * calcular todas as dimensões.
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
             * CAPTURA
             * ================================================= */

            const canvas =
                await html2canvas(
                    captura,
                    {

                        scale: 3,

                        width:
                            captura.offsetWidth,

                        height:
                            captura.offsetHeight,

                        backgroundColor:
                            "#ffffff",

                        useCORS:
                            true,

                        allowTaint:
                            false,

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
             * REMOVE A CAPTURA
             * ================================================= */

            captura.remove();

            captura =
                null;


            /*
             * Garante que a capa original
             * permaneça escondida.
             */

            const original =
                document.getElementById(
                    "capaNfcImpressao"
                );


            if (original) {

                original.style.display =
                    "none";

            }


            /*
             * =================================================
             * ABRE JANELA DE IMPRESSÃO
             * ================================================= */

            const janela =
                window.open(
                    "",
                    "_blank",
                    "width=900,height=700"
                );


            if (!janela) {

                throw new Error(
                    "O navegador bloqueou a janela de impressão."
                );

            }


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


                        * {

                            box-sizing:
                                border-box;

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

                            overflow:
                                hidden;

                        }


                        body {

                            position:
                                relative;

                        }


                        .folha {

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

                            margin:
                                0;

                            padding:
                                0;

                        }


                        .folha img {

                            display:
                                block;

                            width:
                                190mm;

                            height:
                                65mm;

                            margin:
                                0;

                            padding:
                                0;

                        }

                    </style>

                </head>


                <body>

                    <div class="folha">

                        <img
                            src="${imagem}"
                            alt="Capa NF-C"
                        >

                    </div>

                </body>

                </html>

            `);


            janela.document.close();


            /*
             * Aguarda a janela terminar
             * de carregar antes de imprimir.
             */

            janela.onload =
                function () {

                    setTimeout(
                        function () {

                            janela.focus();

                            janela.print();

                        },
                        500
                    );

                };


        } catch (erro) {

            /*
             * Remove captura se houver erro.
             */

            if (captura) {

                captura.remove();

                captura =
                    null;

            }


            /*
             * Mantém capa original escondida.
             */

            const original =
                document.getElementById(
                    "capaNfcImpressao"
                );


            if (original) {

                original.style.display =
                    "none";

            }


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


        const botaoFrnh =
            document.getElementById(
                "btnCapaFrnh"
            );


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

        const capa =
            criarCapaNfc();


        capa.style.display =
            "none";


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
