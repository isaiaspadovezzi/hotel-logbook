// =======================================
// PDF - LOGBOOK
// =======================================
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

            resolve(canvas.toDataURL("image/png"));

        };

        img.onerror = reject;

    });
}
async function exportarPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");
    const logo = await carregarLogo();
    // ============================
// Carregar Logo
// ============================

const logo = new Image();

logo.src = "img/logo.png";

await new Promise((resolve) => {
    logo.onload = resolve;
});

    // ============================
    // CORES
    // ============================

    const verde = [99, 193, 50];

    // ============================
    // CABEÇALHO
    // ============================

    // Fundo branco
doc.setFillColor(255, 255, 255);
doc.rect(0, 0, 210, 35, "F");

// Linha verde inferior
doc.setFillColor(99, 193, 50);
doc.rect(0, 30, 210, 3, "F");
    // Logo

doc.addImage(
    logo,
    "PNG",
    150,
    6,
    35,
    17
);

 doc.setTextColor(80,80,80);
    
    doc.setFont("helvetica","bold");
  doc.setFontSize(22);

doc.setTextColor(99,193,50);

doc.text("LOGBOOK",15,18);

doc.setFontSize(11);

doc.setTextColor(120);

doc.text("Registro de Ocorrências",15,26);
    // ============================
    // Dados
    // ============================

// ============================================
// Cartão de Informações
// ============================================

// Fundo verde claro
doc.setFillColor(236, 248, 230);

// Caixa
doc.roundedRect(
    15,
    40,
    180,
    30,
    3,
    3,
    "F"
);

// Título
doc.setFontSize(11);
doc.setTextColor(70,70,70);
doc.setFont("helvetica","bold");

doc.text(
    "Informações do Turno",
    20,
    48
);

// Linha
doc.setDrawColor(180);
doc.line(20,51,190,51);

// Conteúdo
doc.setFont("helvetica","normal");

doc.text(
    "📅 Data:",
    20,
    58
);

doc.text(
    document.getElementById("data").value,
    55,
    58
);

doc.text(
    "👤 Funcionário:",
    20,
    64
);

doc.text(
    document.getElementById("funcionario").value,
    55,
    64
);

doc.text(
    "🕒 Turno:",
    110,
    58
);

doc.text(
    document.getElementById("turno").value,
    140,
    58
);

    // ============================
    // Monta tabela
    // ============================

    let linhas = [];

    registros.forEach(function(r){

        linhas.push([

            r.hora,

            r.atividade,

            r.quarto,

            r.descricao

        ]);

    });

    // ============================
    // Tabela
    // ============================

    doc.autoTable({

        startY:80,

        head:[[
            "Hora",
            "Atividade",
            "Quarto",
            "Descrição"
        ]],

        body:linhas,

        theme:"grid",

        headStyles:{

            fillColor:verde,

            textColor:255,

            halign:"center"

        },

        alternateRowStyles:{

            fillColor:[245,250,245]

        },

        styles:{

            fontSize:10,

            cellPadding:3

        }

    });

    // ============================
    // Rodapé
    // ============================

    let pagina = doc.internal.getNumberOfPages();

    for(let i=1;i<=pagina;i++){

        doc.setPage(i);

        doc.setFontSize(9);

        doc.setTextColor(120);

        doc.text(

            "Gerado automaticamente pelo LogBook",

            15,

            290

        );

        doc.text(

            "Página "+i+" de "+pagina,

            170,

            290

        );

    }

    // ============================
    // Salvar
    // ============================

    doc.save(

        "LogBook_" +

        document.getElementById("data").value +

        ".pdf"

    );

}
