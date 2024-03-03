/* eslint-disable no-unused-vars */
//import '@shelex/cypress-allure-plugin';
//import 'cypress-mochawesome-reporter/register';
//import 'cypress-mailosaur';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})