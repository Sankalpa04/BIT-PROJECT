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
const Booking = require('./src/model/Booking')
const sendEmail = require('./src/utils/email')
dotenv.config()

const stripe = require('stripe')
const secretKey = process.env.SECRET_STRIPE_KEY;
console.log(secretKey,'secret key')
const stripeInstance = new stripe(secretKey);

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
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );
    const data = {
      name: user.name,
      email: user.email,
      role: user.role,
      token
    }
    

    res.status(200).json({ message: 'Login successful',data});
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  
app.get('/user', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/hotel', upload.single('image'), async (req, res) => {
  try {
    // const {  } = req.body;
    console.log('inside hotel')
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
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Case-insensitive search for hotel name
          { location: { $regex: search, $options: 'i' } } // Case-insensitive search for location
        ]
      };
    }

    const rooms = await Hotel.find(filter);
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
    const data = req.body
    const { name, email,message } = req.body;
    console.log(req.body,'req.body')
    const newContact = new Contact({
      name,
      email,
      message
    })
   await newContact.save()
   console.log('success')
   sendEmail({
      to: email,
      subject: 'New Contact Form Submission',
      name:data.name,
      message:data.message,
      title:'Form submission',
      template: 'contact',
  }),
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

app.post('/hotel/book', async (req, res) => {
  try {
    console.log(req.body,'body data')
    const userId = '6796fd0c78b626b8cc9d36c6';
    const { date, id } = req.body; // Get the booking date and userId from the request body

    // Step 1: Fetch the hotel details from the database
    const hotel = await Hotel.findById(id);
    console.log(hotel,'hotel details')
    if (!hotel) {
      return res.status(404).send({ message: 'Hotel not found' });
    }

    // Step 2: Save the booking details in the database
    const booking = new Booking({
      hotelId: id,
      userId,
      bookingDates:date,
    });
    await booking.save();

  console.log('saved successfully')
    // Step 3: Create a Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // You can change this to your preferred currency
            product_data: {
              name: hotel.name,
              description: hotel.description,
              // price: hotel.price,
              // offerPrice: hotel.offerPrice
            },
            unit_amount: hotel.offerPrice * 100, // Stripe requires amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`, // Update this with your frontend success page URL
      cancel_url: `http://localhost:5173/cancel`, // Update this with your frontend cancel page URL
    });

    // Step 4: Respond with the Stripe session ID
    res.send({ sessionId: session.id });
  } catch (error) {
    console.error('Error booking hotel:', error);
    res.status(500).send({ message: 'Error booking hotel' });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});