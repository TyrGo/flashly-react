import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Timer from "react-compound-timer";
import UserContext from "./UserContext";
import CardApi from "./apis/cardApi";
import "./Card.css"

// TODO: option to display partial definition

/**
 * Retrieves next card for signed in user 
 * Displays next card, or waiting message with timer till due
 * Toggles reveal of definition, and handles card bin updates
 */
function Card() {
  const currentUser = useContext(UserContext);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState(null);
  const [displayDefn, setDisplayDefn] = useState(false);
  const [displayCard, setDisplayCard] = useState(true);
  const [message, setMessage] = useState("")

  useEffect(function getCardOnMount() {
    async function getCard() {
      if (currentUser.userId) {
        let newCard = await CardApi.getCard(currentUser.userId);
        if (newCard.data.message) {
          setMessage(newCard.data.message);
        } else {
          setMessage("");
          setCard(newCard.data);
          if (newCard.data.due > 0) setDisplayCard(false);
        }
        setIsLoading(false);
      } else {
        history.push("/");
      }
    }
    getCard();
  }, [currentUser.userId, history]);

  function revealDefn() {
    setDisplayDefn(!displayDefn);
  }

  async function updateBin(level) {
    if (level === "up") await CardApi.binUp(card.id);
    if (level === "down") {
      await CardApi.binDown(card.id);
      if (displayDefn) setDisplayDefn(!displayDefn);
    }
    let newCard = await CardApi.getCard(currentUser.userId);
    newCard.data.message
      ? setMessage(newCard.data.message)
      : setCard({ ...newCard.data });
    if (newCard.data.due && newCard.data.due > 0) setDisplayCard(false);
  }

  if (isLoading) return <i>Loading...</i>;

  if (message) {
    return (
      <div className="card-cont">
        <p>{message}</p>
      </div>
    );
  }

  if (!displayCard) {
    return (
      <div>
        <div className="card-cont">
          <p>You are temporarily done.</p>
          <p>Please come back later to review more words.</p>
          <div key={card.due}>
            <Timer
              initialTime={card.due <= 0 ? 0.01 : card.due * 1000}
              direction="backward"
              checkpoints={[{ time: 0, callback: () => setDisplayCard(true) }]}
            >
              <Timer.Days /> days <Timer.Hours /> hrs <Timer.Minutes /> mins{" "}
              <Timer.Seconds /> secs till next card
            </Timer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card-cont">
        <h1>{card.word}</h1>
        <div className="display" onClick={revealDefn}>
          {displayDefn ? card.defn : "Display definition"}
        </div>
        <div className="btns">
          <Button className="btn1" onClick={() => updateBin("up")}>I got it</Button>
          <Button className="btn2" onClick={() => updateBin("down")}>I didn't get it</Button>
        </div>
      </div>
      <div key={card.due}>
        <Timer
          initialTime={card.due <= 0 ? 0.01 : card.due * 1000}
          direction="backward"
          checkpoints={[{ time: 0, callback: () => setDisplayCard(true) }]}
        >
        </Timer>
      </div>
    </div>
  );
}

export default Card;