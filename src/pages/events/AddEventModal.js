// @format

import React from 'react';
import { Form, Input, Modal } from 'antd';

const AddEventModal = Form.create({ name: 'add_event' })(
  class extends React.Component {
    render() {
      const { visible, onSubmit, onCancel, form } = this.props;
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      };
      const requiredRule = {
        required: true,
        message: '필수 입력 항목입니다.',
      };

      return (
        <Modal
          title="혜택 추가"
          visible={visible}
          okText="추가"
          cancelText="취소"
          onOk={onSubmit}
          onCancel={onCancel}
        >
          <Form {...formItemLayout}>
            <Form.Item label="이름">
              {getFieldDecorator('name', {
                rules: [requiredRule],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="카테고리">
              {getFieldDecorator('category', {
                rules: [requiredRule],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default AddEventModal;
