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

        const funcionarioElemento =
    document.getElementById("funcionario");

const funcionario =
    funcionarioElemento
        ? funcionarioElemento.value
        : "";

const turnoElemento =
    document.getElementById("turno");

const turno =
    turnoElemento
        ? turnoElemento.value
        : "";

        // ---------------------------------------------
        // CARTÃO DE INFORMAÇÕES
        // ---------------------------------------------

        doc.setFillColor(
            ...PDF_COR_VERDE_CLARO
        );

       doc.roundedRect(
    15,
    36,
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
            44
        );


        // Linha

        doc.setDrawColor(
            220,
            220,
            220
        );

      doc.line(
    20,
    47,
    190,
    47

        );


        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(10);


        // Data

// ============================================
// DATA / FUNCIONÁRIO / TURNO
// ============================================

// --------------------------------------------
// DATA
// --------------------------------------------

doc.setFillColor(225, 235, 220);

doc.roundedRect(
    20,
    49,
    45,
    11,
    2,
    2,
    "F"
);

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(7);

doc.setTextColor(
    70,
    90,
    70
);

doc.text(
    "DATA",
    23,
    53
);
doc.setFontSize(11);

doc.setTextColor(
    ...PDF_COR_TEXTO
);

doc.text(
    data,
    23,
    58
);

// --------------------------------------------
// FUNCIONÁRIO
// --------------------------------------------

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(7);

doc.setTextColor(
    120,
    120,
    120
);
doc.text(
    "FUNCIONÁRIO",
    75,
    53
);

doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(10);

doc.setTextColor(
    ...PDF_COR_TEXTO
);

doc.text(
    funcionario,
    75,
    59
);


// --------------------------------------------
// TURNO
// --------------------------------------------

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(7);

doc.setTextColor(
    120,
    120,
    120
);

doc.text(
    "TURNO",
    145,
    53
);

doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(10);

doc.setTextColor(
    ...PDF_COR_TEXTO
);

doc.text(
    turno,
    145,
    59
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

    startY: 70,

    margin: {
        left: 15,
        right: 15
    },

    head: [[
        "Hora",
        "Atividade",
        "Quarto",
        "Descrição"
    ]],

    body: linhas,


    // ==========================================
    // CABEÇALHO DA TABELA
    // ==========================================

    headStyles: {

        fillColor:
            PDF_COR_PRINCIPAL,

        textColor:
            [255, 255, 255],

        fontStyle:
            "bold",

        fontSize:
            9,

        halign:
            "center",

        valign:
            "middle",

        cellPadding:
            2.5,

        lineColor:
            [180, 190, 180],

        lineWidth:
            0.3

    },


    // ==========================================
    // CORPO DA TABELA
    // ==========================================

    bodyStyles: {

        textColor:
            PDF_COR_TEXTO,

        fontSize:
            8.5,

        cellPadding: {

            top: 1.5,

            right: 3,

            bottom: 1.5,

            left: 3

        },

        valign:
            "middle",

        lineColor:
            [170, 180, 170],

        lineWidth:
            0.3

    },


    // ==========================================
    // ESTILO GERAL
    // ==========================================

    styles: {

        font:
            "helvetica",

        overflow:
            "linebreak",

        cellWidth:
            "wrap",

        lineColor:
            [170, 180, 170],

        lineWidth:
            0.3

    },


    // ==========================================
    // CORES ALTERNADAS DAS LINHAS
    // ==========================================

    alternateRowStyles: {

        fillColor:
            [242, 247, 240]

    },


    // ==========================================
    // LARGURA DAS COLUNAS
    // ==========================================

    columnStyles: {

        0: {

            cellWidth: 22,

            halign: "center"

        },

1: {

    cellWidth: 40,

    cellPadding: {
        left: 7,
        right: 3,
        top: 1.5,
        bottom: 1.5
    }

},


        2: {

            cellWidth: 24,

            halign: "center"

        },


        3: {

            cellWidth: 94

        }

    },


   // ==========================================
// ÍCONES DE CHECK-IN / CHECK-OUT
// ==========================================

didDrawCell: function(data) {

    // Somente na coluna Atividade
    if (
        data.section !== "body" ||
        data.column.index !== 1
    ) {
        return;
    }


    const atividade =
        String(data.cell.raw || "")
            .toLowerCase()
            .trim();


    // Posição do ícone
    const x =
        data.cell.x + 3.5;

    const y =
        data.cell.y +
        data.cell.height / 2;


    // ==========================================
    // CHECK-IN
    // ==========================================

    if (atividade === "check-in") {

        doc.setDrawColor(
            40,
            120,
            70
        );

        doc.setLineWidth(0.4);


        // Cabeça
        doc.circle(
            x,
            y - 1.2,
            0.8
        );


        // Corpo
        doc.line(
            x - 1.4,
            y + 1.2,
            x + 1.4,
            y + 1.2
        );


        // Check
        doc.line(
            x + 1.6,
            y - 0.6,
            x + 2.2,
            y
        );

        doc.line(
            x + 2.2,
            y,
            x + 3.2,
            y - 1.2
        );

    }


    // ==========================================
    // CHECK-OUT
    // ==========================================

    if (atividade === "check-out") {

        doc.setDrawColor(
            40,
            100,
            160
        );

        doc.setLineWidth(0.4);


        // Porta pequena
        doc.line(
            x - 1.2,
            y - 2,
            x - 1.2,
            y + 2
        );

        doc.line(
            x - 1.2,
            y - 2,
            x + 0.6,
            y - 2
        );

        doc.line(
            x + 0.6,
            y - 2,
            x + 0.6,
            y + 2
        );


        // Seta de saída
        doc.line(
            x,
            y,
            x + 3.2,
            y
        );

        doc.line(
            x + 3.2,
            y,
            x + 2,
            y - 1
        );

        doc.line(
            x + 3.2,
            y,
            x + 2,
            y + 1
        );

    }

}

});
        const finalY =
            doc.lastAutoTable.finalY;



