import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message } from 'antd';
import { formItemLayout, submitFormLayout } from '@/utils/layout';
import styles from '@/less/form.less';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['authUser/resetPwd'] || false,
}))
@Form.create()
class ResetPwdForm extends PureComponent {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    const { dispatch, data, form, handleResetPwdVisible } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = data._id;
        delete values.confirmPassword;
        dispatch({
          type: 'authUser/resetPwd',
          payload: values,
          callback: () => {
            message.success('更新密码成功');
            handleResetPwdVisible(false);
          },
        });
      }
    });
  };

  handleCancel = () => {
    this.props.handleResetPwdVisible(false);
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次新密码不相同');
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
    const {
      form: { getFieldDecorator },
      data,
      submitting,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户名">
          <span className="ant-form-text">{data.account}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="新密码">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '新密码不能为空' },
              { validator: this.validateToNextPassword },
            ],
          })(<Input type="password" placeholder="请输入新密码" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="确认新密码">
          {getFieldDecorator('confirmPassword', {
            rules: [
              { required: true, message: '确认新密码不能为空' },
              { validator: this.compareToFirstPassword },
            ],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次输入新密码" />
          )}
        </FormItem>
        <FormItem {...submitFormLayout} className={styles.submitButtons}>
          <Button type="button" className={styles.cancelButton} onClick={() => this.handleCancel()}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            保存
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default ResetPwdForm;
