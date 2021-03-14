import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import "./HomePage.css";

/**
 * Welcome message for landing
 */
function Homepage() {
  const currentUser = useContext(UserContext);
  const history = useHistory();

  if (currentUser.userId) history.push("/card");

  return <h1 className="welcome">Welcome to Flashly</h1>;
}

export default Homepage;
