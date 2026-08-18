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

    halign: "center",

    cellPadding: {
        left: 3,
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
// ÍCONES DAS ATIVIDADES
// ==========================================

didDrawCell: function(data) {

    // Somente na coluna ATIVIDADE
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


    // =================================================
    // ÍCONES BOOTSTRAP
    // =================================================

    const icones = {

        "check-in": {
            icon: "bi-person-check",
            color: "#287a46"
        },

        "check-out": {
            icon: "bi-box-arrow-right",
            color: "#2869a3"
        },

        "procedimentos": {
            icon: "bi-clipboard-check",
            color: "#287a46"
        },

        "manutenção": {
            icon: "bi-tools",
            color: "#a06b2d"
        },

        "troca de quarto": {
            icon: "bi-arrow-left-right",
            color: "#666666"
        },

        "mudança de quarto": {
            icon: "bi-arrow-left-right",
            color: "#666666"
        },

        "limpeza": {
            icon: "bi-stars",
            color: "#468eaf"
        },

        "aviso": {
            icon: "bi-exclamation-circle",
            color: "#bd912d"
        },

        "reclamação": {
            icon: "bi-exclamation-circle",
            color: "#b44646"
        }

    };


    const configIcone =
        icones[atividade];


    if (!configIcone) {
        return;
    }


    // =================================================
    // CRIA SVG DO ÍCONE BOOTSTRAP
    // =================================================

    const paths = {

        "bi-person-check": `
            <path
                fill="${configIcone.color}"
                d="M15 14s1 0 1 1-1 1-1 1-1-1-1-1 1-1 1-1m-1.5-1.5a.5.5 0 0 0-.5.5v1.5h-1.5a.5.5 0 0 0 0 1H13v1.5a.5.5 0 0 0 1 0V15.5h1.5a.5.5 0 0 0 0-1H14V13a.5.5 0 0 0-.5-.5"/>
            <path
                fill="${configIcone.color}"
                d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 2c-2.67 0-5 1.34-5 3v1h5v-1H4c0-1 1.63-2 4-2 .7 0 1.35.1 1.9.27l.4-.92A7 7 0 0 0 8 10"/>
        `,

        "bi-box-arrow-right": `
            <path
                fill="${configIcone.color}"
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 0 .5.5h5.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708L16.293 12H10.5a.5.5 0 0 0-.5.5"/>
            <path
                fill="${configIcone.color}"
                fill-rule="evenodd"
                d="M5.5 15a.5.5 0 0 0 .5-.5V3h8.5a.5.5 0 0 0 0-1H6a1 1 0 0 0-1 1v11.5a.5.5 0 0 0 .5.5"
            />
        `,

        "bi-clipboard-check": `
            <path
                fill="${configIcone.color}"
                d="M10 1.5a.5.5 0 0 1 .5.5v.5h3A1.5 1.5 0 0 1 15 4v11a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 15V4a1.5 1.5 0 0 1 1.5-1.5h3V2a.5.5 0 0 1 .5-.5zM5 3.5a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5z"
            />
            <path
                fill="${configIcone.color}"
                d="m6.5 10.5 1.5 1.5 3-3 .7.7-3.7 3.7-2.2-2.2z"
            />
        `,

        "bi-tools": `
            <path
                fill="${configIcone.color}"
                d="M1 0a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v9a2 2 0 0 0 2 2h9v-2H5V6h2a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2h4v2H2z"
            />
            <path
                fill="${configIcone.color}"
                d="M15.5 8.5a2.5 2.5 0 1 0-3.54 3.54l-4.25 4.25a.5.5 0 0 0 .7.7l4.25-4.25a2.5 2.5 0 0 0 2.84-4.24l-1.4 1.4-.7-.7 1.4-1.4a2.5 2.5 0 0 0-1.3.7"
            />
        `,

        "bi-arrow-left-right": `
            <path
                fill="${configIcone.color}"
                fill-rule="evenodd"
                d="M1 11.5a.5.5 0 0 1 .5-.5h11.793l-2.147-2.146a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L13.293 12H1.5a.5.5 0 0 1-.5-.5m14-7a.5.5 0 0 1 .5-.5h1.793l-2.147-2.146a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L17.293 5H15.5a.5.5 0 0 1-.5-.5"
            />
        `,

        "bi-stars": `
            <path
                fill="${configIcone.color}"
                d="M7.657 6.247a.5.5 0 0 1 .686 0l.97.97.97-.97a.5.5 0 0 1 .707.707l-.97.97.97.97a.5.5 0 0 1-.707.707l-.97-.97-.97.97a.5.5 0 1 1-.707-.707l.97-.97-.97-.97a.5.5 0 0 1 0-.707"
            />
            <path
                fill="${configIcone.color}"
                d="M2.5 8.5a.5.5 0 0 1 .5.5v1.5h1.5a.5.5 0 0 1 0 1H3v1.5a.5.5 0 0 1-1 0V11H.5a.5.5 0 0 1 0-1H2V9a.5.5 0 0 1 .5-.5"
            />
        `,

        "bi-exclamation-circle": `
            <circle
                cx="8"
                cy="8"
                r="7"
                fill="none"
                stroke="${configIcone.color}"
                stroke-width="1.4"
            />
            <path
                fill="${configIcone.color}"
                d="M7.5 4.5h1v5h-1zm0 6h1v1h-1z"
            />
        `

    };


    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
        >
            ${paths[configIcone.icon]}
        </svg>
    `;


    // =================================================
    // CONVERTE SVG PARA DATA URI
    // =================================================

    const svgBase64 =
        btoa(
            unescape(
                encodeURIComponent(svg)
            )
        );


    const dataUri =
        "data:image/svg+xml;base64," +
        svgBase64;


    // =================================================
    // POSICIONAMENTO
    // =================================================

    const imgSize = 4.5;

    const iconX =
        data.cell.x +
        (data.cell.width / 2) -
        12;

    const iconY =
        data.cell.y +
        (data.cell.height / 2) -
        (imgSize / 2);


    doc.addImage(
        dataUri,
        "SVG",
        iconX,
        iconY,
        imgSize,
        imgSize
    );

}

});
        const finalY =
            doc.lastAutoTable.finalY;



// =====================================================
// QUADRO DE ASSINATURAS E CONFERÊNCIA
// =====================================================

const alturaAssinaturas = 42;

let assinaturaY = finalY + 5;


// Se não houver espaço suficiente,
// cria uma nova página somente nesse caso.
if (assinaturaY + alturaAssinaturas > 292) {

    doc.addPage();

    assinaturaY = 15;

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
// LINHAS DE ASSINATURA
// =====================================================

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

doc.setDrawColor(
    100,
    100,
    100
);

doc.setLineWidth(0.3);


// =====================================================
// RESPONSÁVEL PELO REGISTRO
// =====================================================

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
    assinaturaY + 25
);

doc.line(
    116,
    assinaturaY + 25,
    190,
    assinaturaY + 25
);


// =====================================================
// CONFERÊNCIA 2
// =====================================================

doc.text(
    "2.",
    108,
    assinaturaY + 32
);

doc.line(
    116,
    assinaturaY + 32,
    190,
    assinaturaY + 32
);


// =====================================================
// CONFERÊNCIA 3
// =====================================================

doc.text(
    "3.",
    108,
    assinaturaY + 39
);

doc.line(
    116,
    assinaturaY + 39,
    190,
    assinaturaY + 39
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
