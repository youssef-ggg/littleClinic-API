const faker = require('faker');

const makeUpdateUser = require('./updateUser.js');
const jwtAuthorization = require ('../../jwtAuthorization');
const makeFakeUser = require('../../__test__/fixtures/user.js');

describe('update user controller',()=>{

    const {jwtVerifyToken} = jwtAuthorization;
    it('wrong jwt authorization',async ()=>{
        const updateUser = makeUpdateUser({editUser:c=>c,jwtVerifyToken});
        const fakeUser = makeFakeUser({id:faker.random.uuid()});
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:fakeUser
        }
        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{error:'forbidden.'}
        }
        const actual = await updateUser(request);
        expect(actual).toEqual(expected);
    });

    it('update successfull request',async ()=>{
        
        const fakeUser = makeFakeUser();
        const id = faker.random.uuid();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id
            },
            body:fakeUser
        }
        const updateUser = makeUpdateUser({
            editUser:(fakeUser)=>fakeUser,
            jwtVerifyToken:request=>{ 
                return {
                    statusCode:200
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:201,
            body:{user:{id,...fakeUser}}
        }
        const actual = await updateUser(request);

        expect(actual).toEqual(expected);  
    });

    it('reports updated users errors',async ()=>{
        const updateUser = makeUpdateUser({
            editUser: () => {
              throw Error('BOOM!')
            },
            jwtVerifyToken:request=>true
          })
          const fakeUser = makeFakeUser();
          const request = {
            headers: {
              'Content-Type': 'application/json',
            },
            params:{
                id:faker.random.uuid()
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
          const actual = await updateUser(request);
          expect(actual).toEqual(expected);
    });
});