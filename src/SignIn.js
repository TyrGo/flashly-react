import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import UserContext from "./UserContext";
import "./SignIn.css";

/**
 * Form for user sign in. Or displays error message with incorrect username/password
 */
function SignIn({ handleSignIn }) {
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const currentUser = useContext(UserContext);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await handleSignIn(formData);
    if (res.success) {
      history.push("/card");
    } else {
      setFormData({ username: "", password: "" });
      setError(res.err);
    }
  }

  if (currentUser.userId) history.push("/card");

  return (
    <div className="card-cont">
      {error ? <p>Please try another username or password</p> : null}
      <h1>Log In</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </FormGroup>
        <br />
        <Button className="btn" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;