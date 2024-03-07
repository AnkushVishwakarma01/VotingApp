const token = localStorage.getItem("votingApp");
const URI = "http://localhost:3001/voting_app_backend";
const candidateVoting = document.getElementById('candidateVoting');
const votebtn = document.getElementById('votebtn');
const messagebox = document.getElementById('message');
const candidatesList = document.getElementById('candidates');
const logoutbtn = document.getElementById('logoutbtn');

async function checkSession() {
    if (token) {
        const request = await fetch(URI + '/searchUserByToken/' + token);
        const response = await request.json();

        const requestCandidate0 = await fetch(URI + '/fetchCandidate0');
        const responseCandidate0 = await requestCandidate0.json();

        //if admin logging
        if (response.data.username == "admin") {
            location.href = './admin'
        }

        //if voting is closed.
        if (responseCandidate0.data.is_voting_end) {
            const request = await fetch(URI + '/fetchAllCandidates');
            const response = await request.json();

            const winner = {
                name: "",
                votes: 0
            }

            response.data.forEach((candidate) => {
                if (candidate.votes > winner.votes) {
                    winner.name = candidate.name;
                    winner.votes = candidate.votes;
                }
            });

            candidateVoting.innerHTML = `<div class="msg_block">
                    <h3>Voting Is Closed And The Winner Is ${winner.name} With The Vote Count Of ${winner.votes}</h3>
                </div>`;
            logoutbtn.classList.remove('hide');
        } else { // if voting is open
            if (response.data.is_voted) {
                candidateVoting.innerHTML = `<div class="msg_block">
                    <h3>Your are already voted...</h3>
                </div>`;
                logoutbtn.classList.remove('hide');
            } else {
                messagebox.classList.add('hide');
                candidatesList.classList.remove('hide');
                logoutbtn.classList.remove('hide');
            }
        }

    } else { //if token is not available.
        location.href = './'
    }
}
checkSession();

function expireSession() {
    setTimeout(() => {
        localStorage.removeItem("votingApp");
        location.reload();
    }, 30000);
}
// expireSession();


//handling submit event.
candidateVoting.addEventListener('submit', async (e) => {
    e.preventDefault();

    const candidate = e.target.candidate.value
    const token = localStorage.getItem("votingApp");

    const request = await fetch(URI + "/updateUserAndCandidate", {
        method: "PUT",
        headers: {
            "Accepts": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
            candidate: candidate
        })
    })

    const response = await request.json();
    if (response.statusCode == 200) {
        candidateVoting.innerHTML = "";
        candidateVoting.innerHTML = `<div class="msg_block">
                <h3>Okay...</h3>
            </div>`;
    }
})

function logout() {
    localStorage.removeItem("votingApp");
    location.reload();
}