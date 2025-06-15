/// <reference types="cypress" />

import { setCookie } from './../../src/utils/cookie';
import { selectors } from './selectors';

describe('Создание заказа', () => {
  beforeEach(() => {
    setCookie('accessToken', 'Bearer ...');
    localStorage.setItem('refreshToken', '...');

    // @ts-ignore
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // @ts-ignore
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    // @ts-ignore
    cy.intercept('POST', '**/api/orders', { fixture: 'orders.json' }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('формирует заказ, отправляет, показывает модалку с номером и очищает конструктор', () => {
    cy.get(selectors.bunButton).click();
    cy.get(selectors.meatButton).click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get(selectors.modalContent).should('be.visible');
    cy.fixture('orders.json').then(({ order }) => {
      cy.contains(order.number).should('be.visible');
    });

    cy.get(selectors.modalClose).click();
    cy.get(selectors.modalContent).should('not.exist');

    cy.get(selectors.assemblyBun).should('have.length', 0);
    cy.get(selectors.assemblyFilling).should('have.length', 0);
  });
});
