document.addEventListener('DOMContentLoaded', function() {
    // Select form elements
    const reviewText = document.getElementById('review-text');
    const rating = document.getElementById('rating');
    const submitBtn = document.getElementById('submit-btn');
  
    // Add form submission event listener
    submitBtn.addEventListener('click', function(event) {
      // Prevent form submission
      event.preventDefault();
  
      // Perform validation
      if (reviewText.value.length < 10) {
        alert('Please enter a review with at least 10 characters.');
      } else if (rating.value < 1 || rating.value > 5) {
        alert('Please select a rating between 1 and 5.');
      } else {
        // Validation passed, submit the form
        event.target.closest('form').submit();
      }
    });
    
    const reviews = [
        {
          review: "Great product! Highly recommended.",
          rating: 5
        },
        {
          review: "Average product. Could be better.",
          rating: 3
        },
        // Add more review objects as needed
      ];
    const reviewList = document.getElementById('review-list');

  // Iterate over the reviews array
  reviews.forEach(function(review) {
    // Create a new review element
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');

    // Create elements for review text and rating
    const reviewTextElement = document.createElement('p');
    reviewTextElement.textContent = review.review;

    const ratingElement = document.createElement('p');
    ratingElement.textContent = `Rating: ${review.rating}`;

    // Append the elements to the review container
    reviewElement.appendChild(reviewTextElement);
    reviewElement.appendChild(ratingElement);

    // Append the review element to the review list container
    reviewList.appendChild(reviewElement);
  });
  });