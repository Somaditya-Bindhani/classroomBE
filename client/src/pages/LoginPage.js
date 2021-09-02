
import { useHistory } from "react-router-dom";
import Login from "../components/Auth/Login";
const LoginPage = () => {
  const history=useHistory();
  const showSingupPage=()=>{
    history.push('/signup');
  }
  return (
    <Login forSignUp={showSingupPage}/>
    );
};
export default LoginPage;
