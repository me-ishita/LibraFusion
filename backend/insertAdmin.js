
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/library4', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);


const insertAdmin = async () => {
  try {
    const email = 'admin@example.com';
    const username = 'admin';
    const password = 'admin123';
    const userType = 'admin';

    
    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin already exists');
      return;
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    user = new User({
      email,
      username,
      password: hashedPassword,
      userType,
    });

    
    await user.save();
    console.log('Admin inserted successfully');
  } catch (error) {
    console.error('Error inserting admin user:', error);
  } finally {
    
    mongoose.connection.close();
  }
};


insertAdmin();
