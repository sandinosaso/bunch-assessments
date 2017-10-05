/**
*
* ResultsChart
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { dimensionsToChartData } from '../../lib/util';

const ResultsChart = (props) => {
  const { data } = props;
  if (!data) {
    return <div />;
  }
  const chartData = dimensionsToChartData(data);
  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={chartData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="dimension" />
      <PolarRadiusAxis />
      <Radar name="Sandino" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
};

ResultsChart.propTypes = {
  data: PropTypes.array,
};

export default ResultsChart;
