let registros = [];

let registroEditando = -1;

document.addEventListener("DOMContentLoaded", iniciarSistema);

function iniciarSistema() {

    preencherDataAtual();

    preencherHoraAtual();

    carregarLocalStorage();

    configurarEventos();

    atualizarTabela();

    atualizarContador();

    atualizarCampos();

}

function configurarEventos() {

    document
        .getElementById("atividade")
        .addEventListener("change", atualizarCampos);

    document
        .getElementById("btnSalvar")
        .addEventListener("click", salvarRegistro);

    document
        .getElementById("pesquisa")
        .addEventListener("input", pesquisarRegistros);

    document
        .getElementById("data")
        .addEventListener("change", mudarDataLogbook);

}

function mudarDataLogbook() {

    carregarLocalStorage();

    atualizarTabela();

    atualizarContador();

}

function preencherDataAtual() {

    const hoje = new Date();

    document.getElementById("data").value =
        hoje.toISOString().split("T")[0];

}

function preencherHoraAtual() {

    const agora = new Date();

    const hora =
        String(agora.getHours()).padStart(2, "0");

    const minuto =
        String(agora.getMinutes()).padStart(2, "0");

    document.getElementById("hora").value =
        hora + ":" + minuto;

}

function atualizarCampos() {

    garantirCampoQuartoDestino();

    esconderTodosCampos();

    const atividade =
        document.getElementById("atividade").value;

    const config =
        CONFIG.atividades[atividade];

    if (!config) return;

    config.campos.forEach(function(campo){

        switch(campo){

            case "pagamento":

                mostrar("grupoPagamento");

                break;

            case "valor":

                mostrar("grupoValor");

                break;

            case "reserva":

                mostrar("grupoReserva");

                break;

            case "despertar":

                mostrar("grupoDespertar");

                break;

        }

    });

    if (
        atividade === "Troca de Quarto" ||
        atividade === "Mudança de Quarto"
    ) {

        mostrar("grupoQuartoDestino");

    }

}

function garantirCampoQuartoDestino() {

    if (
        document.getElementById("grupoQuartoDestino")
    ) {
        return;
    }

    const campoQuarto =
        document.getElementById("quarto");

    if (!campoQuarto) {
        return;
    }

    const containerQuarto =
        campoQuarto.closest(".mb-3") ||
        campoQuarto.parentElement;

    if (!containerQuarto) {
        return;
    }

    const grupo =
        document.createElement("div");

    grupo.id =
        "grupoQuartoDestino";

    grupo.className =
        "mb-3";

    grupo.style.display =
        "none";
    grupo.style.width = "180px";
grupo.style.marginTop = "10px";

    grupo.innerHTML = `

        <label
            for="quartoDestino"
            class="form-label"
        >
            Novo quarto
        </label>

        <input
            type="text"
            class="form-control"
            id="quartoDestino"
            placeholder="Digite o novo quarto"
            autocomplete="off"
        >

    `;

    containerQuarto.after(grupo);

}

function esconderTodosCampos() {

    esconder("grupoPagamento");

    esconder("grupoValor");

    esconder("grupoReserva");

    esconder("grupoDespertar");

    esconder("grupoQuartoDestino");

}

function mostrar(id) {

    console.log("Mostrando:", id);

    const elemento =
        document.getElementById(id);

    if (!elemento) {

        console.error(
            "Elemento não encontrado:",
            id
        );

        return;

    }

    elemento.style.display = "block";

}

function esconder(id) {

    const elemento =
        document.getElementById(id);

    if (elemento) {

        elemento.style.display = "none";

    }

}

