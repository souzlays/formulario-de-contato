import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true }, 
    consulta: { type: String, required: true },  
    message: { type: String, required: true },   
    acceptContact: { type: Boolean, required: true }
});

const formData = mongoose.model('FormData', formDataSchema);
export default formData;