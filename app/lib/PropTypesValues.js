// File lib/PropTypeValues.js
import PropTypes from 'prop-types';

const QuestionPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
});

export {
  QuestionPropType,
};
