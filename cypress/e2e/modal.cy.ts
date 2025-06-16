/// <reference types="cypress" />
import { selectors } from './selectors';

describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(selectors.bunIngredient).as('ingredientCard');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('модальное окно отсутствует до клика и открывается с данными ингредиента',
    () => {
      cy.get(selectors.modalContent).should('not.exist');

      cy.get('@ingredientCard').click();

      cy.get(selectors.modalContent)
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
    cy.get(selectors.modalContent).should('be.visible');
    cy.get(selectors.modalClose).click();
    cy.get(selectors.modalContent).should('not.exist');
  });

  it('закрывается по клику на оверлей', () => {
    cy.get('@ingredientCard').click();
    cy.get(selectors.modalContent).should('be.visible');
    cy.get(selectors.modalOverlay).click({ force: true });
    cy.get(selectors.modalContent).should('not.exist');
  });
});
