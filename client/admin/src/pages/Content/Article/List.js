import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Table, Divider } from 'antd';
import Link from 'umi/link';
import moment from 'moment';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ConfirmDelete from '@/pages/components/ConfirmDelete';
import styles from '@/less/list.less';
import { getValue } from '@/utils';

const FormItem = Form.Item;
const { Option } = Select;
const articleRoute = '/content/articles';

@connect(state => ({
  pageModel: state.article,
  categories: state.category.list.data,
  loading: state.loading.models.article
}))
@Form.create()
class ArticleList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/fetch'
    });

    this.fetchList();
  }

  fetchList(payload) {
    this.props.dispatch({
      type: 'article/fetch',
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
      ...filters
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
        ...fieldsValue
      };

      this.setState({
        formValues: values
      });

      dispatch({
        type: 'article/fetch',
        payload: values
      });
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      categories,
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('title')(<Input placeholder="请输入标题" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="分类">
              {getFieldDecorator('category')(
                <Select>
                  <Option value="">全部</Option>
                  {categories && categories.map(t => (
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
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '分类',
        dataIndex: 'category.name',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '创建日期',
        dataIndex: 'create_date',
        render(text, record) {
          return moment(record.create_time).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Link to={`${articleRoute}/${record._id}`}>编辑</Link>
            <Divider type="vertical" />
            <a onClick={() => ConfirmDelete(dispatch, record._id, 'article/remove')}>删除</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="文章管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={`ant-divider ant-divider-horizontal ${styles.tableListDivider}`} />
            <div className={styles.tableListOperator}>
              <Link to={`${articleRoute}/add`}>
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

export default ArticleList;
