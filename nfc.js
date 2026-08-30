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


        /*
         * IMPORTANTE:
         * A capa original fica escondida.
         * A impressão usa uma cópia temporária.
         */

        capa.style.display =
            "none";


        document.body.appendChild(
            capa
        );


        return capa;

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

    function preencherDataNfc(
        elementoCapa
    ) {

        const elemento =
            elementoCapa.querySelector(
                "#nfcData"
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
       PREPARA CÓPIA PARA CAPTURA
       ================================================= */

    function prepararCopiaNfc(
        original
    ) {

        const copia =
            original.cloneNode(
                true
            );


        /*
         * ID não pode ficar duplicado
         * no documento.
         */

        copia.id =
            "capaNfcCapturaTemporaria";


        /*
         * Posicionamento fora da tela.
         */

        copia.style.display =
            "flex";

        copia.style.position =
            "fixed";

        copia.style.left =
            "-10000px";

        copia.style.top =
            "0";


        /*
         * TAMANHO EXATO DA CAPA.
         */

        copia.style.width =
            "190mm";

        copia.style.height =
            "65mm";


        copia.style.minWidth =
            "190mm";

        copia.style.minHeight =
            "65mm";


        copia.style.maxWidth =
            "190mm";

        copia.style.maxHeight =
            "65mm";


        copia.style.boxSizing =
            "border-box";


        copia.style.margin =
            "0";

        copia.style.padding =
            "0";


        copia.style.background =
            "#ffffff";


        copia.style.overflow =
            "hidden";


        /*
         * Layout da capa.
         */

        copia.style.flexDirection =
            "column";


        /*
         * Garante que a captura
         * fique acima de outros elementos.
         */

        copia.style.zIndex =
            "-1";


        /*
         * Impede que o elemento
         * temporário apareça na página.
         */

        copia.style.visibility =
            "visible";


        document.body.appendChild(
            copia
        );


        return copia;

    }


    /* =================================================
       AGUARDA IMAGENS
       ================================================= */

    function aguardarImagens(
        elemento
    ) {

        const imagens =
            Array.from(
                elemento.querySelectorAll(
                    "img"
                )
            );


        return Promise.all(

            imagens.map(
                function (imagem) {

                    if (
                        imagem.complete
                    ) {

                        return Promise.resolve();

                    }


                    return new Promise(
                        function (resolve) {

                            imagem.onload =
                                resolve;

                            imagem.onerror =
                                resolve;

                        }
                    );

                }
            )

        );

    }


    /* =================================================
       IMPRIMIR CAPA NF-C
       ================================================= */

    async function imprimirNfc() {

        let copia = null;


        try {

            /*
             * Cria a capa original somente
             * se ainda não existir.
             */

            const original =
                criarCapaNfc();


            /*
             * Atualiza a data.
             */

            preencherDataNfc(
                original
            );


            /*
             * Gera uma CÓPIA temporária.
             */

            copia =
                prepararCopiaNfc(
                    original
                );


            /*
             * Atualiza a data também na cópia.
             */

            preencherDataNfc(
                copia
            );


            /*
             * Aguarda o navegador montar
             * completamente o layout.
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
             * Aguarda a logo carregar.
             */

            await aguardarImagens(
                copia
            );


            /*
             * =================================================
             * CAPTURA
             * =================================================
             */

            const canvas =
                await html2canvas(
                    copia,
                    {

                        scale: 3,

                        backgroundColor:
                            "#ffffff",

                        useCORS:
                            true,

                        allowTaint:
                            false,

                        logging:
                            false,

                        width:
                            copia.offsetWidth,

                        height:
                            copia.offsetHeight

                    }
                );


            const imagem =
                canvas.toDataURL(
                    "image/png"
                );


            /*
             * =================================================
             * REMOVE IMEDIATAMENTE A CÓPIA
             * =================================================
             */

            if (copia) {

                copia.remove();

                copia = null;

            }


            /*
             * =================================================
             * GARANTE QUE A CAPA ORIGINAL
             * CONTINUE ESCONDIDA
             * =================================================
             */

            original.style.display =
                "none";


            /*
             * =================================================
             * ABRE JANELA EXCLUSIVA
             * =================================================
             */

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


                        .capa-impressao {

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


                        .capa-impressao img {

                            display:
                                block;

                            width:
                                190mm;

                            height:
                                65mm;

                            object-fit:
                                contain;

                        }

                    </style>

                </head>


                <body>

                    <div class="capa-impressao">

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
             * =================================================
             * IMPRIME SOMENTE A IMAGEM
             * ================================================= */

            setTimeout(
                function () {

                    try {

                        janela.focus();

                        janela.print();

                    } catch (erro) {

                        console.error(
                            "Erro ao abrir impressão NF-C:",
                            erro
                        );

                    }

                },
                500
            );


        } catch (erro) {

            /*
             * Se alguma coisa der errado,
             * remove a cópia temporária.
             */

            if (copia) {

                copia.remove();

                copia = null;

            }


            /*
             * Mantém a capa original escondida.
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

        /*
         * Cria a capa e garante
         * que ela fique escondida.
         */

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
