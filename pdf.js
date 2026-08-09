// =======================================
// PDF - LOGBOOK
// =======================================

async function exportarPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");
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

    doc.setFillColor(...verde);
    doc.rect(0, 0, 210, 28, "F");

    doc.setTextColor(255,255,255);

    doc.setFont("helvetica","bold");
    doc.setFontSize(20);

    doc.text("LOGBOOK",15,15);

    doc.setFontSize(10);

    doc.text("Registro de Ocorrências",15,22);

    // ============================
    // Dados
    // ============================

    doc.setTextColor(0,0,0);

    doc.setFontSize(11);

    doc.text(
        "Data: " + document.getElementById("data").value,
        15,
        40
    );

    doc.text(
        "Funcionário: " + document.getElementById("funcionario").value,
        15,
        47
    );

    doc.text(
        "Turno: " + document.getElementById("turno").value,
        15,
        54
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

        startY:65,

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
