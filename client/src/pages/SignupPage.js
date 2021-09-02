import { useHistory } from "react-router-dom";
import SignUp from "../components/Auth/SignUp";

const SingupPage = () => {
  const history = useHistory();
  const showLoginPage = () => {
    history.push("/login");
  };
  return <SignUp forLogIn={showLoginPage} />;
};

export default SingupPage;
