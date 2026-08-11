// =====================================================
// PDF.JS
// LogBook - ibis Styles
// Versão 3.0
// =====================================================


// =====================================================
// CORES
// =====================================================

const PDF_COR_PRINCIPAL = [99, 193, 50];

const PDF_COR_VERDE_CLARO = [241, 248, 239];

const PDF_COR_TEXTO = [60, 60, 60];

const PDF_COR_CINZA = [150, 150, 150];


// =====================================================
// CARREGAR LOGO
// =====================================================

function carregarLogoPDF() {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.src = "img/logo.png";

        img.onload = function () {

            const canvas =
                document.createElement("canvas");

            canvas.width = img.naturalWidth;

            canvas.height = img.naturalHeight;

            const ctx =
                canvas.getContext("2d");

            ctx.drawImage(
                img,
                0,
                0
            );

            resolve({

                data: canvas.toDataURL("image/png"),

                width: img.naturalWidth,

                height: img.naturalHeight

            });

        };

        img.onerror = function () {

            reject(
                new Error("Não foi possível carregar a logo.")
            );

        };

    });

}


// =====================================================
// FORMATAR DATA
// =====================================================

function formatarDataPDF(dataISO) {

    if (!dataISO) {

        return "";

    }

    const partes =
        dataISO.split("-");

    if (partes.length !== 3) {

        return dataISO;

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
// OBTER REGISTROS
// =====================================================

function obterRegistrosPDF() {

    if (
        typeof registros !== "undefined" &&
        Array.isArray(registros)
    ) {

        return registros;

    }

    return [];

}


// =====================================================
// CRIAR TEXTO DO RESUMO
// =====================================================

function resumoRegistroPDF(registro) {

    let resumo = "";

    if (registro.descricao) {

        resumo = registro.descricao;

    }

    const extras = [];

    if (registro.pagamento) {

        extras.push(
            "Pagamento: " +
            registro.pagamento
        );

    }

    if (registro.valor) {

        extras.push(
            "Valor: R$ " +
            registro.valor
        );

    }

    if (registro.reserva) {

        extras.push(
            "Reserva: " +
            registro.reserva
        );

    }

    if (registro.despertar) {

        extras.push(
            "Despertar: " +
            registro.despertar
        );

    }

    if (extras.length > 0) {

        if (resumo) {

            resumo += "\n";

        }

        resumo += extras.join(" • ");

    }

    return resumo || "-";

}


// =====================================================
// EXPORTAR PDF
// =====================================================

async function exportarPDF() {

    try {

        // ---------------------------------------------
        // VERIFICAR jsPDF
        // ---------------------------------------------

        if (!window.jspdf) {

            alert(
                "A biblioteca do PDF não foi carregada. " +
                "Atualize a página e tente novamente."
            );

            return;

        }


        const { jsPDF } =
            window.jspdf;


        // ---------------------------------------------
        // CRIAR DOCUMENTO
        // ---------------------------------------------

        const doc = new jsPDF({

            orientation: "portrait",

            unit: "mm",

            format: "a4"

        });


        // ---------------------------------------------
        // LOGO
        // ---------------------------------------------

        let logo = null;

        try {

            logo =
                await carregarLogoPDF();

        } catch (erroLogo) {

            console.warn(
                "Logo não encontrada.",
                erroLogo
            );

        }


        // ---------------------------------------------
        // CABEÇALHO
        // ---------------------------------------------

        doc.setFillColor(
            255,
            255,
            255
        );

        doc.rect(
            0,
            0,
            210,
            35,
            "F"
        );


        // Linha verde

        doc.setFillColor(
            ...PDF_COR_PRINCIPAL
        );

        doc.rect(
            0,
            31,
            210,
            3,
            "F"
        );


        // ---------------------------------------------
        // LOGO
        // ---------------------------------------------

        if (logo) {

            const larguraLogo = 17;

            const alturaLogo =
                larguraLogo *
                logo.height /
                logo.width;

            doc.addImage(

                logo.data,

                "PNG",

                168,

                7,

                larguraLogo,

                alturaLogo

            );

        }


        // ---------------------------------------------
        // TÍTULO
        // ---------------------------------------------

        doc.setTextColor(
            ...PDF_COR_PRINCIPAL
        );

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(22);

        doc.text(
            "LOGBOOK",
            15,
            16
        );


        doc.setFontSize(10);

        doc.setTextColor(
            120,
            120,
            120
        );

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.text(
            "Registro de Ocorrências",
            15,
            23
        );


        // ---------------------------------------------
        // DADOS DO TURNO
        // ---------------------------------------------

        const data =
            formatarDataPDF(
                document.getElementById("data")?.value
            );

        const funcionario =
            document.getElementById("funcionario")?.value ||
            "";

        const turno =
            document.getElementById("turno")?.value ||
            "";


        // ---------------------------------------------
        // CARTÃO DE INFORMAÇÕES
        // ---------------------------------------------

        doc.setFillColor(
            ...PDF_COR_VERDE_CLARO
        );

        doc.roundedRect(
            15,
            40,
            180,
            28,
            3,
            3,
            "F"
        );


        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(11);

        doc.setTextColor(
            ...PDF_COR_TEXTO
        );

        doc.text(
            "Informações do Turno",
            20,
            48
        );


        // Linha

        doc.setDrawColor(
            220,
            220,
            220
        );

        doc.line(
            20,
            51,
            190,
            51
        );


        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(10);


        // Data

        doc.text(
            "Data:",
            20,
            58
        );

        doc.text(
            data,
            40,
            58
        );


        // Funcionário

        doc.text(
            "Funcionário:",
            20,
            64
        );

        doc.text(
            funcionario,
            48,
            64
        );


        // Turno

        doc.text(
            "Turno:",
            120,
            58
        );

        doc.text(
            turno,
            140,
            58
        );


        // ---------------------------------------------
        // REGISTROS
        // ---------------------------------------------

        const registrosPDF =
            obterRegistrosPDF();


        const linhas =
            registrosPDF.map(
                function (registro) {

                    return [

                        registro.hora || "",

                        registro.atividade || "",

                        registro.quarto || "",

                        resumoRegistroPDF(
                            registro
                        )

                    ];

                }
            );


        // Nenhum registro

        if (linhas.length === 0) {

            linhas.push([

                "-",

                "-",

                "-",

                "Nenhum registro encontrado."

            ]);

        }


        // ---------------------------------------------
        // TABELA
        // ---------------------------------------------

        doc.autoTable({

            startY: 78,

            head: [[

                "Hora",

                "Atividade",

                "Quarto",

                "Descrição"

            ]],

            body: linhas,

            theme: "grid",


            headStyles: {

                fillColor:
                    PDF_COR_PRINCIPAL,

                textColor:
                    [255, 255, 255],

                fontStyle:
                    "bold",

                halign:
                    "center",

                valign:
                    "middle",

                fontSize:
                    10

            },


            bodyStyles: {

                textColor:
                    PDF_COR_TEXTO,

                fontSize:
                    9,

                cellPadding:
                    3,

                valign:
                    "middle"

            },


            alternateRowStyles: {

                fillColor:
                    [232, 240, 228]

            },


            styles: {

                lineColor:
                    [220, 220, 220],

                lineWidth:
                    0.2,

                overflow:
                    "linebreak"

            },


            columnStyles: {

                0: {
                    cellWidth: 22,
                    halign: "center"
                },

                1: {
                    cellWidth: 40
                },

                2: {
                    cellWidth: 24,
                    halign: "center"
                },

                3: {
                    cellWidth: 94
                }

            }

        });


        // ---------------------------------------------
        // POSIÇÃO FINAL
        // ---------------------------------------------

        const finalY =
            doc.lastAutoTable.finalY;


        // ---------------------------------------------
        // TOTAL
        // ---------------------------------------------

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(10);

        doc.setTextColor(
            ...PDF_COR_TEXTO
        );

        doc.text(

            "Total de registros: " +
            registrosPDF.length,

            15,

            finalY + 10

        );


        // ---------------------------------------------
        // DATA DE EMISSÃO
        // ---------------------------------------------

        const agora =
            new Date();


        const dataHora =

            agora.toLocaleDateString(
                "pt-BR"
            ) +

            " às " +

            agora.toLocaleTimeString(
                "pt-BR",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        // ---------------------------------------------
        // RODAPÉ
        // ---------------------------------------------

        const paginas =
            doc.internal.getNumberOfPages();


        for (
            let i = 1;
            i <= paginas;
            i++
        ) {

            doc.setPage(i);


            // Linha verde

            doc.setDrawColor(
                ...PDF_COR_PRINCIPAL
            );

            doc.setLineWidth(0.5);

            doc.line(
                15,
                285,
                195,
                285
            );


            // Texto

            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(8);

            doc.setTextColor(
                ...PDF_COR_CINZA
            );


            doc.text(
                "ibis Styles • LogBook",
                15,
                290
            );


            doc.text(
                "Emitido em " + dataHora,
                70,
                290
            );


            doc.text(
                "Página " +
                i +
                " de " +
                paginas,
                165,
                290
            );

        }


        // ---------------------------------------------
        // NOME DO ARQUIVO
        // ---------------------------------------------

        const nomeArquivo =

            "LogBook_" +

            (
                data ||
                "registro"
            ).replace(
                /\//g,
                "-"
            ) +

            ".pdf";


        // ---------------------------------------------
        // SALVAR
        // ---------------------------------------------

        doc.save(
            nomeArquivo
        );


    } catch (erro) {

        console.error(
            "Erro ao gerar PDF:",
            erro
        );

        alert(
            "Não foi possível gerar o PDF. " +
            "Verifique o Console (F12) para mais detalhes."
        );

    }

}


// =====================================================
// DISPONIBILIZAR FUNÇÃO PARA O HTML
// =====================================================

window.exportarPDF =
    exportarPDF;


console.log(
    "PDF.js carregado com sucesso."
);
