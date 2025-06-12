/// <reference types="cypress" />

describe('Модальное окно ингредиента', () => {
  const ingredient = '[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]';
  const modalContent = '[data-testid="modal-content"]';
  const modalClose = '[data-testid="modal-close"]';
  const modalOverlay = '[data-testid="modal-overlay"]';

  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(ingredient).as('ingredientCard');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('модальное окно отсутствует до клика и открывается с данными ингредиента', () => {
    cy.get(modalContent).should('not.exist');

    cy.get('@ingredientCard').click();

    cy.get(modalContent)
      .as('modal')
      .should('be.visible')
      .within(() => {
        cy.contains('Краторная булка N-200i').should('be.visible');
        cy.get('img')
          .should('have.attr', 'src')
          .and('include', 'bun-02-large.png');
      });
  });

  it('закрывается по клику на крестик', () => {
    cy.get('@ingredientCard').click();
    cy.get(modalContent).as('modal').should('be.visible');
    cy.get(modalClose).click();
    cy.get(modalContent).should('not.exist');
  });

  it('закрывается по клику на оверлей', () => {
    cy.get('@ingredientCard').click();
    cy.get(modalContent).as('modal').should('be.visible');
    cy.get(modalOverlay).click({ force: true });
    cy.get(modalContent).should('not.exist');
  });
});
