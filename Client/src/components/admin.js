import '../index.css';
import { useState, useEffect } from "react";
import NavBar from './navbar';

async function checkSession(setEnableBtn, setDisableBtn) {
    const requestCandidate0 = await fetch('/voting_app_backend/fetchCandidate0');
    const responseCandidate0 = await requestCandidate0.json();

    if (responseCandidate0.data.is_voting_end) {
        setDisableBtn(true); //disable disable-btn
    } else {
        setEnableBtn(true); // disable enable-btn
    }
}

async function loadData(setState) {
    const request = await fetch('/voting_app_backend/fetchAllCandidates');
    const response = await request.json();

    setState(response.data.map((item, index) => <li key={index}>{item.name}: {item.votes}</li>));
}

async function openVoting(setEnableBtn, setDisableBtn) {
    const request = await fetch('/voting_app_backend/toggleVoting', {
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

    if (response.statusCode === 200) {
        setEnableBtn(true);
        setDisableBtn(false);
    }
}

async function closeVoting(setEnableBtn, setDisableBtn) {
    const request = await fetch('/voting_app_backend/toggleVoting', {
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

    if (response.statusCode === 200) {
        setDisableBtn(true);
        setEnableBtn(false);
    }
}

function VotingToggleBtn({ text, cb, expression }) {
    return (
        <button className="margin-10 btn" onClick={cb} disabled={expression}>{text}</button>
    )
}

export default function AdminPage({ cb, callback1, callback2, callback3 }) {
    const [listOfCandidates, setListOfCandidates] = useState("");
    const [isEnableBtnActive, setEnableBtnActive] = useState(false);
    const [isDisableBtnActive, setDisableBtnActive] = useState(false);

    function callOpenVotingFunc(){
        openVoting(setEnableBtnActive, setDisableBtnActive);
    }

    function callCloseVotingFunc(){
        closeVoting(setEnableBtnActive, setDisableBtnActive);
    }

    function logout(){
        localStorage.removeItem("votingApp");
        cb("login");
    }

    useEffect(() => {
        checkSession(setEnableBtnActive, setDisableBtnActive);
        loadData(setListOfCandidates);
    }, []);

    return (
        <div className="container">
            <NavBar callback1={callback1} callback2={callback2} callback3={callback3} />
            <ul id="candidateDetailBlock">
                {listOfCandidates}
            </ul>
            <VotingToggleBtn text={"Enable"} cb={callOpenVotingFunc} expression={isEnableBtnActive} />
            <VotingToggleBtn text={"Disable"} cb={callCloseVotingFunc} expression={isDisableBtnActive} />
            <button className="margin-10 btn" onClick={logout}>Logout</button>
        </div>
    )
}