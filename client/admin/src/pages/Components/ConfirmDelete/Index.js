import { Modal, message } from 'antd';

export default (dispatch, id, action) => {
  Modal.confirm({
    title: '你确认删除这条记录吗？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      dispatch({
        type: action,
        payload: id,
        callback: () => {
          message.success('删除成功');
        },
      });
    },
  });
};
