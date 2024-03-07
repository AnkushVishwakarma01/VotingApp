import { useEffect, useState } from "react";
import NavBar from "./navbar";

async function checkSession({ token, setMsg, setMsgVisible, setPage, setContentVisible, setLogoutVisible }) {
    if (token) {
        const request = await fetch('/voting_app_backend/searchUserByToken/' + token);
        const response = await request.json();

        const requestCandidate0 = await fetch('/voting_app_backend/fetchCandidate0');
        const responseCandidate0 = await requestCandidate0.json();

        if (responseCandidate0.data.is_voting_end) {
            const request = await fetch('/voting_app_backend/fetchAllCandidates');
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

            setMsg(`Voting Is Closed And The Winner Is ${winner.name} With The Vote Count Of ${winner.votes}`);
            setContentVisible(false);
            setLogoutVisible(true);
        } else {
            if (response.data.is_voted) {
                setMsg("Your are already voted..");
                setContentVisible(false);
                setLogoutVisible(true);
            } else {
                setMsgVisible(false);
                setContentVisible(true);
                setLogoutVisible(true);
            }
        }
    } else {
        setPage("login");
    }
}

function MsgBlock({ message, expression }) {
    return (
        <div style={{
            textAlign: "center",
            display: expression ? "block" : "none"
        }} id="message">
            <h3>{message !== "" ? message : "Loading..."}</h3>
        </div>
    )
}

export default function HomePage({ cb, callback1, callback2, callback3 }) {
    const [message, setMessage] = useState("");
    const [isMessageVisible, setMessageVisible] = useState(true);
    const [isContentVisible, setContentVisible] = useState(false);
    const [isLogoutBtnVisible, setLogoutVisible] = useState(false);
    const token = localStorage.getItem('votingApp');

    //handling submit event.
    const votinghandler = async (e) => {
        e.preventDefault();

        const candidate = e.target.candidate.value
        const token = localStorage.getItem("votingApp");
        console.log(candidate, token);

        const request = await fetch("/voting_app_backend/updateUserAndCandidate", {
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
        console.log(response);
        if (response.statusCode === 200) {
            setContentVisible(false);
            setLogoutVisible(true);
        }
    };

    function logout() {
        localStorage.removeItem("votingApp");
        cb("login");
    }

    useEffect(() => {
        checkSession({
            token: token,
            setMsg: setMessage,
            setMsgVisible: setMessageVisible,
            setPage: cb,
            setContentVisible: setContentVisible,
            setLogoutVisible: setLogoutVisible
        });
    }, [])

    return (
        <div className="container">
            <NavBar callback1={callback1} callback2={callback2} callback3={callback3} />
            <form action="" onSubmit={votinghandler}>
                <MsgBlock message={message} expression={isMessageVisible} />
                <ul style={{
                    display: isContentVisible ? "block" : "none"
                }} >
                    <li><input type="radio" name="candidate" value="Candidate 1" /><label htmlFor="candidate">candidate 1</label></li>
                    <li><input type="radio" name="candidate" value="Candidate 2" /><label htmlFor="candidate">candidate 2</label></li>
                    <li><input type="radio" name="candidate" value="Candidate 3" /><label htmlFor="candidate">candidate 3</label></li>
                    <li><input type="radio" name="candidate" value="Candidate 4" /><label htmlFor="candidate">candidate 4</label></li>
                    <input className='margin-10 btn' type="submit" value="Vote" id="votebtn" />
                </ul>
            </form>
            <button style={{
                padding: "10px 22px",
                backgroundColor: "lightgray",
                border: "none",
                margin: "10px",
                display: isLogoutBtnVisible ? "block" : "none"
            }} id="logoutbtn" onClick={logout}>Logout</button>
        </div>
    )
}