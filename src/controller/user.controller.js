import User from "../models/user.model.js";
import { generateToken } from "../util/jwt-generate.js";

export const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

export const createUser = async (req,res) => {
    try {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({
            detail:"Los campos email y contraseña son requeridos"
        });
    }
    const userInDB = await User.findOne({email: email});
    if(userInDB){
        res.status(400).json({
            detail:`El ${email} ya se encuentra en uso`
        });
    }
    const user = new User({
        email: email,
        password: password
    });
    //     const user = new User({
    //     email, password
    // });
    await user.save();

    res.status(201).json({
        detail: `La cuenta con ${email} se creó satisfactoriamente`
    });
    } catch (error) {
        res.status(500).json({
            detail:"Ocurrió un error en esta solicitud"
        })
    }
}

export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                detail:"Los campos email y contraseña son requeridos"
            });
        }
        const userInDB = await User.findOne({email: email});
        if(!userInDB){
            res.status(404).json({detail:`El email ${email} no se encuentra registrado`});
        }
        const isCorrectPassword = userInDB.password === password;
        if(!isCorrectPassword){
            res.status(400).json({detail: `Contraseña incorrecta`});
        }
        const userData={email}
        res.status(200).json({detail: "Usuario logeado correctamente",
            jwt: generateToken(userData)
        });

    } catch (error) {
        res.status(500).json({
            detail:"Ocurrió un error en esta solicitud"
        })
    }
}