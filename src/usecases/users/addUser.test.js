const {ObjectID} = require('mongodb');
const faker = require('faker');
const makeAddUser = require('./addUser');
const makeUserDbCollection = require('../../dataAcces/users');
const makeFakeUser = require('../../__test__/fixtures/user');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');


describe('add user',()=>{
    let usersCollection;
    beforeAll(()=>{
        usersCollection = makeUserDbCollection({makeDb,ObjectID});
    });

    it('must have a username',()=>{
        const addUser = makeAddUser({
            insert:()=>{
                throw new Error('should not reach insert');
            },
            findByUserName:()=>{
                throw new Error('should not reach find by');
            }
        });
        const user = makeFakeUser({username:null});

        expect(addUser(user)).rejects.toEqual(new Error('user must have a username.'));
    });
    
    it('username must be at least 3 characters.',()=>{
        const addUser = makeAddUser({
            insert:()=>{
                throw new Error('should not reach insert');
            },
            findByUserName:()=>{
                throw new Error('should not reach find by');
            }
        });
        const user = makeFakeUser({
            username:faker.random.alpha({count:2})
        });
        expect(addUser(user)).rejects.toEqual(new Error('username must be at least three characters.'));
    });
    it('username must not contain invalid charachters.',()=>{
        const addUser = makeAddUser({
            insert:()=>{
                throw new Error('should not reach insert');
            },
            findByUserName:()=>{
                throw new Error('should not reach find by');
            }
        });
        const user = makeFakeUser({username:'conosle()'});
        expect(addUser(user)).rejects.toEqual(new Error('username must not contain invalid characters.'));
    });
    it('user must have a name.',()=>{
        const addUser = makeAddUser({
            insert:()=>{
                throw new Error('should not reach insert');
            },
            findByUserName:()=>{
                throw new Error('should not reach find by');
            }
        });
        const user = makeFakeUser({name:null});

        expect(addUser(user)).rejects.toEqual(new Error('user must have a name.'));
    });
    it('user\'s name must be at least 3 characters.',()=>{
        const addUser = makeAddUser({
            insert:()=>{
                throw new Error('should not reach insert');
            },
            findByUserName:()=>{
                throw new Error('should not reach find by');
            }
        });
        const user = makeFakeUser({
            name:faker.random.alpha({count:2})
        });
        expect(addUser(user)).rejects.toEqual(new Error('name must be at least three characters.'));
    });
    it('user\'s name contain only letters.',()=>{
        const addUser = makeAddUser({
            insert:()=>{
                throw new Error('should not reach insert');
            },
            findByUserName:()=>{
                throw new Error('should not reach find by');
            }
        });
        const user = makeFakeUser({
            name:'asd-d0 0'
        });
        expect(addUser(user)).rejects.toEqual(new Error('name must not contain invalid characters.'));
    });
    it('user inserted in database.',async()=>{
        const newUser = makeFakeUser();
        const adduser = makeAddUser({usersCollection});
        const inserted = await adduser(newUser);
        
        const {id,hashedPassword,...restInserted} = inserted;
        const {password,...restNewUser} = newUser;
        expect(restInserted).toMatchObject(restNewUser);
        expect.stringContaining(id);
    });

    it('user already exists',async()=>{
        const newUser = makeFakeUser();
        const adduser = makeAddUser({usersCollection});
        const inserted = await adduser(newUser);
        const insertedTwice = await adduser(newUser);
        expect(insertedTwice).toMatchObject({
            statusCode:409,
            errorMessage:'This user Already Exists',
        });
    });
    afterAll(()=>{
        clearDb('users');
        closeDb();
    });
});