export default function NavBar(props) {
    const {callHome, callRegister, callLogin} = props;
    return (
        <nav>
            <ul>
                <li><button className="navbtn" onClick={callHome}>Home</button></li>
                <li><button className="navbtn" onClick={callRegister}>Register</button></li>
                <li><button className="navbtn" onClick={callLogin}>Login</button></li>
            </ul>
        </nav>
    )
}