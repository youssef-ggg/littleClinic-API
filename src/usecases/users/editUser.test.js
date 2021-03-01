const {ObjectID} = require('mongodb');
const argon2 = require('argon2');
const faker = require('faker');

const makeUserDbCollection = require('../../dataAcces/users');
const makeFakeUser = require('../../__test__/fixtures/user');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');

const makeEditUser = require('./editUser');
const makeAddUser = require('./addUser');

describe('edit user',()=>{
    let usersCollection;
    beforeAll(()=>{ 
        usersCollection = makeUserDbCollection({makeDb,ObjectID});
    });
    it('must include id',()=>{
        const editUser = makeEditUser({
            usersCollection: {
              update: () => {
                throw new Error('update should not have been called')
              }
            }
        });
        const userToEdit = makeFakeUser({id:null});
        expect(editUser(userToEdit)).rejects.toThrow('You must supply an id.');
    });
    it('must have a username.',()=>{
        const editUser = makeEditUser({
            usersCollection: {
                update: () => {
                  throw new Error('update should not have been called.')
                },
                findById: () => {
                    throw new Error('find by id should not have been called.')
                }
            }

        });
        const userToEdit = makeFakeUser({id:faker.random.uuid,username:null});
        const {password,...editData} = userToEdit;
        expect(editUser(editData)).rejects.toThrow('user must have a username.');
    });
    it('Empty name supplied.',()=>{
        const editUser = makeEditUser({
            usersCollection: {
                update: () => {
                  throw new Error('update should not have been called.')
                },
                findById: () => {
                    throw new Error('find by id should not have been called.')
                }
            }

        });
        const userToEdit = makeFakeUser({id:faker.random.uuid,name:null});
        const {password,...editData} = userToEdit;
        expect(editUser(editData)).rejects.toThrow('Empty name supplied.');
    });
    it('name must be at least three characters',()=>{
        const editUser = makeEditUser({
            usersCollection: {
                update: () => {
                  throw new Error('update should not have been called.')
                },
                findById: () => {
                    throw new Error('find by id should not have been called.')
                }
            }

        });
        const userToEdit = makeFakeUser({id:faker.random.uuid,name:faker.random.alpha({count:2})});
        const {password,...editData} = userToEdit;
        expect(editUser(editData)).rejects.toThrow('name must be at least three characters.');
    });
    
    it('name must not contain invalid characters.',()=>{
        const editUser = makeEditUser({
            usersCollection: {
                update: () => {
                  throw new Error('update should not have been called.')
                },
                findById: () => {
                    throw new Error('find by id should not have been called.')
                }
            }

        });
        const userToEdit = makeFakeUser({id:faker.random.uuid(),name:'asd-d0 0'});
        const {password,...editData} = userToEdit;
        expect(editUser(editData)).rejects.toThrow('name must not contain invalid characters.');

    });
    it('Empty access rights supplied.',async ()=>{
        const editUser = makeEditUser({
            usersCollection: {
                update: () => {
                  throw new Error('update should not have been called.')
                },
                findById: () => {
                    throw new Error('find by id should not have been called.')
                }
            }

        });
        const userToEdit = makeFakeUser({id:faker.random.uuid(),accessRights:[]});
        const {password,...editData} = userToEdit;
        
        expect(editUser(editData)).rejects.toThrow('Empty access rights supplied.');
    });
    xit('this user doesn\'t exist.',async()=>{
        const fakeUser = makeFakeUser({id:123});
        const editUser = makeEditUser({usersCollection});

        const {password,...editData} = fakeUser;

        expect(editUser(editData)).rejects.toEqual(Error('user dosen\'t exist.'));
        
    });
    it('user modified',async()=>{

        const fakeUser = makeFakeUser();
        const editUser = makeEditUser({usersCollection});
        const addUser = makeAddUser({usersCollection,argon2});

        const inserted = await addUser(fakeUser);
        const {id} = inserted;
        let {name,username,occupation,accessRights} = inserted;
        
        username = faker.internet.userName();
        name = faker.name.findName();
        occupation = faker.name.jobType();
        accessRights = [faker.name.jobType()];
        
        const edited = await editUser({id,username,name,occupation,accessRights});
        
        
        expect(edited.id).toBe(id);
        expect(edited.name).toBe(name);
        expect(edited.occupation).toBe(occupation);
        expect(edited.accessRights).toEqual(expect.arrayContaining(accessRights));
    });
    afterAll(()=>{
        clearDb('users');
        closeDb();
    });
});