function salvarRegistro() {

    const registro = {

        hora:
            document.getElementById("hora").value,

        atividade:
            document.getElementById("atividade").value,

        quarto:
    document.getElementById("quarto").value,

tipoQuarto:
    document.getElementById("quarto").dataset.tipo || "",

        quartoDestino:
            document.getElementById("quartoDestino")?.value || "",

        pagamento:
            document.getElementById("pagamento").value,

        valor:
            document.getElementById("valor").value,

        reserva:
            document.getElementById("reserva").value,

        despertar:
            document.getElementById("horaDespertar").value,

        descricao:
            document.getElementById("descricao").value

    };

    if (registroEditando === -1) {

        registros.push(registro);

    } else {

        registros[registroEditando] =
            registro;

        registroEditando = -1;

    }

    salvarLocalStorage();

    atualizarTabela();

    atualizarContador();

    limparFormulario();

    const modal =
        bootstrap.Modal.getInstance(
            document.getElementById(
                "modalRegistro"
            )
        );

    if (modal) {

        modal.hide();

    }

}

function limparFormulario() {

    preencherHoraAtual();

    document.getElementById(
        "atividade"
    ).selectedIndex = 0;

    document.getElementById(
        "quarto"
    ).value = "";

    document.getElementById(
        "pagamento"
    ).selectedIndex = 0;

    document.getElementById(
        "valor"
    ).value = "";

    document.getElementById(
        "reserva"
    ).value = "";

    document.getElementById(
        "horaDespertar"
    ).value = "";

    document.getElementById(
        "descricao"
    ).value = "";

    const quartoDestino =
        document.getElementById(
            "quartoDestino"
        );

    if (quartoDestino) {

        quartoDestino.value = "";

    }

    atualizarCampos();

}

function iconeAtividade(atividade) {

    const nome =
        (atividade || "")
            .toLowerCase()
            .trim();

    if (nome === "check-in") {

        return `
            <i
                class="bi bi-person-check"
                title="Check-in">
            </i>
        `;

    }

    if (nome === "check-out") {

        return `
            <i
                class="bi bi-box-arrow-right"
                title="Check-out">
            </i>
        `;

    }

    if (nome === "manutenção") {

        return `
            <i
                class="bi bi-tools"
                title="Manutenção">
            </i>
        `;

    }

    if (nome === "reserva") {

        return `
            <i
                class="bi bi-calendar-check"
                title="Reserva">
            </i>
        `;

    }

    if (nome === "pagamento") {

        return `
            <i
                class="bi bi-credit-card"
                title="Pagamento">
            </i>
        `;

    }

    if (nome === "despertar") {

        return `
            <i
                class="bi bi-alarm"
                title="Despertar">
            </i>
        `;

    }

    return `
        <i
            class="bi bi-clipboard"
            title="${atividade}">
        </i>
    `;

}

function atualizarTabela(
    lista = registros
) {

    const tbody =
        document.getElementById(
            "listaRegistros"
        );

    tbody.innerHTML = "";

    if (lista.length === 0) {

        tbody.innerHTML = `

        <tr>

            <td
                colspan="5"
                class="text-center text-muted py-5"
            >

                Nenhum registro encontrado.

            </td>

        </tr>

        `;

        return;

    }

    lista.forEach(
        (registro, indice) => {
            const quartoInfo =
    Array.isArray(QUARTOS_HOTEL)
        ? QUARTOS_HOTEL.find(
            function(quarto) {
                return String(quarto.numero) ===
                    String(registro.quarto);
            }
        )
        : null;

const tipoQuarto =
    registro.tipoQuarto ||
    quartoInfo?.tipo ||
    "";

            let resumo = "";

            if (registro.pagamento)

                resumo +=
                    "💳 " +
                    registro.pagamento +
                    " ";

            if (registro.valor)

                resumo +=
                    "R$ " +
                    registro.valor +
                    " ";

            if (registro.reserva)

                resumo +=
                    "Reserva: " +
                    registro.reserva +
                    " ";

            if (registro.despertar)

                resumo +=
                    "Despertar: " +
                    registro.despertar +
                    " ";

            if (
                registro.quartoDestino &&
                (
                    registro.atividade ===
                        "Troca de Quarto" ||
                    registro.atividade ===
                        "Mudança de Quarto"
                )
            ) {

                resumo +=
                    "Novo quarto: " +
                    registro.quartoDestino +
                    " ";

            }

            if (resumo === "")

                resumo =
                    registro.descricao;

            tbody.innerHTML += `

        <tr>

            <td>
                ${registro.hora}
            </td>

            <td>

                ${iconeAtividade(
                    registro.atividade
                )}

                ${registro.atividade}

            </td>

         <td>

    ${
        registro.quarto
            ? `
                <div class="quarto-card">

                    <strong
                        class="quarto-card-numero">

                        ${registro.quarto}

                    </strong>

                    ${
                        tipoQuarto
                            ? `
                                <div
                                    class="quarto-card-tipo">

                                    ${tipoQuarto}

                                </div>
                            `
                            : ""
                    }

                </div>
            `
            : "-"
    }

</td>
                ${resumo}
            </td>

            <td>

                <button
                    class="btn btn-sm btn-outline-primary"
                    onclick="editarRegistro(${indice})"
                >

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-sm btn-outline-danger"
                    onclick="excluirRegistro(${indice})"
                >

                    <i class="bi bi-trash"></i>

                </button>

                <button
                    class="btn btn-sm btn-outline-success"
                    onclick="reportarRegistro(${indice})"
                    title="Gerar Report"
                >

                    <i class="bi bi-save"></i>

                </button>

            </td>

        </tr>

        `;

        }
    );

}

