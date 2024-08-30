import { deleteAppointment } from "./crud-appointment.js";

function deleteAppointmentElement({id}, li) {
    deleteAppointment({id}).then(() => {
        li.remove()
        alert('Agendamento removido com sucesso!')
    }).catch(() => alert('Não foi possível remover o agendamento! Tente novamente mais tarde.'))
}

export {deleteAppointmentElement}