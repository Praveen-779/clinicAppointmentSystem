async function bookAppointment(event) {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
            const userId = parseJwt(token).userId;
        const obj = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        gender: document.getElementById('gender').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        age: document.getElementById('age').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        appointmentTime: document.getElementById('appointmentTime').value,
        doctorName: document.getElementById('doctorName').value,
        purpose: document.getElementById('purpose').value,
        userId : userId
    }
    const response = await axios.post('http://localhost:7000/appointment/postAppointment',obj)
    alert(response.data.message);
    window.location.href = '../home/home.html';
    } catch(err) {
        console.log(err);
        alert(err.response.data.message)
    }
    

}



document.addEventListener('DOMContentLoaded', async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = parseJwt(token).userId;
            const response = await axios.post('http://localhost:7000/user/getUser', { userId });
            const userData = response.data.user;

            document.getElementById('firstName').value = userData.firstName;
            document.getElementById('lastName').value = userData.lastName;
            document.getElementById('gender').value = userData.gender;
            const dateOfBirth = new Date(userData.dateOfBirth);
            const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];
            document.getElementById('dateOfBirth').value = formattedDateOfBirth;

            document.getElementById('age').value = userData.age;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    });

function parseJwt(token) {
var base64Url = token.split('.')[1];
var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

return JSON.parse(jsonPayload);
}