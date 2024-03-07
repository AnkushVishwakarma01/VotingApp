const URI = "http://localhost:3001/voting_app_backend";
const messagebox = document.getElementById('message');

registerHandler.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const phone_no = e.target.phone_no.value;
    console.log(username, password, email, phone_no);

    const request = await fetch(URI + '/register', {
        method: 'POST',
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            phone_no: phone_no
        })
    })
    const response = await request.json();
    console.log(response);

    if (response.statusCode == 200) {
        location.href = "./";
    }

    if (response.statusCode == 403) {
        messagebox.classList.remove('hide');
        document.querySelector('.input_field').style.marginBottom = -10+"px";
    }
});