/// <reference types="cypress" />

describe('Burger Builder Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('postOrder');
    window.localStorage.setItem('accessToken', 'Bearer fake-token');
  });

  it('should load ingredients and add them to constructor', () => {
    cy.wait('@getIngredients');
    cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart');
    cy.get('[data-testid="drop-area"]').trigger('drop');
    cy.get('[data-testid="constructor-item"]').should('exist');
  });

  it('should open and close ingredient modal', () => {
    cy.get('[data-testid="ingredient-card"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should close modal on overlay click', () => {
    cy.get('[data-testid="ingredient-card"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order and show order number', () => {
    cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart');
    cy.get('[data-testid="drop-area"]').trigger('drop');
    cy.get('[data-testid="order-button"]').click();
    cy.wait('@postOrder');
    cy.contains('98765').should('exist');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="constructor-item"]').should('not.exist');
  });
});
