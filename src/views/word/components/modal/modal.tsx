import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { usePageStores } from '@/views/word/store';
import { Modal, Form, Select } from 'antd';
import { formLayout } from '@/maps/grid';
const { Option } = Select;

const RModal: FC = () => {
  const { modalStore } = usePageStores();
  const [form] = Form.useForm();

  const rules = {
    name: [
      { 
        required: true,
        message: '请选择'
      }
    ]
  }

  const title = useMemo(() => `${modalStore.fromData.id ? '编辑' : '新增'} `, [modalStore.fromData.id]);

  const onCancel = () => {
    form.resetFields();
    modalStore.setVisible(false);
  }

  const onOk = () => {
    form.validateFields().then(values => {
      console.log(values);
      onCancel();
    }).catch(errorInfo => {
      console.log(errorInfo);
    });
  }
  return (
    <Modal
      title={title}
      maskClosable={false}
      // centered
      visible={modalStore.visible}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      width={800}
    >
      <Form
        { ...formLayout }
        form={ form }
      >
        <Form.Item
          name='name'
          label='姓名'
          initialValue={modalStore.fromData.name}
          rules={rules.name}
        >
          <Select
            className='width-per-100'
            placeholder={rules.name[0].message}
          >
            <Option value="jack">Jack (100)</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default observer(RModal);
