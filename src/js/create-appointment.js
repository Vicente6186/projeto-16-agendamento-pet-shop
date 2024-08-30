import { createAppointment } from "./crud-appointment.js";
import { formatDateToYYYY_MM_DD } from "./utilities.js";

const btnCreateAppointmentModal = document.getElementById('btn-create-appointment-modal');
const createAppointmentModal = document.getElementById('create-appointment-modal');
const formCreateAppointment = createAppointmentModal.querySelector('form')
const nameInput = document.getElementById('name');
const petNameInput = document.getElementById('pet-name');
const phoneInput = document.getElementById('phone');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');


let actualDate = new Date()
actualDate = formatDateToYYYY_MM_DD(actualDate)

dateInput.min = actualDate

nameInput.value = 'Vicente Chemin'
petNameInput.value = 'Miminha'
phoneInput.value = '(47) 99122-5924'
descriptionInput.value = 'Está passando mal'
dateInput.value = actualDate
timeInput.value = '13:00'

// Open modal
btnCreateAppointmentModal.addEventListener('click', () => {
    createAppointmentModal.removeAttribute('hidden')
})

// Close modal
createAppointmentModal.addEventListener('click', event => {
    if(event.target.id === 'create-appointment-modal') createAppointmentModal.setAttribute('hidden', true);
})

formCreateAppointment.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation()
    const name = nameInput.value;
    const petName = petNameInput.value;
    const phone = phoneInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const when = new Date(`${date}T${time}:00`)

    console.log(name, petName, phone, description, date, time, when);

    createAppointment({name, petName, phone, description, when}).then(() => {
       alert('Consulta marcada com sucesso!')
    }).catch(() => alert('Não foi possível marcar a consulta! Tente novamente mais tarde.'))
    
})