function editarRegistro(indice) {

    const registro =
        registros[indice];

    if (!registro) {
        return;
    }

    registroEditando =
        indice;

    document.getElementById(
        "hora"
    ).value =
        registro.hora || "";

    document.getElementById(
        "atividade"
    ).value =
        registro.atividade || "";

    document.getElementById(
        "quarto"
    ).value =
        registro.quarto || "";

    atualizarCampos();

    const quartoDestino =
        document.getElementById(
            "quartoDestino"
        );

    if (quartoDestino) {

        quartoDestino.value =
            registro.quartoDestino || "";

    }

    document.getElementById(
        "pagamento"
    ).value =
        registro.pagamento || "";

    document.getElementById(
        "valor"
    ).value =
        registro.valor || "";

    document.getElementById(
        "reserva"
    ).value =
        registro.reserva || "";

    document.getElementById(
        "horaDespertar"
    ).value =
        registro.despertar || "";

    document.getElementById(
        "descricao"
    ).value =
        registro.descricao || "";

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "modalRegistro"
            )
        );

    modal.show();

}

function excluirRegistro(indice) {

    if (
        !confirm(
            "Deseja excluir este registro?"
        )
    ) {
        return;
    }

    registros.splice(
        indice,
        1
    );

    salvarLocalStorage();

    atualizarTabela();

    atualizarContador();

}

function salvarLocalStorage() {

    const data =
        document.getElementById(
            "data"
        ).value;

    if (!data) {

        console.error(
            "Data do LogBook não encontrada."
        );

        return;

    }

    let arquivo =
        JSON.parse(
            localStorage.getItem(
                "logbookArquivo"
            )
        ) || {};

    arquivo[data] =
        registros;

    localStorage.setItem(
        "logbookArquivo",
        JSON.stringify(arquivo)
    );

}

function carregarLocalStorage() {

    const data =
        document.getElementById(
            "data"
        ).value;

    if (!data) {

        registros = [];

        return;

    }

    let arquivo =
        JSON.parse(
            localStorage.getItem(
                "logbookArquivo"
            )
        ) || {};

    const antigo =
        localStorage.getItem(
            "logbook"
        );

    if (
        antigo &&
        Object.keys(arquivo).length === 0
    ) {

        try {

            const registrosAntigos =
                JSON.parse(
                    antigo
                );

            if (
                Array.isArray(
                    registrosAntigos
                ) &&
                registrosAntigos.length > 0
            ) {

                arquivo[data] =
                    registrosAntigos;

                localStorage.setItem(
                    "logbookArquivo",
                    JSON.stringify(
                        arquivo
                    )
                );

                console.log(
                    "Registros antigos migrados para:",
                    data
                );

            }

        } catch (erro) {

            console.error(
                "Erro ao migrar registros antigos:",
                erro
            );

        }

    }

    registros =
        arquivo[data] || [];

    console.log(
        "LogBook carregado:",
        data,
        registros.length,
        "registros"
    );

}

