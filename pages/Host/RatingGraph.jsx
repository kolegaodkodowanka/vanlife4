
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';






const RatingGraph = ({ ratingPercentages }) => {
  



  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{ y: [0, 100] }}
        width={300} 
        height={300} 
        
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
        />
      </VictoryChart>
    </div>
  );
};

export default RatingGraph;