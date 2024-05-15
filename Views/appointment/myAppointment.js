document.addEventListener('DOMContentLoaded', () => {
    displayAppointments(); // Call displayAppointments when DOM content is fully loaded
});
async function displayAppointments() {
try {
const token = localStorage.getItem('token');
const userId = parseJwt(token).userId;

const response = await axios.post('http://localhost:7000/appointment/getAppointments', { userId });
const appointments = response.data.appointments;

const appointmentsContainer = document.getElementById('appointmentsContainer');
let count = 1;
appointments.forEach(appointment => {
    const { appointmentDate, appointmentTime, doctorName, purpose } = appointment;

    // Extract only the date part until 'T'
    const formattedDate = appointmentDate.split('T')[0];

    // Create elements to display appointment details
    const appointmentElement = document.createElement('div');
    appointmentElement.classList.add('appointment');

    const appointmentInfo = `
        <h3> SI NO ${count++} </h3>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
        <p><strong>Doctor:</strong> ${doctorName}</p>
        <p><strong>Purpose:</strong> ${purpose}</p><br>
    `;

    appointmentElement.innerHTML = appointmentInfo;
    appointmentsContainer.appendChild(appointmentElement);
});
} catch (error) {
console.error('Error fetching appointments:', error);
}
}



function parseJwt(token) {
var base64Url = token.split('.')[1];
var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

return JSON.parse(jsonPayload);
}