import {model, Schema} from "mongoose"

const userSchema = new Schema({
    email:{type: String, required: true, unique: true},
    password: {type:String, required: true},
});

const User = new model('User',userSchema);

export default User;