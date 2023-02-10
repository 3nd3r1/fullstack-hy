const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name has to be at least 3 characters!'],
    required: [true, 'Name is required!'],
  },
  number: {
    type: String,
    validate: {
      validator: (num) => /\d{2,3}-\d+/.test(num),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minlength: [8, 'Phone number has to be atleast 8 characters!'],
    required: [true, 'Phone number is required!'],
  },
});

// En keksinyt tälle airbnb-eslint mukaista alternatiivia

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
