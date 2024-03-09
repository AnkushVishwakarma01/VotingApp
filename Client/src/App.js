import './index.css';
import AdminPage from './components/admin';
import HomePage from './components/index';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import NavBar from './components/navbar';
import { useEffect, useState } from 'react';

async function checkSession(token, setPage) {
  if (token) {
    const request = await fetch('/voting_app_backend/searchUserByToken/' + token);
    const response = await request.json();


    if (response.statusCode === 200) {
      if (response.data.username === "admin") {
        setPage("admin");
      } else {
        setPage("home");
      }
    }
  } else {
    setPage("login");
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isLogoutBtnVisible, setLogoutVisible] = useState(false);
  const token = localStorage.getItem("votingApp");

  const setHomePage = function () {
    setCurrentPage("home");
  }

  const setLoginPage = function () {
    setCurrentPage("login");
  }

  const setRegisterPage = function () {
    setCurrentPage("register");
  }

  function logout() {
    localStorage.removeItem("votingApp");
    setCurrentPage("login");
  }

  useEffect(() => {
    checkSession(token, setCurrentPage);
  }, [token]);

  return (
    <div className="container">
      <NavBar callHome={setHomePage} callRegister={setRegisterPage} callLogin={setLoginPage} />
      {currentPage === "home" ? <HomePage setPage={setCurrentPage} setLogoutVisible={setLogoutVisible}/> :
        currentPage === "admin" ? <AdminPage setPage={setCurrentPage} /> :
          currentPage === "login" ? <LoginPage setPage={setCurrentPage} /> :
            currentPage === "register" ? <RegisterPage setPage={setCurrentPage} /> : null}
      {currentPage === "home" ? <button style={{
        padding: "10px 22px",
        backgroundColor: "lightgray",
        border: "none",
        margin: "10px",
        display: isLogoutBtnVisible ? "block" : "none"
      }} id="logoutbtn" onClick={logout}>Logout</button> :
        currentPage === "admin" ? <button className="margin-10 btn" onClick={logout}>Logout</button> : null}
    </div>
  );
}

export default App;
