import Joi from 'joi'
import { Schema, model, connect } from 'mongoose';

interface IUser {
    name:string;
    email:string;
    password:string;
}

class User implements IUser{
    name: string;
    email: string;
    password: string;
    constructor(
        input: {
        name: string,
        email: string,
        password: string
    }) {
        this.name = input?.name
        this.email = input?.email
        this.password = input?.password

    }
}

const schema = new Schema<User>({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

function validateUser(user:User) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

export {IUser, User, validateUser};
