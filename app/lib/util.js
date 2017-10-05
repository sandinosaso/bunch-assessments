const calculateAssessmentMetrics = (answers) => {
  const resultObject = {};
  Object.values(answers).map((answer) => {
    resultObject[answer] = !resultObject[answer] ? 1 : resultObject[answer] + 1;
    return resultObject;
  });

  return resultObject;
};

const dimensionsToChartData = (dimensions) => Object.keys(dimensions).map((key) => {
  const obj = {
    dimension: key,
    value: dimensions[key],
    fullMark: 10,
  };
  return obj;
});

const formatAndNormalizeQuestions = (questions) => questions.map((question, index) => {
  const page = index + 1;
  return {
    id: `Question_${index}`,
    page,
    name: `Question_${index}`,
    type: 'radio',
    options: question.options.map((option) => {
      const newOption = { label: option.text, value: option.dimension };
      return newOption;
    }),
  };
});

export {
  calculateAssessmentMetrics,
  dimensionsToChartData,
  formatAndNormalizeQuestions,
};
