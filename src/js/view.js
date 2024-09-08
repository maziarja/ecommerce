import image1 from "../../images/image-product-1.jpg";
import image2 from "../../images/image-product-2.jpg";
import image3 from "../../images/image-product-3.jpg";
import image4 from "../../images/image-product-4.jpg";
class View {
  _btnMinus = document.querySelector(".minus-icon");
  _btnPlus = document.querySelector(".plus-icon");
  _quantity;
  constructor() {
    this._OpenShoppingCard();
    this._switchLightBoxImage();
    this._lightBox();
    this._switchDesktopImage();
    this._switchMobileImageWithArrows();
    this._mobileMenu();
  }
  // getting quantity from controller
  _getQuantity(quantity) {
    this._quantity = quantity;
  }

  _updateShoppingCard(data) {
    const basket = document.querySelector(".nav__cart-icon");
    if (data.quantity !== 0) {
      basket.style.setProperty("--cart-count", `"${data.quantity}"`);
      basket.classList.add("show");
    } else {
      basket.classList.remove("show");
    }
    // update quantity in basket
    document
      .querySelector(".check-out-cost")
      .querySelector(".quantity").textContent = data.quantity;
    // update final price
    document.querySelector(".final-cost").textContent = `$${
      data.quantity * data.price
    }.00`;
  }

  _switchFillOrEmptyBasket(quantity) {
    const filledBasket = document.querySelector(".filled-basket__item");
    const emptyBasket = document.querySelector(".empty-basket");
    if (quantity === 0) {
      emptyBasket.classList.add("active");
      filledBasket.classList.remove("active");
    } else {
      emptyBasket.classList.remove("active");
      filledBasket.classList.add("active");
    }
  }
  // open shopping card
  _OpenShoppingCard() {
    const basket = document.querySelector(".basket__container");
    document.querySelector(".nav__cart-icon").addEventListener("click", () => {
      basket.classList.toggle("open");
    });
    document.body.addEventListener("click", (e) => {
      const cardIcon = e.target.closest(".nav__cart-icon");
      const shoppingBasket = e.target.closest(".basket__container");
      const buyContainer = e.target.closest(".buy__container");
      if (!cardIcon && !shoppingBasket && !buyContainer)
        basket.classList.remove("open");
    });
  }
  _deleteItem() {
    const basket = document.querySelector(".nav__cart-icon");
    const filledBasket = document.querySelector(".filled-basket__item");
    const emptyBasket = document.querySelector(".empty-basket");
    // switch to empty basket
    emptyBasket.classList.add("active");
    filledBasket.classList.remove("active");
    // remove basket number
    basket.classList.remove("show");
  }
  // update quantity if btn clicked
  _addHandlerUpdateQuantity = function (handler) {
    let quantity = this._quantity;
    this._btnPlus.addEventListener("click", () => {
      quantity++;
      this._quantity = quantity;
      document
        .querySelector(".quantity__container")
        .querySelector(".quantity").textContent = quantity;
      handler(quantity);
    });
    this._btnMinus.addEventListener("click", () => {
      quantity > 0 ? quantity-- : 0;
      this._quantity = quantity;
      document
        .querySelector(".quantity__container")
        .querySelector(".quantity").textContent = quantity;
      handler(quantity);
    });
  };
  _addHandlerAddToCard(handler) {
    document
      .querySelector(".add-to-card__container")
      .addEventListener("click", () => {
        handler();
      });
  }
  _addHandlerDeleteShoppingItem(handler) {
    const deleteItem = document.querySelector(".delete-icon");
    deleteItem.addEventListener("click", () => {
      handler();
    });
  }
  //////////// LIGHT BOX SECTION ///////////////

