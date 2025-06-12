/// <reference types="cypress" />
import { setCookie } from './../../src/utils/cookie';

describe('Создание заказа', () => {
  beforeEach(() => {
    setCookie(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM'
    );
    localStorage.setItem(
      'refreshToken',
      '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556'
    );

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    cy.intercept('POST', '**/api/orders', { fixture: 'orders.json' }).as(
      'createOrder'
    );

    cy.visit('/');

    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('формирует заказ, отправляет, показывает модалку с номером и очищает конструктор', () => {
    cy.get(
      '[data-testid="ingredient-643d69a5c3f7b9001cfa093c"] button'
    ).click();
    cy.get(
      '[data-testid="ingredient-643d69a5c3f7b9001cfa0940"] button'
    ).click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-testid="modal-content"]').should('be.visible');
    cy.fixture('orders.json').then(({ order }) => {
      cy.contains(order.number).should('be.visible');
    });

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal-content"]').should('not.exist');

    cy.get('[data-testid="constructor-bun"]').should('have.length', 0);
    cy.get('[data-testid="constructor-filling"] li').should('have.length', 0);
  });
});
