export class HomePage {
  constructor() {
    this.buttonProductsPage = "#onlineshoplink";
  }

  comeProductsPage() {
    cy.get(this.buttonProductsPage).click();
  }
}
