import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, InputNumber, Switch, message, TreeSelect } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { formItemLayout, submitFormLayout } from '@/utils/layout';
import styles from '@/less/form.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const moduleRoute = '/auth/modules';

@connect(({ loading }) => ({
  submitting: loading.effects['authModule/create'] || loading.effects['authModule/update'] || false,
}))
@Form.create()
class ModuleForm extends PureComponent {
  handleSubmit = e => {
    const { dispatch, isEdit, data, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let action = null;
        let tip = null;
        if (isEdit) {
          values.id = data.id;
          action = 'update';
          tip = '更新模块成功';
        } else {
          action = 'create';
          tip = '添加模块成功';
        }
        dispatch({
          type: `authModule/${action}`,
          payload: values,
          callback: () => {
            message.success(tip);
            router.push(moduleRoute);
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      data,
      treeData,
      submitting,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="父级模块">
          {getFieldDecorator('parent_module', {
            initialValue: data.parent_module,
          })(
            <TreeSelect dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} treeData={treeData} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="模块名称">
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [{ required: true, message: '模块名称不能为空' }],
          })(<Input placeholder="请输入模块名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="权限标识">
          {getFieldDecorator('key', {
            initialValue: data.key,
            rules: [{ required: true, message: '权限标识不能为空' }],
          })(<Input placeholder="请输入权限标识" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否是菜单">
          {getFieldDecorator('is_menu', {
            valuePropName: 'checked',
            initialValue: data.is_menu || false,
          })(<Switch />)}
        </FormItem>
        {getFieldValue('is_menu') ? (
          <div>
            <FormItem {...formItemLayout} label="菜单地址">
              {getFieldDecorator('url', {
                initialValue: data.url,
                rules: [],
              })(<Input placeholder="请输入菜单地址" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="图标字体">
              {getFieldDecorator('iconfont', {
                initialValue: data.iconfont,
                rules: [],
              })(<Input placeholder="请输入图标字体" />)}
            </FormItem>
          </div>
        ) : (
          ''
        )}
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
          {getFieldDecorator('remark', {
            initialValue: data.remark,
          })(<TextArea style={{ minHeight: 32 }} rows={4} />)}
        </FormItem>
        <FormItem {...submitFormLayout} className={styles.submitButtons}>
          <Link to={moduleRoute}>
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

export default ModuleForm;
