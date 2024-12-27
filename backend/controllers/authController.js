const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {isValidEmail} = require( '../helpers')
require('dotenv/config');


const saltRounds = 10;

const signup = async(req, res) => {
    //User/create
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltRounds)
        });

        if(user) res.send({message: "Usuário criado"})
        //precisa retornar o JWT apos criado

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

const signin = async(req, res) => {
    try {
        
        if(!req.body.email || !isValidEmail(req.body.email)) {
            return res.status(403).send({message: "Email inválido!"})
        }

        if(!req.body.password) {
            return res.status(403).send({message: "Senha vazia!"})
        }
        
        const userSearch = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!userSearch) {
            return res.status(404).send({message: "Usuário não encontrado!"})
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            userSearch.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Senha incorreta!"
            })
        }

        const token = jwt.sign({id: userSearch.id},
                                process.env.SECRET_KEY,
                                {
                                    algorithm: 'HS256',
                                    allowInsecureKeySizes: true,
                                    expiresIn: 86400, //24H 
                                });

        //TODO Token session
        //req.session.token = token;

        return res.status(200).send({
            message: "Usuário logado!",
            token: token,
            user : {id: userSearch.id,
                    email: userSearch.email,
            }
        })

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

const signout = async(req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

module.exports = {
    signup,
    signin,
    signout
}
