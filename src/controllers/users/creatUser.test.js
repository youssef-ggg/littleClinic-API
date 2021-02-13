const faker = require("faker");
const makeCreateUser = require('./createUser.js');
const makeFakeUser = require('../../__test__/fixtures/user.js');

describe('Create user controller',()=>{
    
    it('successfully creates a user',async()=>{
        const fakeUser = makeFakeUser();
        const fakeId = faker.random.uuid();
        fakeUser['id']  = fakeId;
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:fakeUser
        }
        const createUser = makeCreateUser({
            addUser:fakeUser=>{
                const {password,...createdUser} = fakeUser;
                return createdUser;
            },
            jwtVerifyToken:request=>{ 
                return {
                    statusCode:200
                }
            }
        });
        const {password,...expectUser}= fakeUser;
        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:201,
            body:{user:expectUser}
        }
        const actual = await createUser(request);
        expect(actual).toEqual(expected);      

    });

    it('wrong verification token',async()=>{
        const fakeUser = makeFakeUser();
        const fakeId = faker.random.uuid();
        fakeUser['id']  = fakeId;
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:fakeUser
        }
        const createUser = makeCreateUser({
            addUser:fakeUser=>{
                const {password,...createdUser} = fakeUser;
                return createdUser;
            },
            jwtVerifyToken:request=>{ 
                return {
                    statusCode:403,
                    body:{
                        error:'forbidden.'
                    }
                }
            }
        });
        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{error:'forbidden.'}
        }
        const actual = await createUser(request);
        expect(actual).toEqual(expected);
    });

    it('reports user errors',async()=>{
        const createUser = makeCreateUser({
            addUser: () => {
              throw Error('BOOM!')
            },
            jwtVerifyToken:request=>true
          })
          const fakeUser = makeFakeUser();
          const request = {
            headers: {
              'Content-Type': 'application/json',
            },
            body: fakeUser
          }
          const expected = {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 400,
            body: { error: 'BOOM!' }
          };
          const actual = await createUser(request);
          expect(actual).toEqual(expected);
    });
});