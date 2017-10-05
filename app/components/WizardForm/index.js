/**
*
* WizardForm
*
*/

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Card, Col, Row, Progress } from 'antd';
import { QuestionPropType } from '../../lib/PropTypesValues';
import Assessment from '../Assessment';
import ResultsChart from '../ResultsChart';

const WizardContainer = styled.div`
  padding: 0.5em;
`;

const SuccessContainer = styled.div`
text-align: center;
margin: 1.5em;
`;

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }

  getQuestionForPage(page) {
    return this.props.questions.filter((question) => question.page === page);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onComplete, questions, completed, results } = this.props;
    const questionsInitialValues = questions.reduce((prevValue, currentValue) => {
      const newProps = {
        [`${currentValue.id}`]: false,
      };
      return Object.assign(newProps, prevValue);
    }, {});

    const { page } = this.state;
    const pageQuestions = this.getQuestionForPage(page);
    const handleSubmit = page === questions.length ? onComplete : this.nextPage;
    const progess = !completed ? Math.round(((page - 1) / questions.length) * 100) : 100;

    return (
      <WizardContainer>
        <Row type="flex" justify="center">
          <Col>
            <Progress type="circle" percent={progess} />
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={16}>
          <Col>
            {!completed &&
              <Assessment
                questions={pageQuestions}
                initialValues={questionsInitialValues}
                onSubmit={handleSubmit}
                previousPage={this.previousPage}
              />
            }
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={16}>
          <Col>
            {completed &&
              <SuccessContainer>
                <Card>
                  <div>
                    <div><Icon type="check" style={{ fontSize: 32, color: '#08c' }} /></div>
                    <h3>Information complete</h3>
                    <p>Thank you for completing the assessment.</p>
                  </div>
                </Card>
                <ResultsChart data={results} />
              </SuccessContainer>
            }
          </Col>
        </Row>
      </WizardContainer>
    );
  }
}

WizardForm.propTypes = {
  questions: PropTypes.arrayOf(
    QuestionPropType,
  ).isRequired,
  results: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default WizardForm;
