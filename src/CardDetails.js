import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import CardApi from "./apis/cardApi";
import "./CardDetails.css";

/**
 * Displays card details, and handles updating and deleting of card
 */
function CardDetails({ getAllCards, card }) {
  const { id, defn, word, user } = card;
  const [formData, setFormData] = useState({ word: word, defn: defn });

  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData((oldformData) => ({ ...oldformData, [name]: value }));
  }

  async function updateCard(evt, id, formData) {
    evt.preventDefault();
    await CardApi.updateCard(id, formData);
    getAllCards();
  }

  async function deleteCard(id, formData) {
    await CardApi.deleteCard(id, formData);
    getAllCards();
  }
 
  return (
    <div className="card-details">
      <h5>Username: {user}</h5>
      <Form onSubmit={(evt) => updateCard(evt, id, formData)}>
        <FormGroup row>
          <Label sm={4}>Word</Label>
          <Col sm={8}>
            <Input
              name="word"
              value={formData.word}
              placeholder={formData.word}
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Definition</Label>
          <Col sm={8}>
            <Input
              name="defn"
              value={formData.defn}
              placeholder={formData.defn}
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <div className="btns">
          <Button>Update Card</Button>
          <Button onClick={() => deleteCard(id, formData)}>Delete Card</Button>
        </div>
      </Form>
    </div>
  );
}

export default CardDetails;