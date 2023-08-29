import React, { useState } from 'react';
import { BsStarFill } from "react-icons/bs"
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';







const reviewsData = [
    {
        rating: 5,
        name: "Elliot",
        date: "January 3, 2023",
        text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
        id: "1",
    },
    {
        rating: 5,
        name: "Sandy",
        date: "December 12, 2022",
        text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
        id: "2",
    },
]




export default function Reviews() {
    const [addReview, setAddReview] = React.useState(false)  
    const [reviewVisivle, setreviewVisivle] = React.useState(true)  
    const [reviews, setReviews] = useState(reviewsData);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState('');

    
    const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const year = currentDate.getFullYear()
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  
  console.log(reviews)


  

    const ReviewChart = () => {

       
      
        const handleAddReview = () => {
          const newReview = {
            rating: parseInt(selectedOption),
            name,
            date: `${day} ${month} ${year}`,
            text,
            id: new Date().getTime(), // Assign a unique ID using timestamp
          }

          if(newReview.rating) {
            console.log(reviews)
            setreviewVisivle(false)
            setReviews([...reviews, newReview]);
            setRating('');
            setName('');
            setText('');
          }
        };
      




         
  if(reviewVisivle) {
    return (

          

          
      <div className='review-adding'>
       
       
        <select value={selectedOption} onChange={handleOptionChange} >
        <option value="" disabled>
          Rate us
        </option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>

</select>
        
        <input
        className='review-adding-name'
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
        className='review-adding-text'
          type="text"
          placeholder="Text"
          value={text}
          onChange={e => setText(e.target.value)}

        />
         <p>
         <button onClick={handleAddReview}>Add Review</button>
        </p>
      </div>
    );
  };

  }

 
        
   
    
    
    
    

  function addReviewToggle() {
    return ( setAddReview(!addReview)  
)
  }
    



    const userRatings = reviews.map(rate => rate.rating); // Example user ratings data

    function calculateAverageRating(ratings) {
  if (ratings.length === 0) {
    return 0; // Return 0 if there are no ratings
  }

  const totalRatings = ratings.length;
  const sumOfRatings = ratings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = sumOfRatings / totalRatings;
  return averageRating.toFixed(1); // Return average rounded to 2 decimal places
}

// Example usage
const averageRating = calculateAverageRating(userRatings);
console.log(`Average Rating: ${averageRating}`);



    // Calculate rating percentages
    const ratingCounts = userRatings.reduce((counts, rating) => {
      counts[rating] = (counts[rating] || 0) + 1;
      return counts;
    }, {});
    const totalRatings = userRatings.length;
    const ratingPercentages = {};
    for (const rating in ratingCounts) {
      ratingPercentages[rating] = (ratingCounts[rating] / totalRatings) * 100;






    }





    

    const RatingGraph = ({ ratingPercentages, barColor }) => {
  



        return (
          <div>
            <VictoryChart
              theme={VictoryTheme.material}
              domain={{ y: [0, 100] }}
             
               
            >
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={x => `${x}`}
              />
              <VictoryAxis
                dependentAxis
                tickValues={[0, 20, 40, 60, 80, 100]} // Y-axis tick values for percentages
                tickFormat={tick => `${tick}%`} // Format ticks as percentages
              />
              <VictoryBar
                data={Object.keys(ratingPercentages).map(rating => ({
                  rating: parseInt(rating),
                  percentage: parseFloat(ratingPercentages[rating]),
                }))}
                x="rating"
                y="percentage"
                style={{
                    data: {
                      fill: barColor || 'steelblue', // Use the specified color or default to steelblue
                    },
                  }}
              />
            </VictoryChart>            
          </div>
        );
      };
 





    
    return (
       


        <section className="host-reviews">
            <div className="top-text">
                <h2>Your reviews</h2>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>
            <div className="rating-bar">
      <h1>{averageRating} <BsStarFill className="review-star"/> overall rating</h1>
      <RatingGraph ratingPercentages={ratingPercentages}  barColor="#ff8c38"/>
    </div>
            <h3>Reviews (2)</h3>
            {reviews.map((review) => (
                <div key={review.id}>
                    <div className="review">
                        {[...Array(review.rating)].map((_, i) => (
                            <BsStarFill className="review-star" key={i} />
                        ))}
                        <div className="info">
                            <p className="name">{review.name}</p>
                            <p className="date">{review.date}</p>
                        </div>
                        <p>{review.text}</p>
                    </div>
                    <hr />
                    
                </div>
            ))}
            {reviewVisivle && <div className="review">
                        <div className="info">
                            <p className="name"><BsStarFill className="review-star"/>Add your review <BsStarFill className="review-star"/></p>
                            <p className="date"></p>
                        </div>
                        <p className='review-add' onClick={addReviewToggle}>{addReview ? "Hide" : "Click there"}</p>
                    </div> }
                   {addReview ? ReviewChart() : null }   
        </section>
    )
}