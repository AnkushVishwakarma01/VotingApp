import '../index.css';
import { useState } from 'react';

export default function LoginPage(props) {
    const [isMessageVisible, setMessageVisible] = useState(false);

    const loginHandler = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const request = await fetch('/voting_app_backend/login', {
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

        if (response.statusCode === 401) {
            setMessageVisible(true);
        }

        if (response.statusCode === 200) {
            if (response.data.username === "admin") {
                localStorage.setItem("votingApp", response.data.token);
                props.setPage("admin");
            } else {
                localStorage.setItem("votingApp", response.data.token);
                props.setPage("home");
            }
        }
    }

    function gotoregister() {
        props.setPage("register");
    }

    function hideMsg() {
        if (isMessageVisible) setMessageVisible(false);
    }

    return (
        <>
            <form action="" onSubmit={loginHandler}>
                <div style={{
                    textAlign: "center",
                    display: isMessageVisible ? "block" : "none"
                }} id="message">
                    <h3 style={{ color: "red" }}>Password or Email was Incorrect.</h3>
                </div>
                <div className='input_field'>
                    <input className='margin-10 padding-10' type="emial" name="email" id="email"
                        placeholder='EMAIL' onChange={hideMsg} required /><br />
                    <input className='margin-10 padding-10' type="password" name="password" id="password"
                        placeholder='PASSWORD' minLength="5" maxLength="10" onChange={hideMsg} required />
                </div>
                <div className='btn_field'>
                    <input className='margin-10 btn' type="submit" value="Login" />
                    <button className='margin-10 btn' onClick={gotoregister}>Register</button>
                </div>
            </form>
        </>
    );
} 