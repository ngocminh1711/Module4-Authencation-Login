import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: String,
    password: String,
    google: {
        id: {
            type: String
        },
    }
})

const UserModel = model('User', userSchema);

export { UserModel}