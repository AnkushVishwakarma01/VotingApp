const URI = "http://localhost:3001/voting_app_backend";
const token = localStorage.getItem("votingApp");
const candidateDetailBlock = document.getElementById('candidateDetailBlock');
const enableBtn = document.getElementById('enableBtn');
const disableBtn = document.getElementById('disableBtn');

async function checkSession() {
    if (token) {
        const request = await fetch(URI + '/searchUserByToken/' + token);
        const response = await request.json();

        const requestCandidate0 = await fetch(URI+'/fetchCandidate0');
        const responseCandidate0 = await requestCandidate0.json();

        if(responseCandidate0.data.is_voting_end){
            disableBtn.setAttribute("disabled", "true");
        }else{
            enableBtn.setAttribute("disabled", "true");
        }

        if (response.statusCode == 404) {
            location.href = './';
        }
        await loadData();
    } else {
        location.href = './'
    }
}
checkSession();

async function loadData() {
    const request = await fetch(URI + '/fetchAllCandidates');
    const response = await request.json();
    console.log(response);

    response.data.forEach((candidate) => {
        candidateDetailBlock.innerHTML += `<li class="candidate_list">${candidate.name}: ${candidate.votes}</li>`;
    })
}

async function openVoting(){
    const request = await fetch(URI+'/toggleVoting', {
        method: "PUT",
        headers: {
            "Accepts": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            expression: false
        })
    });
    const response = await request.json();

    if(response.statusCode == 200){
        enableBtn.setAttribute("disabled", "true");
        disableBtn.removeAttribute("disabled");
    }
}

async function closeVoting(){
    const request = await fetch(URI+'/toggleVoting', {
        method: "PUT",
        headers: {
            "Accepts": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            expression: true
        })
    });
    const response = await request.json();

    if(response.statusCode == 200){
        disableBtn.setAttribute("disabled", "true");
        enableBtn.removeAttribute("disabled");
    }
}

function expireSession() {
    setTimeout(() => {
        localStorage.removeItem("votingApp");
        location.reload();
    }, 30000);
}
// expireSession();

function logout() {
    localStorage.removeItem("votingApp");
    location.reload();
}