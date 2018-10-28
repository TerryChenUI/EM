import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, Select } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { formItemLayout, submitFormLayout } from '@/utils/layout';
import styles from '@/less/form.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const userRoute = '/auth/users';

@connect(({ loading }) => ({
  submitting: loading.effects['authUser/create'] || loading.effects['authUser/update'] || false,
}))
@Form.create()
class UserForm extends PureComponent {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    const { dispatch, isEdit, data, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let action = null;
        let tip = null;
        if (isEdit) {
          values.id = data._id;
          action = 'update';
          tip = '更新用户成功';
        } else {
          action = 'create';
          tip = '添加用户成功';
        }
        delete values.confirmPassword;
        dispatch({
          type: `authUser/${action}`,
          payload: values,
          callback: () => {
            message.success(tip);
            router.push(userRoute);
          },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
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
    const {
      isEdit,
      form: { getFieldDecorator },
      data,
      roles,
      submitting,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户名">
          {isEdit ? (
            <span className="ant-form-text">{data.account}</span>
          ) : (
              getFieldDecorator('account', {
                initialValue: data.account,
                rules: [{ required: true, message: '用户名不能为空' }],
              })(<Input placeholder="请输入用户名" />)
            )}
        </FormItem>
        {isEdit ? null : (
          <div>
            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '密码不能为空' },
                  { len: 6, message: '密码不能少于6个字符' },
                  { validator: this.validateToNextPassword },
                ],
              })(<Input type="password" placeholder="请输入密码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="确认密码">
              {getFieldDecorator('confirmPassword', {
                rules: [
                  { required: true, message: '确认密码不能为空' },
                  { validator: this.compareToFirstPassword },
                ],
              })(
                <Input
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  placeholder="请再次输入密码"
                />
              )}
            </FormItem>
          </div>
        )}
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue: data.name
          })(<Input placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号码">
          {getFieldDecorator('mobile', {
            initialValue: data.mobile
          })(<Input placeholder="请输入手机号码" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="角色">
          {getFieldDecorator('auth_role', {
            initialValue: data.auth_role,
            rules: [
              { required: true, message: '用户角色不能为空' }
            ],
          })(
            <Select>
              {roles && roles.map(t => (
                <Option key={t._id} value={t._id}>
                  {t.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {
            initialValue: data.remark,
          })(<TextArea style={{ minHeight: 32 }} rows={4} />)}
        </FormItem>
        <FormItem {...submitFormLayout} className={styles.submitButtons}>
          <Link to={userRoute}>
            <Button className={styles.cancelButton}>取消</Button>
          </Link>
          <Button type="primary" htmlType="submit" loading={submitting}>
            保存
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default UserForm;
