import './index.css';
import AdminPage from './components/admin';
import HomePage from './components/index';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import { useEffect, useState } from 'react';

async function checkSession(token, setPage){
  if(token){
    const request = await fetch('/voting_app_backend/searchUserByToken/'+token);
    const response = await request.json();

    
    if(response.statusCode === 200){
      if(response.data.username === "admin"){
        setPage("admin");
      }else{
        setPage("home");
      }
    }
  }else{
    setPage("login");
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
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

  useEffect(() => {
    checkSession(token, setCurrentPage);
  }, [token]);

  return (
    <>
      {currentPage === "home" ? <HomePage cb={setCurrentPage} callback1={setHomePage} callback2={setRegisterPage} callback3={setLoginPage} />: 
      currentPage === "admin" ? <AdminPage cb={setCurrentPage} callback1={setHomePage} callback2={setRegisterPage} callback3={setLoginPage} />: 
      currentPage === "login" ? <LoginPage cb={setCurrentPage} callback1={setHomePage} callback2={setRegisterPage} callback3={setLoginPage} />:
      currentPage === "register" ? <RegisterPage cb={setCurrentPage} callback1={setHomePage} callback2={setRegisterPage} callback3={setLoginPage} />: null}
    </>
  );
}

export default App;
