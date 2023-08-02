const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

  // Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/reviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

  const reviewSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Create a review model based on the schema
  const Review = mongoose.model('Review', reviewSchema);

// Define routes and middleware here

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.use(express.static('public'));
app.post('/api/reviews', (req, res) => {
  const reviewData = req.body;
  const review = new Review(reviewData);

  // Validate the review data
  if (!isValidReview(review)) {
    res.status(400).json({ error: 'Invalid review data.' });
    return;
  }


  // Process the valid review data and store it in the database
  review.save()
      .then(() => {
        res.status(201).json({ message: 'Review saved successfully!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to save review.' });
  
  
      });

  res.status(201).json({ message: 'Review submitted successfully!' });
  });

  function isValidReview(review) {
    // Check if the title and content fields exist and are non-empty strings
    if (!review.title || typeof review.title !== 'string' || !review.title.trim()) {
      return false;
    }
  
    if (!review.content || typeof review.content !== 'string' || !review.content.trim()) {
      return false;
    }
  
    // Add additional validation rules if needed
  
    return true; // Return true if all validation rules pass
  }

  app.get('/api/reviews', (req, res) => {
    // Retrieve the list of reviews from the database
    Review.find()
      .then((reviews) => {
        res.status(200).json(reviews);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve reviews.' });
      });
  });

    



