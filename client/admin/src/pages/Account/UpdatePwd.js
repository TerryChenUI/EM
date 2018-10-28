import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Spin, Form, Input, Button, message } from 'antd';

import { formItemLayout, submitFormLayout } from '@/utils/layout';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { updatePassword } from '@/services/account';

import styles from '@/less/form.less';

const FormItem = Form.Item;

@connect(state => ({
  currentUser: state.global.currentUser,
  loading: state.loading.effects['global/currentUser'] || false,
  submitting: state.loading.effects['account/updateAccountPassword'] || false
}))
@Form.create()
class UpdatePwd extends PureComponent {
  state = {
    confirmDirty: false
  };

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/currentUser'
    });
  }

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const params = {
          password: values.password,
          newPassword: values.newPassword
        };
        const response = await updatePassword(params);
        if (response) {
          message.success('修改密码成功，正在跳转到登录页面');
          setTimeout(() => {
            window.location.href = '/user/login';
          }, 3000);
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次密码不相同');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  render() {
    const { loading, currentUser, form: { getFieldDecorator }, submitting } = this.props;

    return (
      <PageHeaderWrapper title="修改密码">
        <Card bordered={false}>
          <Spin spinning={loading} tip="加载中...">
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="用户名">
                <span className="ant-form-text">{currentUser.account}</span>
              </FormItem>
              <FormItem {...formItemLayout} label="旧密码">
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '旧密码不能为空' }
                  ],
                })(<Input type="password" placeholder="请输入旧密码" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="新密码">
                {getFieldDecorator('newPassword', {
                  rules: [
                    { required: true, message: '新密码不能为空' },
                    { len: 6, message: '新密码不能少于6个字符' },
                    { validator: this.validateToNextPassword }
                  ],
                })(<Input type="password" placeholder="请输入新密码" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="确认密码">
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    { required: true, message: '确认密码不能为空' },
                    { validator: this.compareToFirstPassword }
                  ],
                })(
                  <Input
                    type="password"
                    onBlur={this.handleConfirmBlur}
                    placeholder="请再次输入密码"
                  />
                )}
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

export default UpdatePwd;
