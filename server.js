const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config()

// MongoDB Atlas connection string
const mongoURI = process.env.MONGO_URI;

const port = 5000;

mongoose.connect('mongodb+srv://ioeserveruser:hvXjHwHKgWfZEF4k@cluster0.clj22dc.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas: ' + err);
  });

const dataSchema = new mongoose.Schema({
  serial: String,
  name: String,
  city: String,
  cgpa: String,
  phone: String,
});

const Data = mongoose.model('Data', dataSchema);

app.use(bodyParser.json());
app.use(cors());

app.get('/api/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.post('/api/data', async (req, res) => {
  const newRow = new Data(req.body);
  console.log(newRow);
  await newRow.save();
  res.json(newRow);
});

app.delete('/api/data/:id', async (req, res) => {
  const id = req.params.id;
  await Data.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
