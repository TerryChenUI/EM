import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Table, Divider } from 'antd';
import Link from 'umi/link';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ConfirmDelete from '@/pages/components/ConfirmDelete';
import { getValue } from '@/utils';

import styles from '@/less/list.less';

const FormItem = Form.Item;
const { Option } = Select;
const moduleRoute = '/auth/modules';

@connect(state => ({
  pageModel: state.authModule,
  loading: state.loading.models.authModule,
}))
@Form.create()
class ModuleList extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'authModule/fetchModuleTree',
    });

    this.fetchList();
  }

  fetchList(payload) {
    this.props.dispatch({
      type: 'authModule/fetch',
      payload,
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

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.fetchList({});
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'authModule/fetch',
        payload: values,
      });
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      pageModel: { systemTree },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="功能模块">
              {getFieldDecorator('parent_module')(
                <Select style={{ width: '200px' }}>
                  <Option value="">全部</Option>
                  {systemTree.map(t => (
                    <Option key={t.id} value={t.id}>
                      {t.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="模块名称">
              {getFieldDecorator('name')(<Input placeholder="请输入模块名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button className={styles.resetButton} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

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
        title: '模块名称',
        dataIndex: 'name',
      },
      {
        title: '标识权限',
        dataIndex: 'key',
      },
      {
        title: '是否菜单',
        dataIndex: 'is_menu',
        render: val => (val ? '是' : '--'),
      },
      {
        title: '描述',
        dataIndex: 'description',
        render: val => val || '--',
      },
      {
        title: '排序',
        dataIndex: 'display_order',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Link to={`${moduleRoute}/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <a onClick={() => ConfirmDelete(dispatch, record.id, 'authModule/remove')}>删除</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="模块管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={`ant-divider ant-divider-horizontal ${styles.tableListDivider}`} />
            <div className={styles.tableListOperator}>
              <Link to={`${moduleRoute}/add`}>
                <Button icon="plus" type="primary">
                  添加
                </Button>
              </Link>
            </div>
            <Table
              loading={loading}
              rowKey={record => record.id}
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

export default ModuleList;
