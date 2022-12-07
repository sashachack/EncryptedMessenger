import Login from "../components/login";
import SignUp from "../components/sign_up";


export default function Popup({login, setLogin, setSucc, socket}) {
    return(
        <div>
            {login && <Login setLogin = {setLogin} setSucc={setSucc} socket = {socket}/>}
            {!login && <SignUp setLogin = {setLogin}/>}
        </div>

    )
}
