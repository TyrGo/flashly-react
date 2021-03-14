import { useState, useContext } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import UserContext from "./UserContext";
import "./CardDetails.css";

/**
 * Form to create new card with word and definition
 */
function NewCardForm({ handleCreate }) {
  const currentUser = useContext(UserContext);
  const [formData, setFormData] = useState({ word: '', defn: '' });

  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData((oldformData) => ({ ...oldformData, [name]: value }));
  }

  return (
    <Form onSubmit={(evt) => handleCreate(evt, currentUser.userId, formData)}>
      <FormGroup>
          <Input
            name="word"
            value={formData.word}
            placeholder="Word"
            onChange={handleChange}
            required
          />
      </FormGroup>
      <FormGroup>
          <Input
            name="defn"
            value={formData.defn}
            placeholder="Definition"
            onChange={handleChange}
            required
          />
      </FormGroup>
        <Button>
          Create Card
        </Button>
    </Form>
  );
}

export default NewCardForm;
