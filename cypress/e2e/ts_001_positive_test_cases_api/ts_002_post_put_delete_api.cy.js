/// <reference types="Cypress" />

import test_data_credentials from '../../fixtures/data/credentials'

describe('post user request - positive test cases', () => {

    it('create, put, and delete user', () => {
        
        cy.fixture('createuser').then((data) => {
            
            // 1. create user (POST)
            cy.api({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {
                    'Authorization': 'Bearer ' + test_data_credentials.accessToken
                },
                body: {
                    name: data.name,
                    gender: data.gender,
                    email: test_data_credentials.email,
                    status: data.status
                }
            }).then((response) => {
                
                expect(response.status).to.eq(201);
                expect(response.body.email).to.eq(test_data_credentials.email);
                expect(response.body.name).to.eq(data.name);
                expect(response.body.gender).to.eq(data.gender);
                expect(response.body.status).to.eq(data.status);

            }).then((response) => {
                const userId = response.body.id;

                // 2. update user (PUT)
                cy.api({
                    method: 'PUT',
                    url: 'https://gorest.co.in/public/v2/users/' + userId, 
                    headers: {
                        'Authorization': 'Bearer ' + test_data_credentials.accessToken
                    },
                    body: {
                        name: "Ryan",
                        gender: "male"
                    }

                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.name).to.eq("Ryan");
                    expect(response.body.gender).to.eq("male");
                    expect(response.body.status).to.eq(data.status);
                    expect(response.body.email).to.eq(test_data_credentials.email);
                });

                // 3. delete user (DELETE)
                cy.api({
                    method: 'DELETE',
                    url: 'https://gorest.co.in/public/v2/users/' + userId, 
                    headers: {
                        'Authorization': 'Bearer ' + test_data_credentials.accessToken
                    }

                }).then((response) => {
                    expect(response.status).to.eq(204);
                });
            });
        });
    });
});
