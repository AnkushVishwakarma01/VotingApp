const URI = "http://localhost:3001/voting_app_backend";
const loginHandler = document.getElementById('loginHandler');
const messageBox = document.getElementById('message');


loginHandler.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const request = await fetch(URI + '/login', {
        method: 'POST',
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const response = await request.json();
    console.log(response);

    if (response.statusCode == 200) {
        if(response.data.username == "admin"){
            localStorage.setItem("votingApp", response.data.token);
            location.href = "./admin"
        }else{
            localStorage.setItem("votingApp", response.data.token);
            location.href = "./home"
        }
    }else if(response.statusCode == 404){
        messageBox.classList.remove('hide');
    }else{
        location.href = "./"
    }
});