function atualizarContador() {

    document.getElementById(
        "contadorRegistros"
    ).innerHTML =

        registros.length +

        (
            registros.length === 1

                ? " registro"

                : " registros"
        );

}

function pesquisarRegistros() {

    const texto =

        document
            .getElementById(
                "pesquisa"
            )
            .value
            .toLowerCase();

    if (texto === "") {

        atualizarTabela();

        return;

    }

    const filtrados =
        registros.filter(
            function(registro){

                return (

                    (
                        registro.hora ||
                        ""
                    )
                        .toLowerCase()
                        .includes(texto)

                    ||

                    (
                        registro.atividade ||
                        ""
                    )
                        .toLowerCase()
                        .includes(texto)

                    ||

                    String(
                        registro.quarto ||
                        ""
                    )
                        .includes(texto)

                    ||

                    (
                        registro.descricao ||
                        ""
                    )
                        .toLowerCase()
                        .includes(texto)

                    ||

                    (
                        registro.pagamento ||
                        ""
                    )
                        .toLowerCase()
                        .includes(texto)

                    ||

                    (
                        registro.reserva ||
                        ""
                    )
                        .toLowerCase()
                        .includes(texto)

                    ||

                    (
                        registro.quartoDestino ||
                        ""
                    )
                        .toLowerCase()
                        .includes(texto)

                );

            }
        );

    atualizarTabela(
        filtrados
    );

}

function gerarResumo(registro){

    switch(
        registro.atividade
    ){

        case "Check-in":

        case "Check-out":

        case "Walk-in":

        case "Pagamento":

            return registro.pagamento

                ? "💳 " +
                    registro.pagamento

                : registro.descricao;

        case "Estorno":

            return "💳 " +
                (
                    registro.pagamento ||
                    "-"
                ) +
                " | 💲 " +
                (
                    registro.valor ||
                    "-"
                );

        case "Cancelamento":

        case "No Show":

            return registro.reserva

                ? "Reserva: " +
                    registro.reserva

                : registro.descricao;

        case "Despertar":

            return registro.despertar

                ? "⏰ " +
                    registro.despertar

                : registro.descricao;

        case "Troca de Quarto":

        case "Mudança de Quarto":

            return registro.quartoDestino

                ? "Novo quarto: " +
                    registro.quartoDestino

                : registro.descricao;

        default:

            return registro.descricao;

    }

}

const modalRegistro =
    document.getElementById(
        "modalRegistro"
    );

if (modalRegistro) {

    modalRegistro.addEventListener(
        "shown.bs.modal",
        function(){

            if (
                registroEditando === -1
            ){

                limparFormulario();

            }

        }
    );

    modalRegistro.addEventListener(
        "hidden.bs.modal",
        function(){

            registroEditando = -1;

        }
    );

}

window.getRegistros =
    function(){

        return registros;

    };

console.log(
    "LogBook v2.0 carregado com sucesso."
);

