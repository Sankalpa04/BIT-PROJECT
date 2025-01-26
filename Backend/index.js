const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/model/User');
const upload = require('./src/utils/uploadimage');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv')
const Hotel = require('./src/model/Hotel')
const path = require('path');
const Contact = require('./src/model/Contact')
dotenv.config()

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // allow requests only from this domain
  methods: 'GET,POST,PUT,PATCH,DELETE', // allow specific HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // allow specific headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));



mongoose.connect('mongodb://localhost:27017/OhoNepal', {
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Signup route
app.get('/', (req, res) => {
    res.json({ message: 'Hello, this is a JSON response!' });
  });

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role:newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } 
    );

    res.status(200).json({ message: 'user signup successful', token });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/hotel', upload.single('image'), async (req, res) => {
  try {
    // const {  } = req.body;
    const roomData = new Hotel({
      ...req.body,
      image: req.file ? `${req.file.filename}` : null,
    });

    const savedRoom = await roomData.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/hotel', async (req, res) => {
  try {
    const rooms = await Hotel.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single room by ID
app.get('/hotel/:id', async (req, res) => {
  try {
    const room = await Hotel.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/hotel/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, address, description, price, offerPrice } = req.body;

    const roomData = await Hotel.findById(req.params.id);
    if (!roomData) return res.status(404).json({ error: 'Room not found' });

    roomData.name = name || roomData.name;
    roomData.address = address || roomData.address;
    roomData.description = description || roomData.description;
    roomData.price = price || roomData.price;
    roomData.offerPrice = offerPrice || roomData.offerPrice;
    
    if (req.file) {
      roomData.image = `/uploads/${req.file.filename}`;
    }

    const updatedRoom = await roomData.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/hotel/:id', async (req, res) => {
  try {
    const room = await Hotel.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/contact', async (req, res) => {
  try {
    console.log(req.body,'inside')
    const { name, email, phone, message } = req.body;
    const newContact = Contact.create({})
    console.log(newContact,'contacttt')

    res.status(200).json({ message: 'Contact form submitted successfully', data: newContact });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route to fetch all contact form submissions
app.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});