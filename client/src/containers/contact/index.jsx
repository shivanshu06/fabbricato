import React from 'react'
import styles from "./styles.module.css"
import { Button, Form, Input, TextArea,notification} from 'antd';
import { useState } from 'react';
import {contactUs} from "../../requests"
import style from "../../style.module.css"
import contactImage from '../../assets/images/contactus/contactus.png'


const Contact = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
  const [formLayout, setFormLayout] = useState('vertical');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const submitQuery = async () => {
    try {
      
      const values = await form.validateFields()
  
      console.log(values)
      const response = await contactUs(values);
  
      console.log(response);
      notification.success({
        message: 'Form Submitted',
        description: 'Your form has been successfully submitted.',
      });
      form.resetFields()
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      {/* <img alt='image' src={contactImage} /> */}
        <h1>CONTACT US</h1>
        <Form
    //   {...formItemLayout}
      layout={formLayout}
      form={form}
      onFinish={submitQuery}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: formLayout === 'inline' ? 'none' : 600,
      }}
      
    >
      
      <Form.Item label="Name" name="name">
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber">
          <Input placeholder="Enter your Phone Number" />
        </Form.Item>
        <Form.Item label="Query" name="query">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className={style.buttonglobal} htmlType='submit'>
            Submit
          </Button>
      </Form.Item>
    </Form>
        </div>
  )
}

export default Contact