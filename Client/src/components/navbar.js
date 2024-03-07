export default function NavBar({callback1, callback2, callback3}) {
    return (
        <nav>
            <ul>
                <li><button className="navbtn" onClick={callback1}>Home</button></li>
                <li><button className="navbtn" onClick={callback2}>Register</button></li>
                <li><button className="navbtn" onClick={callback3}>Login</button></li>
            </ul>
        </nav>
    )
}