  _lightBox() {
    // open light box
    const mainImage = document.querySelector(".image-product__desktop");
    mainImage.addEventListener("click", () => {
      document.querySelector(".image-product__desktop").classList.add("open");
    });
    // close light box
    document
      .querySelector(".light-box__close")
      .addEventListener("click", () => {
        document
          .querySelector(".image-product__desktop")
          .classList.remove("open");
      });
  }
  // border on thumbnail if arrows clicked
  _thumbnailBorder() {
    const mainImage = document
      .querySelector(".light-box")
      .querySelector(".desktop-image");
    const thumbnailImages = document
      .querySelector(".light-box")
      .querySelectorAll(".thumbnail-image");
    thumbnailImages.forEach((thumbnail) => {
      const mainImageUrl = new URL(mainImage.srcset);
      if (thumbnail.srcset === mainImageUrl.pathname) {
        thumbnail.parentElement.style.outline =
          "2px solid rgba(255, 125, 26, 0.945)";
      } else {
        thumbnail.parentElement.style.outline = "none";
      }
    });
  }

  // switch images
  _switchLightBoxImage() {
    const leftArrow = document
      .querySelector(".light-box")
      .querySelector(".arrow-left");
    const rightArrow = document
      .querySelector(".light-box")
      .querySelector(".arrow-right");
    const lightBoxImage = document
      .querySelector(".light-box")
      .querySelector(".desktop-image");
    const thumbnailImages = document
      .querySelector(".light-box")
      .querySelector(".thumbnail-image__container");

    // switch image when thumbnail is clicked
    thumbnailImages.addEventListener("click", (e) => {
      const thumbnail = e.target.closest(".thumbnail-image");
      if (!thumbnail) return;
      const imageUrl = thumbnail.getAttribute("srcset");
      lightBoxImage.setAttribute("srcset", imageUrl);
      // implementing borders
      document
        .querySelector(".light-box")
        .querySelectorAll(".thumbnail-image__border")
        .forEach((el) => {
          el.style.outline = "none";
        });
      thumbnail.parentElement.style.outline =
        "2px solid rgba(255, 125, 26, 0.945)";
    });

    // switch images when arrows are clicked
    let num = 0;
    const images = [image1, image2, image3, image4];
    rightArrow.addEventListener("click", () => {
      num++;
      if (num > 3) num = 0;
      lightBoxImage.setAttribute("srcset", images[num]);
      // border
      this._thumbnailBorder();
    });

    leftArrow.addEventListener("click", () => {
      num--;
      if (num < 0) num = 3;
      lightBoxImage.setAttribute("srcset", images[num]);
      //border
      this._thumbnailBorder();
    });
  }

  //////////// IMAGE SECTION ///////////////

  // switch image when thumbnail is clicked
  _switchDesktopImage() {
    const mainImage = document
      .querySelector(".image-wrapper")
      .querySelector(".desktop-image");
    const thumbnailImages = document
      .querySelector(".image-wrapper")
      .querySelector(".thumbnail-image__container");
    thumbnailImages.addEventListener("click", (e) => {
      const thumbnail = e.target.closest(".thumbnail-image");
      if (!thumbnail) return;
      const imageUrl = thumbnail.getAttribute("srcset");
      mainImage.setAttribute("srcset", imageUrl);
    });
  }
  _switchMobileImageWithArrows() {
    let num = 0;
    const leftArrow = document
      .querySelector(".image-wrapper")
      .querySelector(".arrow-left");
    const rightArrow = document
      .querySelector(".image-wrapper")
      .querySelector(".arrow-right");
    const target = document
      .querySelector(".image-wrapper")
      .querySelector(".image-product");

    const images = [image1, image2, image3, image4];
    rightArrow.addEventListener("click", () => {
      num++;
      if (num > 3) num = 0;
      target.setAttribute("srcset", images[num]);
    });

    leftArrow.addEventListener("click", () => {
      num--;
      if (num < 0) num = 3;
      target.setAttribute("srcset", images[num]);
    });
  }
  //////////// MOBILE MENU SECTION ///////////////
  _mobileMenu() {
    // open menu
    document.querySelector(".menu-icon").addEventListener("click", () => {
      document.querySelector(".menu").classList.add("open");
    });
    // close menu
    document.querySelector(".close-menu__btn").addEventListener("click", () => {
      document.querySelector(".menu").classList.remove("open");
    });
  }
}

export default new View();
