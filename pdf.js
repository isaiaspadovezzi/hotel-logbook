// =====================================================
// PDF.JS
// Sistema LogBook - ibis Styles
// Parte 1
// =====================================================

// -----------------------------------------------------
// CORES
// -----------------------------------------------------

const COR_PRINCIPAL = [99, 193, 50];
const COR_VERDE_CLARO = [241, 248, 239];
const COR_TEXTO = [60, 60, 60];
const COR_CINZA = [150, 150, 150];

// -----------------------------------------------------
// CARREGA A LOGO
// -----------------------------------------------------

function carregarLogo() {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.src = "img/logo.png";

        img.onload = function () {

            const canvas = document.createElement("canvas");

            canvas.width = img.width;

            canvas.height = img.height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

           resolve({

    data: canvas.toDataURL("image/png"),

    width: img.width,

    height: img.height

});

        };

        img.onerror = reject;

    });

}

// -----------------------------------------------------
// FORMATA DATA
// -----------------------------------------------------

function formatarData(dataISO){

    if(!dataISO) return "";

    const partes = dataISO.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];

}

// -----------------------------------------------------
// EXPORTAR PDF
// -----------------------------------------------------

async function exportarPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({

        orientation:"portrait",

        unit:"mm",

        format:"a4"

    });

    // --------------------------------------------
    // CARREGA LOGO
    // --------------------------------------------

    let logo = null;

    try{

        logo = await carregarLogo();

    }catch(e){

        console.log("Logo não encontrada.");

    }

    // --------------------------------------------
    // CABEÇALHO BRANCO
    // --------------------------------------------

    doc.setFillColor(255,255,255);

    doc.rect(0,0,210,35,"F");

    // Linha verde

doc.setFillColor(...COR_PRINCIPAL);

doc.rect(0,31,210,3,"F");

    // --------------------------------------------
    // LOGO
    // --------------------------------------------

    if(logo){

       // ------------------------------------
// LOGO COM PROPORÇÃO ORIGINAL
// ------------------------------------

const larguraLogo = 17;

const alturaLogo =
    larguraLogo * logo.height / logo.width;

doc.addImage(

    logo.data,

    "PNG",

    168,

    7,

    larguraLogo,

    alturaLogo

);
    }

    // --------------------------------------------
    // TÍTULO
    // --------------------------------------------

    doc.setTextColor(...COR_PRINCIPAL);

    doc.setFont("helvetica","bold");

    doc.setFontSize(22);

    doc.text(

        "LOGBOOK",

        15,

        16

    );

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.setFont("helvetica","normal");

    doc.text(

        "Registro de Ocorrências",

        15,

        23

    );

    // --------------------------------------------
    // DADOS DA TELA
    // --------------------------------------------

    const data = formatarData(

        document.getElementById("data").value

    );

    const funcionario =

        document.getElementById("funcionario").value;

    const turno =

        document.getElementById("turno").value;

 // ============================================
// CARTÃO DE INFORMAÇÕES
// ============================================

// Fundo verde claro
doc.setFillColor(...COR_VERDE_CLARO);

doc.roundedRect(
    15,
    40,
    180,
    28,
    3,
    3,
    "F"
);

// Título do cartão
doc.setFont("helvetica","bold");
doc.setFontSize(11);
doc.setTextColor(...COR_TEXTO);

doc.text(
    "Informações do Turno",
    20,
    48
);

// Linha divisória
doc.setDrawColor(220);

doc.line(
    20,
    51,
    190,
    51
);

// Conteúdo
doc.setFont("helvetica","normal");
doc.setFontSize(10);

// Coluna esquerda
doc.text("Data:",20,58);
doc.text(data,40,58);

doc.text("Funcionário:",20,64);
doc.text(funcionario,40,64);

// Coluna direita
doc.text("Turno:",120,58);
doc.text(turno,140,58);

// ============================================
// TABELA
// ============================================

let linhas = [];

if(typeof registros !== "undefined"){

    registros.forEach(registro=>{

        linhas.push([

            registro.hora || "",

            registro.atividade || "",

            registro.quarto || "",

            registro.descricao || ""

        ]);

    });

}

// Caso não exista nenhum registro

if(linhas.length===0){

    linhas.push([

        "-",

        "-",

        "-",

        "Nenhum registro encontrado."

    ]);

}

// ============================================
// TABELA PRINCIPAL
// ============================================

doc.autoTable({

    startY:78,

    head:[[
        "Hora",
        "Atividade",
        "Quarto",
        "Descrição"
    ]],

    body:linhas,

    theme:"grid",

    headStyles:{

        fillColor:COR_PRINCIPAL,

        textColor:[255,255,255],

        fontStyle:"bold",

        halign:"center",

        valign:"middle",

        fontSize:10

    },

    bodyStyles:{

        textColor:[50,50,50],

        fontSize:9,

        cellPadding:3,

        lineColor:[220,220,220],

        lineWidth:0.2

    },

    alternateRowStyles:{

        fillColor:[232,240,228]

    },

    styles:{

        overflow:"linebreak",

        valign:"middle"

    },

    columnStyles:{

        0:{cellWidth:22},

        1:{cellWidth:40},

        2:{cellWidth:24},

        3:{cellWidth:104}

    }

});



    styles:{

        lineColor:[220,220,220],

        lineWidth:0.2,

        cellPadding:3,

        fontSize:9,

        valign:"middle"

    },

    columnStyles:{

        0:{cellWidth:22},

        1:{cellWidth:40},

        2:{cellWidth:24},

        3:{cellWidth:104}

    }

});

// ============================================
// POSIÇÃO FINAL DA TABELA
// ============================================

const finalY = doc.lastAutoTable.finalY;

// ============================================
// TOTAL DE REGISTROS
// ============================================

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(...COR_TEXTO);

doc.text(
    "Total de registros: " + registros.length,
    15,
    finalY + 10
);

// ============================================
// DATA E HORA DE EMISSÃO
// ============================================

const agora = new Date();

const dataHora =
    agora.toLocaleDateString("pt-BR") +
    " às " +
    agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

// ============================================
// RODAPÉ DE TODAS AS PÁGINAS
// ============================================

const paginas = doc.internal.getNumberOfPages();

for (let i = 1; i <= paginas; i++) {

    doc.setPage(i);

    // Linha verde
    doc.setDrawColor(...COR_PRINCIPAL);
    doc.setLineWidth(0.5);

    doc.line(
        15,
        285,
        195,
        285
    );

    // Texto esquerdo
    doc.setFontSize(8);
    doc.setTextColor(...COR_CINZA);

    doc.text(
        "ibis Styles • LogBook",
        15,
        290
    );

    // Data de emissão
    doc.text(
        "Emitido em " + dataHora,
        70,
        290
    );

    // Página
    doc.text(
        "Página " + i + " de " + paginas,
        165,
        290
    );

}

// ============================================
// NOME DO ARQUIVO
// ============================================

const nomeArquivo =
    "LogBook_" +
    data.replace(/\//g, "-") +
    ".pdf";

// ============================================
// EXPORTAR
// ============================================

doc.save(nomeArquivo);

}
