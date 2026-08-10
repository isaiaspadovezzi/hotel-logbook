// =====================================================
// CONFIGURAÇÕES DO LOGBOOK
// =====================================================

const CONFIG = {

    atividades: {

        "Check-in": {
            campos: ["pagamento"]
        },

        "Check-out": {
            campos: ["pagamento"]
        },

        "Walk-in": {
            campos: ["pagamento"]
        },

        "Pagamento": {
            campos: ["pagamento", "valor"]
        },

        "Estorno": {
            campos: ["pagamento", "valor"]
        },

        "Cancelamento": {
            campos: ["reserva"]
        },

        "No Show": {
            campos: ["reserva"]
        },

        "Despertar": {
            campos: ["despertar"]
        },

        "Depósito": {
            campos: ["valor"]
        },

        "Mudança de Quarto": {
            campos: []
        },

        "Manutenção": {
            campos: []
        },

        "Lost & Found": {
            campos: []
        },

        "Reclamação": {
            campos: []
        },

        "Elogio": {
            campos: []
        },

        "Outro": {
            campos: []
        }

    }

};
