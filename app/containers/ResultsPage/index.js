/**
 *
 * ResultsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Layout, Menu, Icon, Spin } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectResultsPage, makeSelectResults, makeSelectProfile, makeSelectLoading } from './selectors';
import reducer from './reducer';
import { getAssessmentsResults } from './actions';
import saga from './saga';
import messages from './messages';
import ResultsChart from '../../components/ResultsChart';
const { Header, Content, Footer, Sider } = Layout;

export class ResultsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    collapsed: false,
    completed: false,
  };

  componentDidMount() {
    this.props.loadAssessmentsResults();
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const { individualResults, individualProfile, loading } = this.props;
    const cardTitle = individualProfile ? individualProfile.header : 'Results';
    const cardSubtitle = individualProfile ? individualProfile.subHeader : 'Results';
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="1" onClick>
              <Link to="/">
                <Icon type="setting" />
                <span>Assessments</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/">
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
              <Card style={{ width: '100%', marginTop: 20 }} bodyStyle={{ padding: 10 }}>
                <div>
                  <h3>{cardTitle}</h3>
                  <p>{cardSubtitle}</p>
                </div>
                <div><ResultsChart data={individualResults} /></div>
              </Card>
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

ResultsPage.propTypes = {
  loadAssessmentsResults: PropTypes.func,
  individualResults: PropTypes.object,
  individualProfile: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  resultspage: makeSelectResultsPage(),
  individualResults: makeSelectResults(),
  individualProfile: makeSelectProfile(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadAssessmentsResults: () => dispatch(getAssessmentsResults()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resultsPage', reducer });
const withSaga = injectSaga({ key: 'resultsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResultsPage);
