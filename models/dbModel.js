import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required:[true,"Please provide a Firstname"],
        unique: false,
    },
    Lastname: {
        type: String,
        unique: false,
    },
    Email: {
        type: String,
        required:[true,"Please provide a Email"],
        unique:true,
    },
    Password: {
        type: String,
        unique: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    CartList: {
        type: Array,
        default: []
    },
    WishList: {
        type: Array,
        default: []
    }
})
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;