import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Spin } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RoleForm from './Form';
import { transformTree } from '@/utils';

@connect(state => ({
  pageModel: state.authRole,
  modules: state.authModule.systemTree,
  loading:
    state.loading.effects['authRole/fetchCurrent'] ||
    state.loading.effects['authRole/fetchModuleTree'] ||
    false,
}))
class RoleEdit extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      dispatch,
    } = this.props;

    dispatch({
      type: 'authModule/fetchModuleTree',
    });

    if (id) {
      dispatch({
        type: 'authRole/fetchCurrent',
        payload: id,
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'authRole/resetCurrent',
    });
  }

  render() {
    const {
      match: {
        params: { id },
      },
      pageModel: { current },
      modules,
      loading,
    } = this.props;
    const title = id ? '编辑角色' : '添加角色';

    const moduleTreeData = transformTree(modules);

    return (
      <PageHeaderWrapper title={title}>
        <Card bordered={false}>
          <Spin spinning={loading} tip="加载中...">
            <RoleForm isEdit={!!id} data={current} moduleTree={moduleTreeData} />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RoleEdit;
