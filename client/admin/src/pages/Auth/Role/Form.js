import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, InputNumber, TreeSelect } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { formItemLayout, submitFormLayout } from '@/utils/layout';
import styles from '@/less/form.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const roleRoute = '/auth/roles';

@connect(({ loading }) => ({
  submitting: loading.effects['authRole/create'] || loading.effects['authRole/update'] || false,
}))
@Form.create()
class RoleForm extends PureComponent {
  handleSubmit = e => {
    const { dispatch, isEdit, data, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let action = null;
        let tip = null;
        if (isEdit) {
          values.id = data;
          action = 'update';
          tip = '更新角色成功';
        } else {
          action = 'create';
          tip = '添加角色成功';
        }
        dispatch({
          type: `authRole/${action}`,
          payload: values,
          callback: () => {
            message.success(tip);
            router.push(roleRoute);
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      data,
      moduleTree,
      submitting,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="角色名称">
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [{ required: true, message: '角色名称不能为空' }],
          })(<Input placeholder="请输入角色名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="角色标识">
          {getFieldDecorator('key', {
            initialValue: data.key,
            rules: [{ required: true, message: '角色标识不能为空' }],
          })(<Input placeholder="请输入角色标识" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {getFieldDecorator('display_order', {
            initialValue: data.display_order || 0,
            rules: [
              { required: true, message: '排序不能为空' },
              { type: 'number', message: '请输入数字' },
            ],
          })(<InputNumber style={{ width: 120 }} placeholder="请输入排序" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {getFieldDecorator('description', {
            initialValue: data.description,
          })(<TextArea style={{ minHeight: 32 }} rows={4} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="功能模块">
          {getFieldDecorator('auth_modules', {
            initialValue: data.auth_modules,
          })(
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeCheckable={true}
              treeData={moduleTree}
            />
          )}
        </FormItem>
        <FormItem {...submitFormLayout} className={styles.submitButtons}>
          <Link to={roleRoute}>
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

export default RoleForm;
