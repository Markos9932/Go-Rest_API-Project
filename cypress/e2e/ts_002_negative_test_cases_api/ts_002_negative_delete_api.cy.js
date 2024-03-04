/// <reference types="Cypress" />

import test_data_credentials from '../../fixtures/data/credentials'

describe('Delete user - negative test cases', () => {

    it('Delete a nonexisting user', () => {

                cy.api({
                    method: 'DELETE',
                    url: '/' + test_data_credentials.nonExistingUserId, 
                    headers: {
                        'Authorization': 'Bearer ' + test_data_credentials.accessToken
                    },
                    failOnStatusCode: false,

                }).then((response) => {
                    expect(response.status).to.eq(404);
                    expect(response.statusText).to.eq("Not Found");
                    expect(response.body.message).to.eq("Resource not found");
                });
            });
        });

