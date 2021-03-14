import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import UserContext from "./UserContext";
import CardApi from "./apis/cardApi";
import CardDetails from "./CardDetails";
import "./Cards.css";

// TODO: retrieve cards by particular user via dropdown

/**
 * Displays all cards for signed in administrator
 */
function Cards() {
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);
  const history = useHistory();

  async function getAllCards() {
    if (currentUser.isAdmin) {
      let cards = await CardApi.getCards();
      setCards(cards.data);
      setIsLoading(false);
    } else {
      history.push("/");
    }
  }

  useEffect(function getCardsOnMount() {
    getAllCards();
  }, []);
  
  if (isLoading) return <i>Loading...</i>;
  if (!cards.length) return <p className="card-cont"> No cards to display</p>;

  return (
    <div className="cards-admin">
      {cards.map(c => <CardDetails key={uuidv4()} getAllCards={getAllCards} card={c}/>)}
    </div>
  );
}

export default Cards;