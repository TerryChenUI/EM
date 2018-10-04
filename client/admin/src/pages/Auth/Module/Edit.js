import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Spin } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ModuleForm from './Form';
import { transformTree } from '@/utils';

@connect(state => ({
  pageModel: state.authModule,
  loading:
    state.loading.effects['authModule/fetchCurrent'] ||
    state.loading.effects['authModule/fetchModuleTree'] ||
    false,
}))
class ModuleEdit extends PureComponent {
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
        type: 'authModule/fetchCurrent',
        payload: id,
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'authModule/resetCurrent',
    });
  }

  render() {
    const {
      match: {
        params: { id },
      },
      pageModel: { current, systemTree },
      loading,
    } = this.props;
    const title = id ? '编辑模块' : '添加模块';
    const treeData = transformTree(systemTree);

    return (
      <PageHeaderWrapper title={title}>
        <Card bordered={false}>
          <Spin spinning={loading} tip="加载中...">
            <ModuleForm isEdit={!!id} data={current} treeData={treeData} />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ModuleEdit;
