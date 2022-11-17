export class CheckOutPage {
  constructor() {
    this.firstName = "#FirstName";
    this.lastName = "#lastName";
    this.cardNumber = "#cardNumber";
    this.purchaseButton = "//button[text()='Purchase']";
  }

  inputName(name) {
    cy.get(this.firstName).type(name);
  }

  inputLastName(lastName) {
    cy.get(this.lastName).type(lastName);
  }

  inputCard(number) {
    cy.get(this.cardNumber).type(number);
  }

  buttonPurchase() {
    cy.xpath(this.purchaseButton).click();
  }
}
