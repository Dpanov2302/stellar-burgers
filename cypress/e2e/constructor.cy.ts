/// <reference types="cypress" />

import { selectors } from './selectors';

describe('Конструктор бургера — добавление по клику', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет булку и начинку через клик на кнопку', () => {
    cy.get(selectors.bunButton).click();
    cy.get(selectors.assemblyBun).should('contain', 'Краторная булка N-200i');

    cy.get(selectors.meatButton).click();
    cy.get(selectors.assemblyFilling).and('contain', 'Говяжий метеорит (отбивная)');
  });

  it('добавляет булку и сразу несколько начинок', () => {
    cy.get(selectors.bunButton).click();
    cy.get(selectors.meatButton).click();
    cy.get(selectors.meatButton).click();

    cy.get(selectors.assemblyFilling).should('have.length', 2);
  });
});
