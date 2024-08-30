const baseUrl = 'http://localhost:5000'

async function createAppointment({name, petName, phone, description, when }) {
  let response = await fetch(`${baseUrl}/appointments`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, petName, phone, description, when})
  })  
  response = await response.json()
  return response
}

async function readAppointments({ id }) {
  let response = await fetch(`${baseUrl}/appointments`)  
  response = await response.json()
  return response
}

async function deleteAppointment({ id }) {
  let response = await fetch(`${baseUrl}/appointments/${id}`, {
    method: 'DELETE'
  })  
  response = await response.json()
  return response
}

export {createAppointment, readAppointments, deleteAppointment}