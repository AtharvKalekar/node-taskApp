const request = require('supertest')
const index = require('../src/index')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const userOne ={
    _id: userOneId,
    name:'Mike',
    email:'mike@example.com',
    password:'56what!!',
    tokens:[{
        token:jwt.sign({_id:userOneId},'thisismysecretkey')
    }]
}


beforeEach(()=>{
    console.log('before Each ');
})

test('Should sign up a new user',async()=>{
     await request(index).post('/users').send({
        name:'Andrew',
        email:'andrew@example.com',
        password:'MyPaass777!'
     }).expect(200)
})

test("Should get profile for user", async()=>{
    await request(index)
    .get('/users/me')
    .set('Authorzation', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})