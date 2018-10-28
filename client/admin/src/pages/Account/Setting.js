import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Spin, message, Form, Input, Button } from 'antd';

import { formItemLayout, submitFormLayout } from '@/utils/layout';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from '@/less/form.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(state => ({
  currentUser: state.global.currentUser,
  loading: state.loading.effects['global/currentUser'] || false,
  submitting: state.loading.effects['authUser/update'] || false
}))
@Form.create()
class Setting extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'global/currentUser'
    });
  }

  handleSubmit = e => {
    const { dispatch, form, currentUser } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = currentUser._id;
        dispatch({
          type: 'authUser/update',
          payload: values,
          callback: () => {
            message.success('更新成功');
          }
        });
      }
    });
  };

  render() {
    const { loading, currentUser, form: { getFieldDecorator }, submitting } = this.props;

    return (
      <PageHeaderWrapper title="个人设置">
        <Card bordered={false}>
          <Spin spinning={loading} tip="加载中...">
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="用户名">
                <span className="ant-form-text">{currentUser.account}</span>
              </FormItem>
              <FormItem {...formItemLayout} label="角色">
                <span className="ant-form-text">{currentUser.role && currentUser.role.name}</span>
              </FormItem>
              <FormItem {...formItemLayout} label="姓名">
                <span className="ant-form-text">{currentUser.name}</span>
              </FormItem>
              <FormItem {...formItemLayout} label="手机号码">
                {getFieldDecorator('mobile', {
                  initialValue: currentUser.mobile
                })(<Input placeholder="请输入手机号码" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="备注">
                {getFieldDecorator('remark', {
                  initialValue: currentUser.remark,
                })(<TextArea style={{ minHeight: 32 }} rows={4} />)}
              </FormItem>
              <FormItem {...submitFormLayout} className={styles.submitButtons}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  保存
                </Button>
              </FormItem>
            </Form>
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Setting;
