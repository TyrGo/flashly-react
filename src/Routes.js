import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./HomePage";
import Card from "./Card";
import Cards from "./Cards";
import CreateCard from "./CreateCard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

/**
 * Routes
 */
function Routes({ handleSignUp, handleSignIn }) {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/signup">
        <SignUp handleSignUp={handleSignUp} />
      </Route>
      <Route exact path="/signin">
        <SignIn handleSignIn={handleSignIn} />
      </Route>
      <Route exact path="/signout">
        <HomePage />
      </Route>
      <Route exact path="/cards">
        <Cards />
      </Route>
      <Route exact path="/card">
        <Card />
      </Route>
      <Route exact path="/create-card">
        <CreateCard />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default Routes;
