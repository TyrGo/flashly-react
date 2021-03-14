import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import UserContext from "./UserContext";

/**
 * Form for new user to sign up
 */
function SignUp({ handleSignUp }) {
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState();
  const currentUser = useContext(UserContext);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await handleSignUp(formData);
    if (res.success) {
      history.push("/card");
    } else {
      setFormData({ username: "", password: "" });
      setError(res.err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  if (currentUser.userId) history.push('/card');

  return (
    <div className="card-cont">
      {error ? <p>Please try another username or password</p> : null}
      <div>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
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
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
