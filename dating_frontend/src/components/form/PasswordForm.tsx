import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import React from 'react'

const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type SetPasswordProps = {
  email: string;
  button: string;
  disabled: boolean;
  onSubmit: Function;
};

const SetPassword: React.FC<SetPasswordProps> = ({ email, button, disabled, onSubmit }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const handleSetPassword = (value: any) => {
    setLoading(true);
    onSubmit(value, setLoading);
  };

  useEffect(() => {
    form.setFieldsValue({
      email
    });
  }, [email]);

  return (
    <FormContainer>
      <div className='overlay'>
        <Form form={form} layout='vertical' style={{ backgroundColor: 'white', minWidth: '40rem', padding: '2rem 2.5rem 0 2.5rem', borderRadius: '5px' }} onFinish={value => handleSetPassword(value)}>
          <Form.Item name='email' label='Email' rules={[{ type: "email", message: "Invalid Email" }]}>
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name='password' label='Password' rules={[{ required: true, message: 'Password is required' }, { min: 6, message: "Password must be at least 6 characters" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={loading}>
              {button}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </FormContainer>
  );
};

export default SetPassword;

const ResetPasswordEmailContainer = styled.div`
  position: absolute;
  display: block;
  z-index: 2;
`;

const IconDiv = styled.div`
  height: 1.5rem;
  width: 100%;
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

type ResetPasswordEmailProps = {
  button: string;
  onForgetPassword: Function;
};

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({ button, onForgetPassword }) => {
  const [resetPasswordForm] = useForm();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    setLoading(true);
    onForgetPassword();
    setLoading(false);
  };

  return (
    <ResetPasswordEmailContainer>
      <div className='overlay' style={{ backgroundColor: 'rgba(0, 0, 0, .8)' }}>
        <Form form={resetPasswordForm} layout='vertical' style={{ backgroundColor: 'white', minWidth: '50rem', padding: '2rem 2.5rem 0 2.5rem', borderRadius: '5px' }} onFinish={handleResetPassword}>
          <IconDiv>
            <CloseOutlined style={{ float: 'right' }} onClick={() => { onForgetPassword(); }} />
          </IconDiv>
          <Form.Item name='email' label='Email' rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Invalid Email" }]}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={loading}>
              {button}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ResetPasswordEmailContainer>
  );
};