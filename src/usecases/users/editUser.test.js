const {ObjectID} = require('mongodb');
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
        const {username,password,...editData} = userToEdit;
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
        const {username,password,...editData} = userToEdit;
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
        const {username,password,...editData} = userToEdit;
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
        const {username,password,...editData} = userToEdit;
        
        expect(editUser(editData)).rejects.toThrow('Empty access rights supplied.');
    });
    xit('this user doesn\'t exist.',async()=>{
        const fakeUser = makeFakeUser({id:123});
        const editUser = makeEditUser({usersCollection});

        const {username,password,...editData} = fakeUser;

        expect(editUser(editData)).rejects.toEqual(Error('user dosen\'t exist.'));
        
    });
    it('user modified',async()=>{

        const fakeUser = makeFakeUser();
        const editUser = makeEditUser({usersCollection});
        const addUser = makeAddUser({usersCollection});

        const inserted = await addUser(fakeUser);
        const {id} = inserted;
        let {name,occupation,accessRights} = inserted;
        
        name = faker.name.findName();
        occupation = faker.name.jobType();
        accessRights = [faker.name.jobType()];
        
        const edited = await editUser({id,name,occupation,accessRights});
        
        
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