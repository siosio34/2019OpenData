// @format

import React from 'react';
import { Form, Input, Modal } from 'antd';

const ModifyEventModal = Form.create({
  name: 'modify_event',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const fields = [
      'id',
      'name',
      'category',
      'requirements',
      'begin_date',
      'end_date',
      'reference',
      'image',
      'link',
      'location',
      'benefit',
      'target',
      'tel',
      'note',
      'description',
    ];
    return fields.reduce(
      (obj, name) => ({
        ...obj,
        [name]: Form.createFormField({
          ...props.fields[name],
          value: props.fields[name].value,
        }),
      }),
      {}
    );
  },
})(
  class extends React.Component {
    render() {
      const { visible, onSubmit, onCancel, form } = this.props;
      const { getFieldDecorator } = form;
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
          title="혜택 수정"
          visible={visible}
          okText="수정"
          cancelText="취소"
          onOk={onSubmit}
          onCancel={onCancel}
        >
          <Form {...formItemLayout}>
            <Form.Item label="ID">
              {getFieldDecorator('id')(<Input readOnly />)}
            </Form.Item>
            <Form.Item label="이름">
              {getFieldDecorator('name', {
                rules: [requiredRule],
              })(<Input autoComplete="new-password" />)}
            </Form.Item>
            <Form.Item label="카테고리">
              {getFieldDecorator('category', {
                rules: [requiredRule],
              })(<Input autoComplete="new-password" />)}
            </Form.Item>
            <Form.Item label="혜택">
              {getFieldDecorator('benefit', {
                rules: [requiredRule],
              })(<Input autoComplete="new-password" />)}
            </Form.Item>
            <Form.Item label="대상">
              {getFieldDecorator('target', {
                rules: [requiredRule],
              })(<Input autoComplete="new-password" />)}
            </Form.Item>
            <Form.Item label="조건">
              {getFieldDecorator('requirements')(
                <Input autoComplete="new-password" />
              )}
            </Form.Item>
            <Form.Item label="시작일">
              {getFieldDecorator('begin_date')(
                <Input autoComplete="new-password" />
              )}
            </Form.Item>
            <Form.Item label="종료일">
              {getFieldDecorator('end_date')(
                <Input autoComplete="new-password" />
              )}
            </Form.Item>
            <Form.Item label="출처">
              {getFieldDecorator('reference')(
                <Input autoComplete="new-password" />
              )}
            </Form.Item>
            <Form.Item label="이미지">
              {getFieldDecorator('image')(
                <Input autoComplete="new-password" />
              )}
            </Form.Item>
            <Form.Item label="링크">
              {getFieldDecorator('link')(<Input autoComplete="new-password" />)}
            </Form.Item>
            <Form.Item label="위치">
              {getFieldDecorator('location')(
                <Input autoComplete="new-password" />
              )}
            </Form.Item>
            <Form.Item label="전화번호">
              {getFieldDecorator('tel')(<Input autoComplete="new-password" />)}
            </Form.Item>
            <Form.Item label="비고">
              {getFieldDecorator('note')(<Input autoComplete="new-password" />)}
            </Form.Item>
            <Form.Item label="상세">
              {getFieldDecorator('description')(
                <Input.TextArea autoComplete="new-password" />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default ModifyEventModal;
