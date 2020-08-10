const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /frequency endpoint', () => {
    it ('should generate an object', () => {
        return supertest(app)
            .get('/frequency') // invoke the endpoint
            .query({ s: 'aaBBAAbbaa' }) // send the query string ?s=aaBBAAbbaa
            .expect(200) // assert that you get a 200 OK status
            .expect('Content-Type', /json/) // assert that the content type is JSON
            .then(res => {
                // make sure you get an object
                expect(res.body).to.be.an('object');
                // assert that all keys returned
                expect(res.body).to.have.all.keys('count', 'average', 'highest', 'a', 'b');
                // assert the response matches the expected response
                expect(res.body).to.deep.equal({ 
                    count: 2,
                    average: 5,
                    highest: 'a',
                    'a': 6,
                    'b': 4
                })
            });
    })
});