import React from 'react';
import { connect } from 'dva';
import BasicLayout from './BasicLayout';

class ContainerLayout extends React.PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchMenu'
    });
  }

  render() {
    const { menu } = this.props;
    return (
      menu ? <BasicLayout {...this.props} /> : null
    );
  }
}

export default connect(({ global }) => ({
  menu: global.menu
}))(ContainerLayout);
