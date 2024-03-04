/// <reference types="Cypress" />

import test_data_credentials from '../../fixtures/data/credentials'

describe('post user request - negative test cases', () => {

    it('Should attempt to create a user with invalid input - email', () => {
        
        cy.fixture('createuser').then((data) => {
            
            cy.api({
                method: 'POST',
                url: '/',
                
                headers: {
                    'Authorization': 'Bearer ' + test_data_credentials.accessToken
                },
                body: {
                    name: data.name,
                    gender: data.gender,
                    email: 7,
                    status: data.status
                },
                failOnStatusCode: false
        
            }).then((response) => {
                
              expect(response.status).to.eq(422);
              expect(response.statusText).to.eq("Unprocessable Entity");
              expect(response.body[0].field).to.eq("email");
              expect(response.body[0].message).to.eq("is invalid");
            });
        });
    });

    it('Should attempt to create a user with invalid input - empty gender', () => {
        
      cy.fixture('createuser').then((data) => {
          
          cy.api({
              method: 'POST',
              url: '/',
              
              headers: {
                  'Authorization': 'Bearer ' + test_data_credentials.accessToken
              },
              body: {
                  name: data.name,
                  gender: "",
                  email: test_data_credentials.email,
                  status: data.status
              },
              failOnStatusCode: false
      
          }).then((response) => {
              
            expect(response.status).to.eq(422);
            expect(response.statusText).to.eq("Unprocessable Entity");
            expect(response.body[0].field).to.eq("gender");
            expect(response.body[0].message).to.eq("can't be blank, can be male of female");
          });
        });
    });

    it('Should attempt to create a user without input', () => {
        
      cy.fixture('createuser').then((data) => {

          cy.api({
              method: 'POST',
              url: '/',
              
              headers: {
                  'Authorization': 'Bearer ' + test_data_credentials.accessToken
              },
              body: {
                  
              },
              failOnStatusCode: false
      
          }).then((response) => {
              
            expect(response.status).to.eq(422);
            expect(response.statusText).to.eq("Unprocessable Entity");
            expect(response.body[0].field).to.eq("email");
            expect(response.body[0].message).to.eq("can't be blank");
            expect(response.body[1].field).to.eq("name");
            expect(response.body[1].message).to.eq("can't be blank");
            expect(response.body[2].field).to.eq("gender");
            expect(response.body[2].message).to.eq("can't be blank, can be male of female");
            expect(response.body[3].field).to.eq("status");
            expect(response.body[3].message).to.eq("can't be blank");
           });
        });
    });

    it('Should attempt to create existing user', () => {
        
        cy.fixture('createputuser').then((data) => {
  
            cy.api({
                method: 'POST',
                url: '/',
                
                headers: {
                    'Authorization': 'Bearer ' + test_data_credentials.accessToken
                },
                body: data,
                failOnStatusCode: false
        
            }).then((response) => {
                
            expect(response.status).to.eq(422);
            expect(response.statusText).to.eq("Unprocessable Entity");
            expect(response.body[0].field).to.eq("email");
            expect(response.body[0].message).to.eq("has already been taken");
           });
        });
      })
    });