// =====================================================
// QUADRO DE ASSINATURAS E CONFERÊNCIA
// =====================================================

//  aproximada necessária para o quadro
const alturaAssinaturas = 40;

// Verifica se existe espaço suficiente na página
let assinaturaY = finalY + 8;

// Se não houver espaço, cria uma nova página
if (assinaturaY + alturaAssinaturas > 280) {

    doc.addPage();

    assinaturaY = 20;

}


// =====================================================
// CAIXA PRINCIPAL
// =====================================================

doc.setFillColor(
    248,
    250,
    247
);

doc.setDrawColor(
    190,
    200,
    190
);

doc.setLineWidth(0.4);

doc.roundedRect(
    15,
    assinaturaY,
    180,
    alturaAssinaturas,
    2,
    2,
    "FD"
);


// =====================================================
// TÍTULO
// =====================================================

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(10);

doc.setTextColor(
    ...PDF_COR_PRINCIPAL
);

doc.text(
    "ASSINATURAS E CONFERÊNCIA",
    20,
    assinaturaY + 8
);


// =====================================================
// LINHA DIVISÓRIA
// =====================================================

doc.setDrawColor(
    210,
    215,
    210
);

doc.line(
    20,
    assinaturaY + 11,
    190,
    assinaturaY + 11
);


// =====================================================
// TÍTULOS
// =====================================================

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(8);

doc.setTextColor(
    80,
    80,
    80
);

doc.text(
    "RESPONSÁVEL PELO REGISTRO",
    20,
    assinaturaY + 18
);

doc.text(
    "CONFERÊNCIA",
    108,
    assinaturaY + 18
);


// =====================================================
// RESPONSÁVEL PELO REGISTRO
// =====================================================

doc.setDrawColor(
    100,
    100,
    100
);

doc.setLineWidth(0.3);

doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(7);

doc.setTextColor(
    100,
    100,
    100
);

doc.text(
    "Assinatura:",
    20,
    assinaturaY + 29
);

doc.line(
    40,
    assinaturaY + 29,
    95,
    assinaturaY + 29
);


// =====================================================
// CONFERÊNCIA 1
// =====================================================

doc.text(
    "1.",
    108,
    assinaturaY + 27
);

doc.line(
    116,
    assinaturaY + 27,
    190,
    assinaturaY + 27
);


// =====================================================
// CONFERÊNCIA 2
// =====================================================

doc.text(
    "2.",
    108,
    assinaturaY + 36
);

doc.line(
    116,
    assinaturaY + 36,
    190,
    assinaturaY + 36
);


// =====================================================
// CONFERÊNCIA 3
// =====================================================

doc.text(
    "3.",
    108,
    assinaturaY + 45
);

doc.line(
    116,
    assinaturaY + 45,
    190,
    assinaturaY + 45
);




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
