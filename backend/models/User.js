const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  borrowedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"book",
    default:null
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
