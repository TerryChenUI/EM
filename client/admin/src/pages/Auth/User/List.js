import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Table, Modal, Divider } from 'antd';
import Link from 'umi/link';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ResetPwdForm from './ResetPwdForm';
import ConfirmDelete from '@/pages/components/ConfirmDelete';
import { getValue } from '@/utils';

import styles from '@/less/list.less';

const FormItem = Form.Item;
const { Option } = Select;
const userRoute = '/auth/users';

@connect(state => ({
  pageModel: state.authUser,
  roles: state.authRole.list,
  loading: state.loading.models.authUser,
}))
@Form.create()
class UserList extends PureComponent {
  state = {
    formValues: {},
    resetPwdModal: {
      isVisible: false,
      current: null,
    },
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'authRole/fetch',
    });

    this.fetchList();
  }

  fetchList(payload) {
    this.props.dispatch({
      type: 'authUser/fetch',
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
        type: 'authUser/fetch',
        payload: values,
      });
    });
  };

  handleResetPwdVisible = (flag, data) => {
    this.setState({
      resetPwdModal: {
        isVisible: flag,
        current: data,
      },
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      roles,
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键字">
              {getFieldDecorator('key')(<Input placeholder="请输入用户名，姓名或邮箱" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="角色">
              {getFieldDecorator('auth_role')(
                <Select>
                  <Option value="">全部</Option>
                  {roles && roles.map(t => (
                    <Option key={t._id} value={t._id}>
                      {t.name}
                    </Option>
                  ))}
                </Select>
              )}
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

    const { isVisible, current } = this.state.resetPwdModal;

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
        title: '用户名',
        dataIndex: 'account',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Link to={`${userRoute}/${record._id}`}>编辑</Link>
            <Divider type="vertical" />
            <a onClick={() => ConfirmDelete(dispatch, record._id, 'authUser/remove')}>删除</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleResetPwdVisible(true, record)}>重置密码</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={`ant-divider ant-divider-horizontal ${styles.tableListDivider}`} />
            <div className={styles.tableListOperator}>
              <Link to={`${userRoute}/add`}>
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
        {isVisible && (
          <Modal
            title="重置密码"
            visible={isVisible}
            footer={null}
            onCancel={() => this.handleResetPwdVisible(false)}
          >
            <ResetPwdForm data={current} handleResetPwdVisible={this.handleResetPwdVisible} />
          </Modal>
        )}
      </PageHeaderWrapper>
    );
  }
}

export default UserList;
