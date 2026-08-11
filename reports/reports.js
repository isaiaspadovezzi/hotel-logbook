// =====================================================
// LOGBOOK - REPORTS
// Sistema de notificações
// =====================================================

// =====================================================
// CONFIGURAÇÃO
// =====================================================

const REPORTS_CONFIG = {

    nomeSistema: "LogBook",

    nomeHotel: "ibis Styles",

    corPrincipal: "#63c132"

};


// =====================================================
// CRIAR CARD DE REPORT
// =====================================================

function criarCardReport(registro) {

    if (!registro) {

        console.error("Nenhum registro foi informado.");

        return null;

    }

    const funcionario =
        document.getElementById("funcionario")?.value || "";

    const turno =
        document.getElementById("turno")?.value || "";

    const data =
        document.getElementById("data")?.value || "";

    const dataFormatada =
        formatarDataReport(data);

    const hora =
        registro.hora || "";

    const atividade =
        registro.atividade || "Ocorrência";

    const quarto =
        registro.quarto || "Não informado";

    const descricao =
        registro.descricao || "Sem descrição";

    const card = document.createElement("div");

    card.className = "report-card";

    card.innerHTML = `

        <div class="report-header">

            <div class="report-header-title">

                ${REPORTS_CONFIG.nomeSistema}

            </div>

            <img
                src="../img/logo.png"
                class="report-logo"
                alt="ibis Styles">

        </div>

        <div class="report-body">

            <div class="report-type">

                ${atividade}

            </div>

            <div class="report-room-label">

                Quarto

            </div>

            <div class="report-room">

                ${quarto}

            </div>

            <div class="report-description">

                ${descricao}

            </div>

            <div class="report-info">

                <div class="report-info-item">

                    <span class="report-info-label">

                        Funcionário

                    </span>

                    ${funcionario}

                </div>

                <div class="report-info-item">

                    <span class="report-info-label">

                        Turno

                    </span>

                    ${turno}

                </div>

                <div class="report-info-item">

                    <span class="report-info-label">

                        Data

                    </span>

                    ${dataFormatada}

                </div>

                <div class="report-info-item">

                    <span class="report-info-label">

                        Hora

                    </span>

                    ${hora}

                </div>

            </div>

        </div>

        <div class="report-footer">

            <span>

                ${REPORTS_CONFIG.nomeHotel}

            </span>

            <span>

                Comunicação interna

            </span>

        </div>

    `;

    return card;

}


// =====================================================
// FORMATAR DATA
// =====================================================

function formatarDataReport(data) {

    if (!data) {

        return "";

    }

    const partes = data.split("-");

    if (partes.length !== 3) {

        return data;

    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// =====================================================
// TESTE
// =====================================================

console.log("Módulo Reports v1 carregado.");
