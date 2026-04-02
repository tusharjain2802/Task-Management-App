// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');  
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(express.json());  
app.use(cors());  

// Connect to MongoDB
connectDB(); 

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Task Management API');
});

const PORT = process.env.PORT || 4000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
