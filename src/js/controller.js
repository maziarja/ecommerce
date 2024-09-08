import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import view from "./view.js";

const controlQuantity = function (quantity) {
  //   if (quantity === 0) return;
  model.quantity(quantity);
};
const controlAddToCard = function () {
  view._updateShoppingCard(model.main.product);
  model.addToShoppingCard();
  // control if basket is empty or filled
  const quantity =
    model.main.shoppingCard[model.main.shoppingCard.length - 1]?.quantity || 0;
  view._switchFillOrEmptyBasket(quantity);
};

const controlDeleteItem = function () {
  // delete item from model
  model.deleteItemFromShoppingCard();
  // delete item from view
  view._deleteItem();
};

const init = function () {
  // giving quantity from model to view
  view._getQuantity(model.main.product.quantity);
  // update quantity and giving back to the model
  view._addHandlerUpdateQuantity(controlQuantity);
  // update shopping card and pushing data in shopping card
  view._addHandlerAddToCard(controlAddToCard);
  // deleting item from shopping card
  view._addHandlerDeleteShoppingItem(controlDeleteItem);
};
init();
