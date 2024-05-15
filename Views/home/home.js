document.addEventListener('DOMContentLoaded', () => {
    displayNoOfBooking()
    displayNextBookingDate()
        });


        async function displayNoOfBooking() {
            try {
                const token = localStorage.getItem('token');
        const userId = parseJwt(token).userId;
        console.log(userId)
        const response = await axios.post('http://localhost:7000/user/getUser', { userId });
        
        const noOfBookingsDiv = document.getElementById('noOfBookings');
        const p = document.createElement('p');
        p.innerHTML =  `No of Bookings : ${response.data.user.noOfBookings}`;

        noOfBookingsDiv.appendChild(p);
            } catch(err) {
                console.log(err);
            }
        }


        async function displayNextBookingDate() {
            try {// this will display future booking date
                const token = localStorage.getItem('token');
                const userId = parseJwt(token).userId;

                const response = await axios.post('http://localhost:7000/appointment/getAppointments', { userId });
                const appointments = response.data.appointments;

                const upcomingAppointments = appointments
                    .map(appointment => ({
                        ...appointment,
                        appointmentDate: new Date(appointment.appointmentDate)
                    }))
                    .filter(appointment => appointment.appointmentDate > new Date());

                upcomingAppointments.sort((a, b) => a.appointmentDate - b.appointmentDate);

                const nextBookingDateDiv = document.getElementById('nextBookingDate');

                if (upcomingAppointments.length > 0) {
                    const nextAppointment = upcomingAppointments[0];
                    const nextAppointmentDate = nextAppointment.appointmentDate.toISOString().split('T')[0];
                    console.log(nextAppointmentDate)
                    const p = document.createElement('p');
                    p.innerHTML = `Next Booking Date: ${nextAppointmentDate}`;

                    nextBookingDateDiv.innerHTML = ''; // Clear any existing content
                    nextBookingDateDiv.appendChild(p);
                } else {
                    nextBookingDateDiv.innerHTML = '<p>No upcoming appointments</p>';
                }
            } catch (err) {
                console.log(err);
            }
        }


        function logout() {
            localStorage.removeItem('token'); // Use removeItem to remove the token
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