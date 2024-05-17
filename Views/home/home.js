document.addEventListener('DOMContentLoaded', () => {
    displayNoOfBooking()
    displayNextBookingDate()
});


async function displayNoOfBooking() {
    try {
        const token = localStorage.getItem('token');
        const userId = parseJwt(token).userId;
        const response = await axios.post('http://localhost:7000/user/getUser', { userId });

        const noOfBookingsDiv = document.getElementById('noOfBookings');
        const p = document.createElement('p');
        p.innerHTML = `No of Bookings : ${response.data.user.noOfBookings}`;

        noOfBookingsDiv.appendChild(p);
    } catch (err) {
        console.log(err);
    }
}


async function displayNextBookingDate() {
    try {
        const token = localStorage.getItem('token');
        const userId = parseJwt(token).userId;

        const response = await axios.post('http://localhost:7000/appointment/getAppointments', { userId });
        const appointments = response.data.appointments;

        const now = new Date();

        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        console.log(now, 'today', today)
        const upcomingAppointments = appointments
            .map(appointment => {
                const appointmentDate = new Date(appointment.appointmentDate.split('T')[0]);
                console.log("Parsed appointment date:", appointmentDate);
                return {
                    ...appointment,
                    appointmentDate: appointmentDate
                };
            })
            .filter(appointment => {
                console.log("Filtering appointment date:", appointment.appointmentDate);
                return appointment.appointmentDate >= today;
            });

        console.log("Upcoming appointments:", upcomingAppointments);

        upcomingAppointments.sort((a, b) => a.appointmentDate - b.appointmentDate);

        const nextBookingDateDiv = document.getElementById('nextBookingDate');

        if (upcomingAppointments.length > 0) {
            const nextAppointment = upcomingAppointments[0];
            const nextAppointmentDate = nextAppointment.appointmentDate.toISOString().split('T')[0];
            console.log("Next appointment date:", nextAppointmentDate);

            const p = document.createElement('p');
            p.innerHTML = `Next Booking Date: ${nextAppointmentDate}`;

            nextBookingDateDiv.innerHTML = '';
            nextBookingDateDiv.appendChild(p);
        } else {
            nextBookingDateDiv.innerHTML = '<p>No upcoming appointments</p>';
        }
    } catch (err) {
        console.log(err);
    }
}





function logout() {
    localStorage.removeItem('token');
    window.location.href = '../login/login.html';
}


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}