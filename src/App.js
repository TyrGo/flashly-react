import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "reactstrap";
import UserContext from "./UserContext";
import UserApi from "./apis/userApi";
import Routes from "./Routes";
import NavBar from "./NavBar";
import jwt from "jsonwebtoken";
import "bootstrap/dist/css/bootstrap.min.css";

// TODO: tests
// TODO: more reusable card component
// TODO: more styling

function App() {
  const [token, setToken] = useState(localStorage.getItem("USER_TOKEN"));
  const [currentUser, setCurrentUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(function getUserOnMount() {
    if (token) {
      localStorage.setItem("USER_TOKEN", token);
      UserApi.token = token;
      const { userId, isAdmin } = jwt.decode(token);
      setCurrentUser({ userId, isAdmin });
    } else {
      localStorage.removeItem("USER_TOKEN");
      UserApi.token = null;
      setCurrentUser({});
    }
    setLoaded(true);
  }, [token]);

  async function handleSignUp(formData) {
    try {
      let token = await UserApi.signUp(formData);
      localStorage.setItem("USER_TOKEN", token);
      UserApi.token = token;
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, err: err };
    }
  }

  async function handleSignIn(formData) {
    try {
      let token = await UserApi.signIn(formData);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, err: err };
    }
  }

  function handleSignOut() {
    localStorage.removeItem("USER_TOKEN");
    UserApi.token = null;
    setToken(null);
  }

  if (!loaded) return <p>Loading...</p>;

  return (
    <UserContext.Provider value={currentUser}>
      <BrowserRouter>
        <NavBar handleSignOut={handleSignOut} />
        <Container>
          <Routes handleSignUp={handleSignUp} handleSignIn={handleSignIn} />
        </Container>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;