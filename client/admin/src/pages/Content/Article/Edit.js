import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Spin } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ArticleForm from './Form';

@connect(state => ({
  pageModel: state.article,
  categories: state.category.list.data,
  loading:
    state.loading.effects['article/fetchCurrent'] ||
    state.loading.effects['category/fetch'] ||
    false,
}))
class ArticleEdit extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      dispatch,
    } = this.props;

    dispatch({
      type: 'category/fetch'
    });

    if (id) {
      dispatch({
        type: 'article/fetchCurrent',
        payload: id
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'article/resetCurrent',
    });
  }

  render() {
    const {
      match: {
        params: { id },
      },
      pageModel: { current },
      categories,
      loading,
    } = this.props;
    const title = id ? '编辑文章' : '添加文章';

    return (
      <PageHeaderWrapper title={title}>
        <Card bordered={false}>
          <Spin spinning={loading} tip="加载中...">
            <ArticleForm isEdit={!!id} data={current} categories={categories} />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ArticleEdit;
