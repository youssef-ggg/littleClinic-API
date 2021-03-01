const faker = require('faker');
const argon2 = require('argon2');

const makeUpdateUserPass = require('./updateUserPass.js');
const jwtAuthorization = require ('../../jwtAuthorization');
const makeFakeUser = require('../../__test__/fixtures/user.js');

describe('update user password controller',()=>{

    const {jwtVerifyToken} = jwtAuthorization;
    it('wrong jwt authorization',async ()=>{
        const updateUserPass = makeUpdateUserPass({editUserPassword:c=>c,jwtVerifyToken});
        const fakeUserPassInfo = {
            id:faker.random.uuid(),
            oldPassword:'12345678',
            password:'12365487'
        };
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:fakeUserPassInfo
        }
        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{error:'forbidden.'}
        }
        const actual = await updateUserPass(request);
        expect(actual).toEqual(expected);
    });

    it('update password successfull request',async ()=>{
        
        const id = faker.random.uuid();
        const hashedPassword = await argon2.hash('12345687');
        const fakeUser = makeFakeUser({id,password:'12345687',
            oldPassword:'12345678',hashedPassword});
        const {oldPassword,password,...fakeUserReturn} = fakeUser;
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id
            },
            body:fakeUser
        }
        const updateUserPass = makeUpdateUserPass({
            editUserPassword:userEditPass=>{
                const {oldPassword,password,...userEditedPass} = userEditPass ;
                return userEditedPass;
            },
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
            body:{user:{id,...fakeUserReturn}}
        }
        const actual = await updateUserPass(request);

        expect(actual).toEqual(expected);  
    });
});