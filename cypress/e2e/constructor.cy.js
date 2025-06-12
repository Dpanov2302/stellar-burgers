/// <reference types="cypress" />

describe('Конструктор бургера — добавление по клику', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');

    cy.wait('@getIngredients');
  });

  it('добавляет булку и начинку через клик на кнопку', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    cy.get('[data-testid="constructor-bun"]').should(
      'contain',
      'Краторная булка N-200i'
    );

    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0940"]')
      .find('button')
      .click();

    cy.get('[data-testid="constructor-filling"]')
      .find('li')
      .and('contain', 'Говяжий метеорит (отбивная)');
  });

  it('добавляет булку и сразу несколько начинок', () => {
    cy.get(
      '[data-testid="ingredient-643d69a5c3f7b9001cfa093c"] button'
    ).click();

    cy.get(
      '[data-testid="ingredient-643d69a5c3f7b9001cfa0940"] button'
    ).click();
    cy.get(
      '[data-testid="ingredient-643d69a5c3f7b9001cfa0940"] button'
    ).click();

    cy.get('[data-testid="constructor-filling"] li').should('have.length', 2);
  });
});
