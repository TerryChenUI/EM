import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Table, Divider } from 'antd';
import Link from 'umi/link';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ConfirmDelete from '@/pages/components/ConfirmDelete';
import styles from '@/less/list.less';

const roleRoute = '/auth/roles';

@connect(state => ({
  pageModel: state.authRole,
  loading: state.loading.models.authRole,
}))
class RoleList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'authRole/fetch',
    });
  }

  render() {
    const {
      pageModel: { list },
      loading,
      dispatch,
    } = this.props;

    const columns = [
      {
        title: '序号',
        key: 'index',
        render(text, record, index) {
          return index + 1;
        },
      },
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '角色标识',
        dataIndex: 'key',
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
            <Link to={`${roleRoute}/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <a onClick={() => ConfirmDelete(dispatch, record.id, 'authRole/remove')}>删除</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="角色管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Link to={`${roleRoute}/add`}>
                <Button icon="plus" type="primary">
                  添加
                </Button>
              </Link>
            </div>
            <Table
              loading={loading}
              rowKey={record => record.id}
              dataSource={list}
              columns={columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RoleList;
