
//const { type } = require('@testing-library/user-event/dist/type')
const mongoose=require('mongoose');
const {Schema}= mongoose;

const UserSchema = new Schema({

    bookname: {type: String, required: true},
    isbn: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
});

module.exports= mongoose.model('book', UserSchema);

