//reference types = "cypress";
const constants = require("../support/constants");

import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckOutPage } from "../support/pages/checkOutPage";
import { ReciptPage } from "../support/pages/reciptPage";

describe("Desafio final PushingIt", () => {
  const username = constants.loginData.user;
  const password = constants.loginData.pass;
  let productData, dataCard;

  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkOutPage = new CheckOutPage();
  const reciptPage = new ReciptPage();

  before("Asociando archivos Json", () => {
    cy.fixture("productsData").then((data) => {
      productData = data;
      cy.fixture("cardData").then((data) => {
        dataCard = data;
      });
    });
    //Register por peticion POST
    cy.request({
      url: "https://pushing-it-backend.herokuapp.com/api/register",
      method: "POST",
      body: {
        username,
        password,
        gender: "Female",
        day: "13",
        month: "July",
        year: "1975",
      },
    }).then((response) => {
      expect(response.status).equal(200);
    });
    //Login por localStore
    cy.request({
      method: "POST",
      url: "https://pushing-it-backend.herokuapp.com/api/login",
      body: {
        username,
        password,
      },
    }).then((response) => {
      window.localStorage.setItem("token", response.body.token);
      window.localStorage.setItem("user", response.body.user.username);
    });

    cy.visit("");
  });

  it("Deberia verificar productos del carrito de compras, la suma total y tarjeta de credito", () => {
    const sum = productData.product2.price + productData.product4.price;

    //homePage
    homePage.comeProductsPage();

    //productsPage
    productsPage.chooseProducto(productData.product2.name);
    productsPage.addProductToCart();
    productsPage.chooseProducto(productData.product4.name);
    productsPage.addProductToCart();
    productsPage.goToCard();

    //shoppingCartPage
    shoppingCartPage
      .verifyProduct(productData.product2.name)
      .should("have.text", productData.product2.name);
    shoppingCartPage
      .verifyPrice(productData.product2.name, productData.product2.price)
      .should("have.text", `$${productData.product2.price}`);
    shoppingCartPage
      .verifyProduct(productData.product4.name)
      .should("have.text", productData.product4.name);
    shoppingCartPage
      .verifyPrice(productData.product4.name, productData.product4.price)
      .should("have.text", `$${productData.product4.price}`);
    shoppingCartPage.buttonTotalAmount();
    shoppingCartPage.verifyTotalAmount().should("have.text", sum);
    shoppingCartPage.buttonCheckOut();

    //checkOutPage
    checkOutPage.inputName(dataCard.name);
    checkOutPage.inputLastName(dataCard.lastName);
    checkOutPage.inputCard(dataCard.cardNumber);
    checkOutPage.buttonPurchase();
    
    //reciptPage -> espera dinamica
    reciptPage.verifyShowLoading().should("exist");
    reciptPage.verifyButtonThankYou().should("have.text", "Thank you");
    reciptPage.verifyNames(dataCard.name, dataCard.lastName);
    reciptPage.verifyProduct1().should("have.text", productData.product2.name);
    reciptPage.verifyProduct2().should("have.text", productData.product4.name);
    reciptPage.VerifyCardNumber().should("have.text", dataCard.cardNumber);
    reciptPage.verifyTotalAmount(sum);
  });

  after("Eliminacion de usuario", () => {
    cy.request({
      url: `https://pushing-it-backend.herokuapp.com/api/deleteuser/${username}`,
      method: "DELETE",
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });
});