function abrirArquivoLogbook() {

    const arquivo =
        JSON.parse(
            localStorage.getItem(
                "logbookArquivo"
            )
        ) || {};

    const datas =
        Object.keys(
            arquivo
        )
            .sort()
            .reverse();

    const lista =
        document.getElementById(
            "listaArquivoLogbook"
        );

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    if (datas.length === 0) {

        lista.innerHTML = `

            <div
                class="text-center text-muted py-4"
            >

                <i
                    class="bi bi-folder2"
                    style="font-size: 32px;"
                >
                </i>

                <p
                    class="mt-2 mb-0"
                >

                    Nenhum dia arquivado.

                </p>

            </div>

        `;

    }

    datas.forEach(
        function(data) {

            const quantidade =
                Array.isArray(
                    arquivo[data]
                )
                    ? arquivo[data].length
                    : 0;

            const partes =
                data.split("-");

            const dataFormatada =
                partes[2] +
                "/" +
                partes[1] +
                "/" +
                partes[0];

            lista.innerHTML += `

            <button
                type="button"
                class="list-group-item
                       list-group-item-action
                       d-flex
                       justify-content-between
                       align-items-center"
                onclick="abrirDiaArquivo('${data}')"
            >

                <div>

                    <i
                        class="bi bi-calendar3
                               text-success me-2"
                    >
                    </i>

                    <strong>
                        ${dataFormatada}
                    </strong>

                </div>

                <span
                    class="badge
                           bg-success
                           rounded-pill"
                >

                    ${quantidade}

                </span>

            </button>

            `;

        }
    );

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "modalArquivoLogbook"
            )
        );

    modal.show();

}

function abrirDiaArquivo(data) {

    const arquivo =
        JSON.parse(
            localStorage.getItem(
                "logbookArquivo"
            )
        ) || {};

    registros =
        arquivo[data] || [];

    document.getElementById(
        "data"
    ).value =
        data;

    atualizarTabela();

    atualizarContador();

    const pesquisa =
        document.getElementById(
            "pesquisa"
        );

    if (pesquisa) {

        pesquisa.value = "";

    }

    const elementoModal =
        document.getElementById(
            "modalArquivoLogbook"
        );

    const modal =
        bootstrap.Modal.getInstance(
            elementoModal
        );

    if (modal) {

        modal.hide();

    }

    console.log(
        "Dia do LogBook aberto:",
        data,
        registros.length,
        "registros"
    );

}
/* =====================================================
   PROCEDIMENTO PADRÃO
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const atividade =
            document.getElementById(
                "atividade"
            );

        const grupoProcedimento =
            document.getElementById(
                "grupoProcedimento"
            );

        const procedimentoPadrao =
            document.getElementById(
                "procedimentoPadrao"
            );

        const descricao =
            document.getElementById(
                "descricao"
            );


        /* ---------------------------------------------
           VERIFICA SE OS CAMPOS EXISTEM
           --------------------------------------------- */

        if (
            !atividade ||
            !grupoProcedimento ||
            !procedimentoPadrao ||
            !descricao
        ) {

            console.warn(
                "Campos de Procedimento padrão não encontrados."
            );

            return;

        }


        /* ---------------------------------------------
           MOSTRAR / ESCONDER PROCEDIMENTO
           --------------------------------------------- */

        function atualizarProcedimento() {

            if (
                atividade.value ===
                "Procedimentos"
            ) {

                grupoProcedimento.style.display =
                    "block";

            } else {

                grupoProcedimento.style.display =
                    "none";

                procedimentoPadrao.value =
                    "";

            }

        }


        /* ---------------------------------------------
           QUANDO A ATIVIDADE MUDA
           --------------------------------------------- */

        atividade.addEventListener(
            "change",
            atualizarProcedimento
        );


        /* ---------------------------------------------
           QUANDO O PROCEDIMENTO MUDA
           --------------------------------------------- */

        procedimentoPadrao.addEventListener(
            "change",
            function () {

                const valor =
                    procedimentoPadrao.value;


                /*
                 * "Outro" não deve aparecer
                 * na descrição.
                 *
                 * Deixamos a descrição livre.
                 */

                if (
                    valor === "Outro"
                ) {

                    descricao.value = "";

                    descricao.focus();

                    return;

                }


                /*
                 * Se o usuário voltar para
                 * "Selecione um procedimento...",
                 * limpa a descrição.
                 */

                if (
                    valor === ""
                ) {

                    descricao.value = "";

                    return;

                }


                /*
                 * Procedimento padrão:
                 * coloca automaticamente
                 * o texto na descrição.
                 */

                descricao.value =
                    valor;

            }
        );


        /* ---------------------------------------------
           ESTADO INICIAL
           --------------------------------------------- */

        atualizarProcedimento();

    }
);

