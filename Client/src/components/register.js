import '../index.css';
import { useState } from 'react';

export default function RegisterPage(props) {
    const [isMessageVisible, setMessageVisible] = useState(false);

    const registerHandler = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
        const email = e.target.email.value;
        const phone_no = e.target.phone_no.value;

        const request = await fetch('/voting_app_backend/register', {
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

        if (response.statusCode === 200) {
            props.setPage("login")
        } else if (response.statusCode === 403) {
            setMessageVisible(true);
        }
    }

    function gotologin() {
        props.setPage("login");
    }

    function hideMsg() {
        if (isMessageVisible) setMessageVisible(false);
    }

    return (
        <>
            <form action="" onSubmit={registerHandler}>
                <div style={{
                    textAlign: "center",
                    display: isMessageVisible ? "block" : "none"
                }} id="message">
                    <h3 style={{ color: "red" }}>User is already exist!</h3>
                </div>
                <div className='input_field' style={{ marginBottom: isMessageVisible ? "-10px" : "50px" }}>
                    <input className='margin-10 padding-10' type="text" name="username" id="username" placeholder='USERNAME' /><br />
                    <input className='margin-10 padding-10' type="password" name="password" id="password" placeholder='PASSWORD' /><br />
                    <input className='margin-10 padding-10' type="email" name="email" id="email" placeholder='EMAIL ID' onChange={hideMsg} /><br />
                    <input className='margin-10 padding-10' type="text" name='phone_no' id='phone_no' minLength={10} placeholder='PHONE NO' />
                </div>
                <div className='btn_field'>
                    <input className='margin-10 btn' type="submit" value="Register" />
                    <input className='margin-10 btn' type="button" value="Login" onClick={gotologin} />
                </div>
            </form>
        </>
    );
} 