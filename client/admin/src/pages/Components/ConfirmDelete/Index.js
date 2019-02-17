import { Modal, message } from 'antd';

export default (dispatch, id, title, action) => {
  Modal.confirm({
    title: `你确认要删除'${title}'？`,
    okText: '删除',
    cancelText: '取消',
    onOk: () => {
      dispatch({
        type: action,
        payload: id,
        callback: () => {
          message.success('删除成功');
        }
      });
    },
  });
};
