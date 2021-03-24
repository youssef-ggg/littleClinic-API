const faker = require('faker');

const makeUpdatePatient = require('./updatePatient.js');
const jwtAuthorization = require ('../../jwtAuthorization');
const makeFakePatient = require('../../__test__/fixtures/patient.js');

describe('update user controller',()=>{

    const {jwtVerifyToken} = jwtAuthorization;
    it('wrong jwt authorization',async ()=>{
       
        const updatePatient = makeUpdatePatient({editPatient:c=>c,jwtVerifyToken});
        const fakePatient = makeFakePatient();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:fakePatient
        }
        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{error:'forbidden.'}
        }
        const actual = await updatePatient(request);
       
        expect(actual).toEqual(expected);
    });

    it('update successfull request',async ()=>{
        
        const fakePatient = makeFakePatient();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:fakePatient.id
            },
            body:fakePatient
        }
        const updatePaitent = makeUpdatePatient({
            editPatient:(fakePatient)=>fakePatient,
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
            body:fakePatient
        }
        const actual = await updatePaitent(request);
        expect(actual).toEqual(expected);  
    });

    it('reports updated patient errors',async ()=>{
        const updatePatient = makeUpdatePatient({
            editPatient: () => {
              throw Error('BOOM!')
            },
            jwtVerifyToken:request=>true
          })
          const fakePatient = makeFakePatient();
          const request = {
            headers: {
              'Content-Type': 'application/json',
            },
            params:{
                id:fakePatient.id
            },
            body: fakePatient
          }
          const expected = {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 400,
            body: { error: 'BOOM!' }
          };
          const actual = await updatePatient(request);
          expect(actual).toEqual(expected);
    });

    it('reports can\'t find patient ',async ()=>{
        const updatePatient = makeUpdatePatient({
            editPatient: () => {
              throw RangeError('BOOM!')
            },
            jwtVerifyToken:request=>true
          })
          const fakePatient = makeFakePatient();
          const request = {
            headers: {
              'Content-Type': 'application/json',
            },
            params:{
                id:fakePatient.id
            },
            body: fakePatient
          }
          const expected = {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 404,
            body: { error: 'BOOM!' }
          };
          const actual = await updatePatient(request);
          expect(actual).toEqual(expected);
    });
});