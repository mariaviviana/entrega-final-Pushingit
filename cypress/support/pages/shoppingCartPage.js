export class ShoppingCartPage {
  constructor() {
    this.viewTotal = "//button[text()='Show total price']";
    this.totalAmount = "#price";
    this.buttonCheckout = "//button[text()='Go to Checkout']";
  }

  verifyProduct(product) {
    return cy.get(`p[name='${product}']`);
  }

  verifyPrice(product, price) {
    return cy.xpath(
      `//p[@name='${product}']//following-sibling::p[@name=${price}]`
    );
  }

  buttonTotalAmount() {
    cy.xpath(this.viewTotal).click();
  }

  verifyTotalAmount() {
    return cy.get(this.totalAmount);
  }
  buttonCheckOut() {
    cy.xpath(this.buttonCheckout).click();
  }
}
