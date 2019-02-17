import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Spin } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CategoryForm from './Form';

@connect(state => ({
  pageModel: state.category,
  loading: state.loading.effects['category/fetchCurrent'] || false
}))
class CategoryEdit extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      dispatch,
    } = this.props;

    if (id) {
      dispatch({
        type: 'category/fetchCurrent',
        payload: id,
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'category/resetCurrent',
    });
  }

  render() {
    const {
      match: {
        params: { id },
      },
      pageModel: { current },
      loading,
    } = this.props;
    const title = id ? '编辑分类' : '添加分类';

    return (
      <PageHeaderWrapper title={title}>
        <Card bordered={false}>
          <Spin spinning={loading} tip="加载中...">
            <CategoryForm isEdit={!!id} data={current}/>
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CategoryEdit;
