import { readAppointments } from "./crud-appointment.js";
import { deleteAppointmentElement } from "./delete-appointment.js";
import { formatDateToYYYY_MM_DD } from "./utilities.js";

const morningList = document.getElementById('morning-list');
const afternoonList = document.getElementById('afternoon-list');
const nightList = document.getElementById('night-list');
const dateFilter = document.getElementById('date-filter');

async function createAppointmentsElements({date}) {
    try {
        cleanLists()
        
        const appointments = await readAppointments({})

        for (const appointment of appointments) {
            const whenDate = new Date(appointment.when)
            if(date && date !== formatDateToYYYY_MM_DD(whenDate)) return
           
            const hours = whenDate.getHours()
            const newAppointmentElement = createAppointmentElement({...appointment, when: whenDate})
            
            if(hours <= 12) morningList.append(newAppointmentElement)
            else if(hours <= 18) afternoonList.append(newAppointmentElement)
            else nightList.append(newAppointmentElement)
        }
        
        checkEmptyLists()
        
    } catch (error){
        alert('Erro ao recuperar os seus agendamentos! Tente novamente mais tarde.')
    }
}

function createAppointmentElement({id, name, petName, phone, description, when}) {
    // Create a new <li> element for the appointment
    const li = document.createElement('li')
    
    // Create the time <span> element
    const spanTime = document.createElement('span')
    spanTime.textContent = `${when.getHours()}:${when.getMinutes()}`
    
    // Create the names <span> element
    const spanNames = document.createElement('span')
    spanNames.innerHTML = `<span>${petName}</span><span> / ${name}</span>`
    
    // Create the description <span> element
    const spanDescription = document.createElement('span')
    spanDescription.textContent = description
    
    // Create the remove <span> element
    const btnRemove = document.createElement('span')
    btnRemove.textContent = 'Remover agendamento'
    btnRemove.addEventListener('click', () => deleteAppointmentElement({id}, li))
    
    // Append all the elements to the <li> element
    li.append(spanTime, spanNames, spanDescription, btnRemove)
    
    // Return the created HTML element
    return li
}

function checkEmptyLists() {
    if(!morningList.innerHTML) morningList.innerHTML = 'Não há agendamentos para o dia de hoje.'
    if(!afternoonList.innerHTML) afternoonList.innerHTML = 'Não há agendamentos para o dia de hoje.'
    if(!nightList.innerHTML) nightList.innerHTML = 'Não há agendamentos para o dia de hoje.'
}

function cleanLists() {
    morningList.innerHTML = ''
    afternoonList.innerHTML = ''
    nightList.innerHTML = ''
}

createAppointmentsElements({})

dateFilter.addEventListener('input', () => {
    createAppointmentsElements({date: dateFilter.value})
})