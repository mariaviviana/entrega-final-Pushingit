export class ReciptPage {
  constructor() {
    this.buttonThankYou = "//button[text()='Thank you']";
    this.selectorNames = "#name";
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
    cy.get(this.selectorNames).invoke("text").then(() => {
        cy.contains(nombre + " " + apellido);
      });
  }

  VerifyCardNumber() {
    return cy.get(this.cardNumber);
  }

  verifyProduct(product) {
    return cy.xpath(`//p[text()='${product}']`,{timeout: 10000});
  }

  verifyTotalAmount(total) {
    return cy.get(this.totalPrice).invoke("text").then(() => {
        cy.contains(total);
      });
  }
}
