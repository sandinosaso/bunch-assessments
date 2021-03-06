import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Spin } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectHomePage, makeSelectAssessmentQuestions, makeSelectAssessmentResults, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { QuestionPropType } from '../../lib/PropTypesValues';
import { formatAndNormalizeQuestions } from '../../lib/util';
import { saveAssessment, getAssessmentQuestions } from './actions';
import messages from './messages';
import WizardForm from '../../components/WizardForm';

const { Header, Content, Footer, Sider } = Layout;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    collapsed: false,
    completed: false,
  };
  componentDidMount() {
    this.props.loadAssessmentQuestions();
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  onComplete = (values) => {
    this.setState({ completed: true });
    this.props.saveAssessment(values.toJS());
  }
  render() {
    const { questions, results, loading } = this.props;

    const assessmentQuestions = formatAndNormalizeQuestions(questions);

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="setting" />
                <span>Assessments</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/results">
                <Icon type="desktop" />
                <span>Results</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 20px' }}>
            <h3>
              <FormattedMessage {...messages.header} />
            </h3>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Spin spinning={loading} size="large">
              <WizardForm
                onComplete={this.onComplete}
                questions={assessmentQuestions}
                completed={this.state.completed}
                results={results}
              />
            </Spin>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Bunch.ai Assessments. Thanks to Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


HomePage.propTypes = {
  saveAssessment: PropTypes.func,
  loadAssessmentQuestions: PropTypes.func,
  questions: PropTypes.arrayOf(
    QuestionPropType
  ),
  results: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  results: makeSelectAssessmentResults(),
  questions: makeSelectAssessmentQuestions(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveAssessment: (answers) => dispatch(saveAssessment(answers)),
    loadAssessmentQuestions: () => dispatch(getAssessmentQuestions()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
