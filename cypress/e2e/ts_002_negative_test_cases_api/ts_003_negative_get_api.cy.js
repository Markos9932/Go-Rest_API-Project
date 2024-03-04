/// <reference types="Cypress" />

import test_data_credentials from '../../fixtures/data/credentials'

describe('Get user - negative test cases ', () => {

    it('create and get user with token', () => {
        
       cy.fixture('createuser').then((data) =>{
            
                     cy.api({
                        method: 'GET',
                        url: '/'+ test_data_credentials.existingUserId,
                        headers: {
                            'Authorization': 'Bearer ' + test_data_credentials.invalidToken
                        },
                        failOnStatusCode: false

                    }).then((response)=>{
                        expect(response.status).to.eq(401),
                        expect(response.statusText).to.eq('Unauthorized');
                        expect(response.body.message).to.eq("Invalid token");
                      });
                  });
               });
            });
