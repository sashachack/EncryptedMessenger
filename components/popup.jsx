import Login from "../components/login";
import SignUp from "../components/sign_up";

export default function Popup({login, setLogin, setSucc}) {
    return(
        <div>
            {login && <Login setLogin = {setLogin} setSucc={setSucc}/>}
            {!login && <SignUp setLogin = {setLogin}/>}
        </div>

    )
}
