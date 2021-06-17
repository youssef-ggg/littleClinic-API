const {ObjectID} = require('mongodb');
const faker = require('faker');
const argon2 = require('argon2');

const makeUserDbCollection = require('../../dataAcces/users');
const makeFakeUser = require('../../__test__/fixtures/user');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');

const makeEditUserPassword = require('./editUserPassword');
const makeAddUser = require('./addUser');

describe('edit user login',()=>{
    let usersCollection;
    beforeAll(()=>{
        usersCollection = makeUserDbCollection({makeDb,ObjectID});
    });

    it('Successfull password update',async ()=>{
        const fakeUser = makeFakeUser();
        const editUserPassword = makeEditUserPassword({usersCollection,argon2});
        const addUser = makeAddUser({usersCollection,argon2});

        const inserted = await addUser(fakeUser);
        const {id} = inserted;
        const {password} = fakeUser;
        const fakeNewPassword = '12365487';
        const updatedLoginData = {id,oldPassword:password,password:fakeNewPassword};
        const edited = await editUserPassword(updatedLoginData);
        const {hashedPassword,...editedUser} = edited;
        const passMatch = await argon2.verify(hashedPassword,password);
        const newPassMatch = await argon2.verify(hashedPassword,fakeNewPassword);

        expect(edited.id).toBe(inserted.id);
        expect(passMatch).toBe(false);
        expect(newPassMatch).toBe(true);
        
    });
    
    it('password must not be null or undefined.',()=>{
        const editUserPassword = makeEditUserPassword({
            usersCollection:{
                update:(user)=> {throw new Error('should not reach update') }
            },
            argon2:{
                hash:(hashedPassword,password)=>{throw new Error('should not enter argon\'s hash')}
            }
        });
        
        const userToEdit = makeFakeUser({id:faker.random.uuid,
            oldPassword:'12345678',password:null});
        expect(editUserPassword(userToEdit))
            .rejects.toThrow('password can\'t be null or undefined.');
    });

    it('password must not be less then eight characters.',()=>{
        const editUserPassword = makeEditUserPassword({
            usersCollection:{
                update:(user)=> {throw new Error('should not reach update') }
            },
            argon2:{
                hash:(hashedPassword,password)=>{throw new Error('should not enter argon\'s hash')}
            }
        });
        
        const userToEdit = makeFakeUser({id:faker.random.uuid,
            oldPassword:'12345678',
            password:faker.random.alphaNumeric({count:7})});
        expect(editUserPassword(userToEdit))
            .rejects.toThrow('password can\'t be less then eight characters.');
    });

    it('new password can\'t match old password',async ()=>{
        const fakeUser = makeFakeUser();
        const editUserPassword = makeEditUserPassword({usersCollection,argon2});
        const addUser = makeAddUser({usersCollection,argon2});

        const inserted = await addUser(fakeUser);
        const {id} = inserted;
        const {password} = fakeUser;
        const fakeNewPassword = '12345678';
        const updatedPasswordData = {id,oldPassword:password,password:fakeNewPassword};

        expect(editUserPassword(updatedPasswordData))
            .rejects.toEqual(Error('new password can\'t match the old password.'));
    });

    it ('this user dosen\'t exist ',async()=>{
        const fakeUser = makeFakeUser();
        const editUserPassword = makeEditUserPassword({usersCollection,argon2});

        const {id} = faker.random.uuid();
        const fakeNewPassword = '12365487';
        const updatedPasswordData = {id,oldPassword:fakeUser.password,password:fakeNewPassword};
        
        expect(editUserPassword(updatedPasswordData))
            .rejects.toEqual(Error('This user doesn\'t exist.'));
    });

    it('invalid old password ',async ()=>{
        const fakeUser = makeFakeUser();
        const editUserPassword = makeEditUserPassword({usersCollection,argon2});
        const addUser = makeAddUser({usersCollection,argon2});

        const inserted = await addUser(fakeUser);
        const {id} = inserted;
        const fakeNewPassword = '12365487';
        const updatedPasswordData = {id,oldPassword:'123657888',password:fakeNewPassword};
        
        expect(editUserPassword(updatedPasswordData))
            .rejects.toEqual(Error('old password is invalid.'));
        
    });

    afterAll(()=>{
        clearDb('users');
        closeDb();
    });

});