import { GetServerSideProps } from 'next';
import { useEffect, useState } from "react"
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { User } from '../types/user';
import { authentication } from '../utils/authentication';
import React from 'react'
// Icons
import { UserOutlined, LockOutlined, EditOutlined } from "@ant-design/icons"

import { Tabs, Form, Input, Row, Col, notification, Select, Button, message } from "antd"

type SettingProps = {
  user: User;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileBox = styled.div`
    width: 100%;
    max-width: 120rem;
    .searching_and_filtering {
        margin-top: 20px;
    }
    .table_wrapper {
        margin-top: 50px;
    }
`

const Settings: React.FC<SettingProps> = ({ user }) => {

  const [updateProfileForm] = Form.useForm();
  const [updatePasswordForm] = Form.useForm();

  useEffect(() => {
    updateProfileForm.setFieldsValue({
        email: user.email,
        username: user.username,
        // roleId: user.role.id,
        // branchId: user.branch.id
    });
    updatePasswordForm.setFieldsValue({
      email: user.email,
  });
  }, [user])

  const onUpdateProfileHandler = () => {
      updateProfileForm.validateFields().then(values => {
          fetch(`${process.env.apiURL}/user/profile/${user.id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              credentials: "include",
              body: JSON.stringify(values)
          })
          .then(res => res.json())
          .then(data => {
              if(!data.ok) {
                  return notification.error({
                      message: "Error",
                      description: data.message,
                      duration: 3
                  })
              }

              message.success(data.message)
          })
      })
  }

  const onUpdatePasswordHandler = () => {
    updatePasswordForm.validateFields().then(values => {
      fetch(`${process.env.apiURL}/user/password/${user.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
          if(!data.ok) {
              return notification.error({
                  message: "Error",
                  description: data.message,
                  duration: 3
              })
          }

          message.success(data.message)
      })
    })
  }

  return (
    <Layout heading='My Profile' user={user}>
      <Head>
        <title>My Profile | Unique</title>
      </Head>
      <Container>
        <ProfileBox>
            <Tabs type="card">
                <Tabs.TabPane tab={<span>
                    <UserOutlined />
                    Profile
                </span>} key="1">
                  <h3>Update Profile</h3>
                    <Row>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form form={updateProfileForm} layout="vertical">
                          <Form.Item name="email" label="Email" required>
                            <Input disabled />
                          </Form.Item>
                          <Form.Item name="username" label="Username" rules={[{required: true}]}>
                            <Input />
                          </Form.Item>
                          <Form.Item name="phoneNumber" label="Phone Number" rules={[{required: true}]}>
                            <Input />
                          </Form.Item>
                          <Form.Item name="country" label="Country" rules={[{required: true}]}>
                            <Input />
                          </Form.Item>
                          <Form.Item name="city" label="City" rules={[{required: true}]}>
                            <Input />
                          </Form.Item>
                          <div style={{overflow: 'hidden'}}>
                              <Button type="primary" style={{float: "right"}} icon={<EditOutlined />} onClick={onUpdateProfileHandler}>Update Profile</Button>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>
                  <LockOutlined />
                  Password
                </span>} key="2">
                  <h3>Update Password</h3>
                  <Row>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form form={updatePasswordForm} layout="vertical">
                          <Form.Item name="email" label="Email" required>
                            <Input disabled />
                          </Form.Item>
                          <Form.Item name="password" label="Password" rules={[{required: true}, {min: 6}]}>
                            <Input.Password />
                          </Form.Item>
                          <div style={{overflow: 'hidden'}}>
                              <Button type="primary" style={{float: "right"}} icon={<EditOutlined />} onClick={onUpdatePasswordHandler}>Update Password</Button>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                </Tabs.TabPane>
            </Tabs>
        </ProfileBox>
      </Container>
    </Layout>
  );
};

export default Settings;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await authentication(context);

  if (!result.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      user: result.user
    }
  };
};