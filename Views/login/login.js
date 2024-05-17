async function addData(event) {
    event.preventDefault()
    try {
        const obj = {
            email: document.getElementById('userName').value,
            password: document.getElementById('password').value
        }
        const response = await axios.post('http://localhost:7000/user/login', obj)
        localStorage.setItem('token', response.data.token);
        alert(response.data.message)
        window.location.href = '../home/home.html';
    } catch (err) {
        const displayErr = document.getElementById('displayErr');
        displayErr.innerHTML = `<div style="color : red;"> Message : ${err.response.data.message}</div>`
    }
}