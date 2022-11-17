export class ReciptPage {
  constructor() {
    this.buttonThankYou = "//button[text()='Thank you']";
    this.selectorNames = "#name";
    this.product1 = "//p[@id='White Pants']";
    this.product2 = "//p[@id='Black Jacket']";
    this.cardNumber = "#creditCard";
    this.totalPrice = "#totalPrice";
    this.showLoading = "div[role='progressbar']";
  }

  verifyButtonThankYou() {
    return cy.xpath(this.buttonThankYou, { timeout: 10000 });
  }

  verifyShowLoading() {
    return cy.get(this.showLoading);
  }

  verifyNames(nombre, apellido) {
    cy.get(this.selectorNames)
      .invoke("text")
      .then(() => {
        cy.contains(nombre + " " + apellido);
      });
  }

  verifyProduct1() {
    return cy.xpath(this.product1);
  }

  verifyProduct2() {
    return cy.xpath(this.product2);
  }

  VerifyCardNumber() {
    return cy.get(this.cardNumber);
  }

  verifyTotalAmount(total) {
    return cy
      .get(this.totalPrice)
      .invoke("text")
      .then(() => {
        cy.contains(total);
      });
  }
}
