import axios from "axios";

const BASE_URL = "https://flashly-flash-card.herokuapp.com";

class CardApi {
  static async createCard(userId, data) {
    let res = await axios.post(`${BASE_URL}/${userId}/create_card`, data);
    return res;
  }

  static async getCard(userId) {
    let res = await axios.get(`${BASE_URL}/${userId}/retrieve_card`);
    return res;
  }

  static async getCards() {
    let res = await axios.get(`${BASE_URL}/retrieve_cards`);
    return res;
  }

  static async getUserCards(userId) {
    let res = await axios.get(`${BASE_URL}/${userId}/retrieve_user_cards`);
    return res;
  }

  static async updateCard(cardId, data) {
    let res = await axios.patch(`${BASE_URL}/${cardId}/update_card`, data);
    return res;
  }

  static async binUp(cardId) {
    let res = await axios.post(`${BASE_URL}/${cardId}/bin_up`);
    return res;
  }

  static async binDown(cardId) {
    let res = await axios.post(`${BASE_URL}/${cardId}/bin_down`);
    return res;
  }

  static async deleteCard(cardId) {
    let res = await axios.delete(`${BASE_URL}/${cardId}/delete_card`);
    return res;
  }
}

export default CardApi;