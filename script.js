// =====================================
// LOGBOOK - IBIS STYLES
// script.js
// Versão 0.1
// =====================================

// Quando a página carregar
document.addEventListener("DOMContentLoaded", function () {

    console.log("LogBook iniciado.");

    // Preenche a data com o dia atual
    const data = document.querySelector('input[type="date"]');

    if (data) {

        const hoje = new Date();

        const ano = hoje.getFullYear();

        const mes = String(hoje.getMonth() + 1).padStart(2, "0");

        const dia = String(hoje.getDate()).padStart(2, "0");

        data.value = `${ano}-${mes}-${dia}`;
    }

});
