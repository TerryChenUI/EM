import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, InputNumber, TreeSelect } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { formItemLayout, submitFormLayout } from '@/utils/layout';
import styles from '@/less/form.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const cateogryRoute = '/content/categories';

@connect(({ loading }) => ({
  submitting: loading.effects['category/create'] || loading.effects['category/update'] || false,
}))
@Form.create()
class CategoryForm extends PureComponent {
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
          tip = '更新分类成功';
        } else {
          action = 'create';
          tip = '添加分类成功';
        }
        dispatch({
          type: `category/${action}`,
          payload: values,
          callback: () => {
            message.success(tip);
            router.push(cateogryRoute);
          },
        });
      }
    });
  };

  render() {
    const {
      isEdit,
      form: { getFieldDecorator },
      data,
      submitting,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="分类名称">
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [{ required: true, message: '分类名称不能为空' }],
          })(<Input placeholder="请输入分类名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="分类标识">
        {isEdit ? (
            <span className="ant-form-text">{data.slug}</span>
          ) :
           (getFieldDecorator('slug', {
            initialValue: data.key,
            rules: [{ required: true, message: '分类标识不能为空' }],
          })(<Input placeholder="请输入分类标识" />))
        }
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
        <FormItem {...submitFormLayout} className={styles.submitButtons}>
          <Link to={cateogryRoute}>
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

export default CategoryForm;
