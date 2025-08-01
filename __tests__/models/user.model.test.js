import mongoose from "mongoose";
import User from "../../src/models/user.model.js";
import {afterAll, afterEach, beforeAll, describe, it} from '@jest/globals';
import {MongoMemoryServer} from "mongodb-memory-server";

let mongoServer, mockUser, mockObjUser;
beforeAll(async ()=> {
    mockObjUser = {email: 'a@a.com', password: 'test-password'}
    mockUser = new User(mockObjUser);
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async ()=> {
    await User.deleteMany();
});

describe('User model test', ()=>{
    it('Debería guardar un usuario correctamente', async ()=> {
        // Arrange
        // Act
        const savedUser = await mockUser.save();
        // Assert
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe('a@a.com');
        expect(savedUser.password).toBe('test-password');
    });

    it('Debería rechazar los emails duplicados', async ()=>{
        // Arrange

        // Act
        await User.create(mockObjUser);
        let err;
        try {
            await User.create(mockObjUser);
        } catch (error) {
            err = error;
        }
        // Assert
        expect(err).toBeDefined();
        expect(err.code).toBe(11000)
    })
})