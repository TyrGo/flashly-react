import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NavLink as NL } from "reactstrap";
import { Navbar, Nav } from "reactstrap";
import UserContext from "./UserContext";
import "./NavBar.css";

/**
 * Navigation bar for signed in or sign in/up
 */
function NavBar({ handleSignOut }) {
  const currentUser = useContext(UserContext);

  function navbar() {
    if (currentUser.userId) {
      // navbar for logged in user
      return (
        <Navbar expand="md">
          <Nav className="mr-auto">
            <NL>
              <NavLink to="/signout" onClick={handleSignOut}>
                Sign Out
              </NavLink>
            </NL>
            <NL>
              <NavLink to="/card">Learn Cards</NavLink>
            </NL>
            <NL>
              <NavLink to="/create-card">Create New Card</NavLink>
            </NL>
            {currentUser.isAdmin ? (
              <NL>
                <NavLink to="/cards">Admin All Cards</NavLink>
              </NL>
            ) : null}
          </Nav>
        </Navbar>
      );
    } else {
      // navbar for sign in/up
      return (
        <Navbar expand="md">
          <Nav className="mr-auto">
            <NL>
              <NavLink to="/signin">
                Log In
              </NavLink>
            </NL>
            <NL>
              <NavLink to="/signup">
                Sign Up
              </NavLink>
            </NL>
          </Nav>
        </Navbar>
      );
    }
  }

  return navbar();
}

export default NavBar;