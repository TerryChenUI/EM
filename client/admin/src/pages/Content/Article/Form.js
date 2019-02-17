import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, Select } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { formItemLayout, submitFormLayout } from '@/utils/layout';
import styles from '@/less/form.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const articleRoute = '/content/articles';

@connect(({ loading }) => ({
  submitting: loading.effects['article/create'] || loading.effects['article/update'] || false,
}))
@Form.create()
class ArticleForm extends PureComponent {
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
          tip = '更新文章成功';
        } else {
          action = 'create';
          tip = '添加文章成功';
        }
        dispatch({
          type: `article/${action}`,
          payload: values,
          callback: () => {
            message.success(tip);
            router.push(articleRoute);
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      data,
      categories,
      submitting,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            initialValue: data.title,
            rules: [{ required: true, message: '文章标题不能为空' }],
          })(<Input placeholder="请输入文章标题" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="分类">
          {getFieldDecorator('category', {
            initialValue: data.category,
          })(
            <Select>
              <Option value="">请选择</Option>
              {categories && categories.map(t => (
                <Option key={t._id} value={t._id}>
                  {t.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="关键字">
          {getFieldDecorator('keyword', {
            initialValue: data.keyword
          })(<TextArea style={{ minHeight: 32 }} rows={3} placeholder="请输入关键字" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="作者">
          {getFieldDecorator('key', {
            initialValue: data.author
          })(<Input placeholder="请输入文章作者" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {getFieldDecorator('source', {
            initialValue: data.source
          })(<Input placeholder="请输入文章来源" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="简短描述">
          {getFieldDecorator('description', {
            initialValue: data.description
          })(<TextArea style={{ minHeight: 32 }} rows={4} placeholder="请输入简短描述" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="内容">
          {getFieldDecorator('content', {
            initialValue: data.content
          })(<TextArea style={{ minHeight: 32 }} rows={4} placeholder="请输入正文" />)}
        </FormItem>
        <FormItem {...submitFormLayout} className={styles.submitButtons}>
          <Link to={articleRoute}>
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

export default ArticleForm;
