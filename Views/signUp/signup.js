function calculateAge() {
    const dob = document.getElementById('dateOfBirth').value;
    if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        console.log(monthDiff)
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        document.getElementById('age').value = age;
    }
}
async function addData(event) {
    event.preventDefault();
    const obj = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        gender : document.getElementById('gender').value,
        dateOfBirth : document.getElementById('dateOfBirth').value,
        age : document.getElementById('age').value,
        address : document.getElementById('address').value,
        contactNumber : document.getElementById('contactNumber').value,
        email : document.getElementById('email').value,
    }
    try {
        const response = await axios.post('http://localhost:7000/user/signup',obj)
        alert('signup success');
        window.location.href = '../login/login.html';
    } catch(err) {
        console.log(err);
    }
}