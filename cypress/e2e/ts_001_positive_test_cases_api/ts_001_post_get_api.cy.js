/// <reference types="Cypress" />

import test_data_credentials from '../../fixtures/data/credentials'

describe('post user request - positive test cases', () => {

    it('create and get user with token', () =>{
        
       cy.fixture('createuser').then((data) =>{
            
            //1. create user (POST)
            cy.api({
                method: 'POST',
                url: '/',
                headers: {
                    'Authorization': 'Bearer ' + test_data_credentials.accessToken
                },
                body: {
                    name: data.name,
                    gender: data.gender,
                    email: test_data_credentials.email,
                    status: data.status
                }
   
            }).then((response)=>{
                
                expect(response.status).to.eq(201),
                expect(response.body.email).to.eq(test_data_credentials.email),
                expect(response.body.name).to.eq(data.name),
                expect(response.body.gender).to.eq(data.gender),
                expect(response.body.status).to.eq(data.status)
                
            }).then((response) =>{
                   const userId = response.body.id 
                   
                    //2. get user (GET)
            cy.api({
                method: 'GET',
                url: '/'+userId,
                headers: {
                    'Authorization': 'Bearer ' + test_data_credentials.accessToken
                        }
                }).then((response)=>{
                    expect(response.status).to.eq(200),
                    expect(response.body.id).to.eq(userId),
                    expect(response.body.email).to.eq(test_data_credentials.email),
                    expect(response.body.name).to.eq(data.name),
                    expect(response.body.gender).to.eq(data.gender),
                    expect(response.body.status).to.eq(data.status)
                });
            });
        });
    });
});