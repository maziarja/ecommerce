export const main = {
  product: {
    shoes: "sneakers",
    quantity: 0,
    price: 125,
  },
  shoppingCard: [],
};

export const quantity = function (quantity) {
  main.product = {
    shoes: "sneakers",
    quantity: quantity,
    price: 125,
  };
};

export const addToShoppingCard = function () {
  (main.product.status = main.product.quantity === 0 ? "faild" : "success"),
    main.shoppingCard.push(main.product);
};

export const deleteItemFromShoppingCard = function () {
  const index = main.shoppingCard.findIndex((item) => {
    return item.quantity === main.product.quantity;
  });
  if (index === -1) return;
  main.shoppingCard.splice(index, 1);
};
