import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import NewCardForm from "./NewCardForm";
import CardApi from "./apis/cardApi";
import UserContext from "./UserContext";
import "./Card.css"

/**
 * Displays form for signed in user to create new card with success message on submit
 */
function CreateCard() {
  const currentUser = useContext(UserContext);
  const history = useHistory()
  const [display, setDisplay] = useState(false)

  async function handleCreate(evt, id, data) {
    evt.preventDefault();
    await CardApi.createCard(id, data);
    toggleDisplay();
  }

  function toggleDisplay() {
    setDisplay(!display)
  }

  if (!currentUser.userId) history.push('/')

  if (display) {
    return (
      <div className="card-cont" onClick={toggleDisplay}>
        <h2>Card created</h2>
        <p>Click to create another card.</p>
      </div>
    );
  }

  return (
    <div className="card-cont">
      <h2>New Card</h2>
      <NewCardForm handleCreate={handleCreate} toggleDisplay={toggleDisplay} />
    </div>
  );
}

export default CreateCard;