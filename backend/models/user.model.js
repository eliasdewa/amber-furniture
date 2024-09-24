import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  cartData: {type: Object, default: {}}
}, { minimize: false }); // minimize because whenever we will create the cart object by default we have provided the value empty object

const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;