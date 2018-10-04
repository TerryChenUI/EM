import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Spin } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UserForm from './Form';

@connect(state => ({
  pageModel: state.authUser,
  roles: state.authRole.list,
  loading: state.loading.effects['authUser/fetchCurrent'] || false,
}))
class UserEdit extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      dispatch,
    } = this.props;

    dispatch({
      type: 'authRole/fetch',
    });

    if (id) {
      dispatch({
        type: 'authUser/fetchCurrent',
        payload: id,
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'authUser/resetCurrent',
    });
  }

  render() {
    const {
      match: {
        params: { id },
      },
      pageModel: { current },
      roles,
      loading,
    } = this.props;
    const title = id ? '编辑用户' : '添加用户';

    return (
      <PageHeaderWrapper title={title}>
        <Card bordered={false}>
          <Spin spinning={loading} tip="加载中...">
            <UserForm isEdit={!!id} data={current} roles={roles} />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserEdit;
