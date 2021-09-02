import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/MainHeader/MainHeader";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SignupPage";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import Profile from "./pages/Profile";
import Footer from "./components/MainHeader/Footer";
import Dashboard from "./pages/Dashboard";
function App() {
  const authCtx = useContext(AuthContext);
  let userLoggedin = authCtx.isLoggedin;
  const studentId = authCtx.studentId;
  return (
    <div>
      <header>
        <MainHeader />
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home"></Redirect>
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/login" exact>
            {!userLoggedin && <LoginPage />}
            {userLoggedin && <Redirect to={`/dashboard/${studentId}`} />}
          </Route>
          <Route path="/signup" exact>
            {!userLoggedin && <SingupPage />}
            {userLoggedin && <Redirect to={`/dashboard/${studentId}`} />}
          </Route>
          <Route path="/profile" exact>
            {userLoggedin && <Profile />}
            {!userLoggedin && <HomePage />}
          </Route>
          <Route path="/dashboard/:studentId" exact>
            {userLoggedin && <Dashboard />}
            {!userLoggedin && <Redirect to="/" />}
          </Route>
          <Route path="*" exact>
            <h1>Error 404</h1>
          </Route>
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
