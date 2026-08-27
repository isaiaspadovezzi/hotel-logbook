/* =====================================================
   QUARTOS DO HOTEL
   Número + configuração
   ===================================================== */

const QUARTOS_HOTEL = [

    { numero: "151", tipo: "TWC" },
    { numero: "152", tipo: "DSC" },
    { numero: "153", tipo: "DBC" },
    { numero: "154", tipo: "TWC" },
    { numero: "155", tipo: "TWC-A" },
    { numero: "156", tipo: "DBC-A" },
    { numero: "157", tipo: "DBC-A" },
    { numero: "158", tipo: "DBC-A" },
    { numero: "159", tipo: "DBC-A" },
    { numero: "161", tipo: "DBC-A" },

    { numero: "251", tipo: "TWC" },
    { numero: "252", tipo: "DSC" },
    { numero: "253", tipo: "DBC" },
    { numero: "254", tipo: "TWC" },
    { numero: "255", tipo: "TWC-A" },
    { numero: "256", tipo: "DBC" },
    { numero: "257", tipo: "DBC" },
    { numero: "258", tipo: "DBC" },
    { numero: "259", tipo: "DBC-A" },
    { numero: "261", tipo: "DBC" },

    { numero: "351", tipo: "TWC" },
    { numero: "352", tipo: "DSC" },
    { numero: "353", tipo: "DBC" },
    { numero: "354", tipo: "TWC" },
    { numero: "355", tipo: "TWC" },
    { numero: "356", tipo: "DBC" },
    { numero: "357", tipo: "DBC" },
    { numero: "358", tipo: "DBC" },
    { numero: "359", tipo: "DBC" },
    { numero: "361", tipo: "DBC" },

    { numero: "451", tipo: "TWC" },
    { numero: "452", tipo: "DSC" },
    { numero: "453", tipo: "DBC" },
    { numero: "454", tipo: "TWC" },
    { numero: "455", tipo: "TWC" },
    { numero: "456", tipo: "DBC" },
    { numero: "457", tipo: "DBC" },
    { numero: "458", tipo: "DBC" },
    { numero: "459", tipo: "DBC" },
    { numero: "461", tipo: "DBC" },

    { numero: "551", tipo: "DBC" },
    { numero: "552", tipo: "DSC" },
    { numero: "553", tipo: "S2C" },
    { numero: "554", tipo: "TWC" },
    { numero: "555", tipo: "TWC" },
    { numero: "556", tipo: "DBC" },
    { numero: "557", tipo: "DBC" },
    { numero: "558", tipo: "DBC" },
    { numero: "559", tipo: "DBC" },
    { numero: "561", tipo: "DBC" },

    { numero: "651", tipo: "DBC" },
    { numero: "652", tipo: "DSC" },
    { numero: "653", tipo: "S2C" },
    { numero: "654", tipo: "TWC" },
    { numero: "655", tipo: "TWC" },
    { numero: "656", tipo: "DBC" },
    { numero: "657", tipo: "DBC" },
    { numero: "658", tipo: "DBC" },
    { numero: "659", tipo: "DBC" },
    { numero: "661", tipo: "DBC" },

    { numero: "751", tipo: "DBC" },
    { numero: "752", tipo: "DSC" },
    { numero: "753", tipo: "S2C" },
    { numero: "754", tipo: "TWC" },
    { numero: "755", tipo: "TWC" },
    { numero: "756", tipo: "DBC" },
    { numero: "757", tipo: "DBC" },
    { numero: "758", tipo: "DBC" },
    { numero: "759", tipo: "DBC" },
    { numero: "761", tipo: "DBC" },

    { numero: "851", tipo: "DBB" },
    { numero: "852", tipo: "DBB" },
    { numero: "853", tipo: "DBB" },
    { numero: "854", tipo: "TWB" },
    { numero: "855", tipo: "TWB" },
    { numero: "856", tipo: "DBB" },
    { numero: "857", tipo: "DBB" },
    { numero: "858", tipo: "DBB" },
    { numero: "859", tipo: "DBB" },
    { numero: "861", tipo: "DBB" }

];


/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

function iniciarPesquisaQuartos() {

    const campoQuarto =
        document.getElementById("quarto");

    const listaSugestoes =
        document.getElementById(
            "listaSugestoesQuartos"
        );


    if (
        !campoQuarto ||
        !listaSugestoes
    ) {

        console.warn(
            "Campo de quarto não encontrado."
        );

        return;

    }


    /* =================================================
       MOSTRAR SUGESTÕES
       ================================================= */

    function mostrarSugestoes() {

        const busca =
            campoQuarto.value
                .trim()
                .toLowerCase();


        listaSugestoes.innerHTML = "";


        if (busca === "") {

            listaSugestoes.style.display =
                "none";

            return;

        }


        const resultados =
            QUARTOS_HOTEL.filter(
                function(quarto) {

                    return quarto.numero
                        .toLowerCase()
                        .startsWith(busca);

                }
            );


        if (
            resultados.length === 0
        ) {

            listaSugestoes.innerHTML = `

                <div
                    class="sugestao-quarto-vazio">

                    Nenhum quarto encontrado.

                </div>

            `;

            listaSugestoes.style.display =
                "block";

            return;

        }


        resultados.forEach(
            function(quarto) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "sugestao-quarto";


                item.innerHTML = `

                    <span
                        class="sugestao-quarto-numero">

                        ${quarto.numero}

                    </span>

                    <span
                        class="sugestao-quarto-tipo">

                        ${quarto.tipo}

                    </span>

                `;


                item.addEventListener(
                    "mousedown",
                    function(evento) {

                        evento.preventDefault();

                        campoQuarto.value =
                            quarto.numero;

                        campoQuarto.dataset.tipo =
                            quarto.tipo;

                        listaSugestoes.innerHTML =
                            "";

                        listaSugestoes.style.display =
                            "none";

                    }
                );


                listaSugestoes.appendChild(
                    item
                );

            }
        );


        listaSugestoes.style.display =
            "block";

    }


    /* =================================================
       DIGITAÇÃO
       ================================================= */

    campoQuarto.addEventListener(
        "input",
        function() {

            /*
             * Se o usuário alterar o número
             * manualmente, apagamos o tipo anterior.
             */

            delete campoQuarto.dataset.tipo;

            mostrarSugestoes();

        }
    );


    /* =================================================
       FOCO
       ================================================= */

    campoQuarto.addEventListener(
        "focus",
        function() {

            if (
                campoQuarto.value.trim() !== ""
            ) {

                mostrarSugestoes();

            }

        }
    );


    /* =================================================
       PERDEU O FOCO
       ================================================= */

    campoQuarto.addEventListener(
        "blur",
        function() {

            setTimeout(
                function() {

                    listaSugestoes.style.display =
                        "none";

                },
                200
            );

        }
    );

}


/* =====================================================
   INICIA O SISTEMA
   ===================================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarPesquisaQuartos
    );

} else {

    iniciarPesquisaQuartos();

}
