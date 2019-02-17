import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Table, Divider } from 'antd';
import Link from 'umi/link';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ConfirmDelete from '@/pages/components/ConfirmDelete';
import styles from '@/less/list.less';
import { getValue } from '@/utils';

const categoryRoute = '/content/categories';

@connect(state => ({
  pageModel: state.category,
  loading: state.loading.models.category,
}))
class CategoryList extends PureComponent {
  componentDidMount() {
    this.fetchList();
  }

  fetchList(payload) {
    this.props.dispatch({
      type: 'category/fetch',
      payload
    });
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.fetchList(params);
  };

  render() {
    const {
      pageModel: {
        list: { data, pagination },
      },
      loading,
      dispatch,
    } = this.props;

    const paginationProp = {
      current: pagination.currentPage,
      pageSize: pagination.pageSize,
      total: pagination.total,
      showTotal: total => `共 ${total} 项`
    };

    const columns = [
      {
        title: '序号',
        key: 'index',
        render(text, record, index) {
          return (paginationProp.current - 1) * paginationProp.pageSize + index + 1;
        },
      },
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '分类标识',
        dataIndex: 'slug',
      },
      {
        title: '排序',
        dataIndex: 'display_order',
      },
      {
        title: '描述',
        dataIndex: 'description',
        render: val => val || '--',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Link to={`${categoryRoute}/${record._id}`}>编辑</Link>
            <Divider type="vertical" />
            <a onClick={() => ConfirmDelete(dispatch, record._id, 'category/remove')}>删除</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="文章分类">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Link to={`${categoryRoute}/add`}>
                <Button icon="plus" type="primary">
                  添加
                </Button>
              </Link>
            </div>
            <Table
              loading={loading}
              rowKey={record => record._id}
              dataSource={data}
              columns={columns}
              pagination={paginationProp}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CategoryList;
