import React, { Component } from 'react';
import { connect } from 'dva';

@connect(() => ({

}))
class Index extends Component {
  render() {
    return (
      <div>首页测试</div>
    );
  }
}

export default Index;
