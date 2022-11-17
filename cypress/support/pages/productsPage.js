export class ProductsPage {
  constructor() {
    this.addProduct = "#closeModal";
    this.goToTheCart = "//button[@id='goShoppingCart']";
  }

  chooseProducto(product) {
    cy.get(`button[value='${product}']`).click();
  }

  addProductToCart() {
    cy.get(this.addProduct).click();
  }

  goToCard() {
    cy.xpath(this.goToTheCart).click();
  }
}
