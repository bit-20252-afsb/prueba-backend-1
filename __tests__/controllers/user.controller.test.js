import {afterEach, expect, it, jest} from '@jest/globals';
const saveMock = jest.fn();
jest.unstable_mockModule('../../src/models/user.model.js', () => {
    const mockConstructor = jest.fn(() => ({ save: saveMock}));
    mockConstructor.findOne = jest.fn();
    mockConstructor.find = jest.fn();
    return { default: mockConstructor };
});

const {getAllUsers, createUser} = await import('../../src/controller/user.controller.js');
const User = (await import('../../src/models/user.model.js')).default;

let emptyReqMock, res, mockEmail, emptyBodyReqMock, reqMock;
beforeAll(()=>{
    mockEmail = 'a@a.com'
    emptyReqMock = {};
    emptyBodyReqMock = {body:{}}
    reqMock = {body: {email: mockEmail, password: 'test-password'}}
    res = {
            status: jest.fn().mockReturnThis() ,
            json: jest.fn()
        }
})

afterEach( ()=> {
    User.find.mockClear()
})

describe('Get All Users', () => {
    it('Debería retornar un status 200 y la lista de los usuarios', async () =>{
        // Arrange
        const mockUserList = [];
        const mockFilterDB = {}
        // Act 
        // llamar al metodo del controlador
        User.find.mockResolvedValue(mockUserList);
        await getAllUsers(emptyReqMock,res);
        // Assert
        expect(User.find).toHaveBeenCalledWith(mockFilterDB);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUserList);
    });
    
    it('Debería retornar un status 500 si ocurre un error de conexión con la BD', async () => {
        // Arrange
        // Ya se hizo globalmente la creación de las variables
        const dbErrorMock = new Error('Error en BD');
        // Act
        User.find.mockRejectedValue(dbErrorMock);
        await getAllUsers(emptyReqMock,res);
        // const spy = jest.spyOn(console, "error").mockImplementation(()=>{})
        // Assert
        expect(User.find).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith(dbErrorMock)
        // spy.mockRestore()
    })
})

describe('Create Users', () => {
    it('Debería retornar un status 201 y crear un usuario', async () => {
        // Arrange

        const mockCreateSuccessResponse = {detail: `La cuenta con ${mockEmail} se creó satisfactoriamente`};
        // Act
        User.findOne.mockResolvedValue(null);
        saveMock.mockClear();
        await createUser(reqMock,res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCreateSuccessResponse);
    });

    it('Debería retornar un 400 validando los campos del body', async () => {
        // Arrange
        // Act
        await createUser(emptyBodyReqMock,res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(400)
    })

    it('Debería retornar un 400 cuando existe el usuario en base de datos', async ()=>{
        // Arrange
        const userInDBMock = {
            detail: `El ${mockEmail} ya se encuentra en uso`
        }
        // Act
        User.findOne.mockResolvedValue({email: mockEmail})
        await createUser(reqMock,res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(userInDBMock)
    })
})