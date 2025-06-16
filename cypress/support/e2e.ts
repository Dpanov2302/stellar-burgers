// @ts-ignore
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('removeChild') &&
    err.message.includes('not a child')
  ) {
    return false; // не фейлить тесты
  }
});

import './commands';
