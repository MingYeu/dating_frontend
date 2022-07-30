import { Form, Input, Select, Button, Tabs } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from '../../types/user';
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { FetchUserProps } from '../../pages/users';
import React from 'react'

const FormContainer = styled.div<FormProps>`
  position: absolute;
  display: ${props => props.openForm ? 'block' : 'none'};
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

type AddUserProps = {
//   roleListFilters: Role[];
//   branchListFilters: Branch[];
  handleOpenAddUser: Function;
  openAddUserForm: boolean;
  handleAddUser: Function;
};

type EditUserProps = {
//   roleListFilters: Role[];
//   branchListFilters: Branch[];
  handleOpenEditUser: Function;
  openEditUserForm: boolean;
  data: FetchUserProps;
  handleEditPassword: Function;
  handleEditProfile: Function;
};

type FormProps = {
  openForm: boolean;
};

const AddUser: React.FC<AddUserProps> = ({ handleOpenAddUser, openAddUserForm, handleAddUser }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  return (
    <FormContainer openForm={openAddUserForm}>
      <div className='overlay'>
        <Form form={form} name='create-user-form' layout='vertical' style={{ backgroundColor: 'white', minWidth: '40rem', padding: '2rem 2.5rem 0 2.5rem', borderRadius: '5px' }} onFinish={formValue => { handleAddUser(formValue); }}>
          <IconDiv>
            <CloseOutlined style={{ float: 'right' }} onClick={() => { handleOpenAddUser(); }} />
          </IconDiv>
          <Form.Item name='username' label='Username' rules={[{ required: true, message: "Username is required" }]}>
            <Input placeholder='Test Account' />
          </Form.Item>
          <Form.Item name='email' label='Email' rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Invalid Email" }]}>
            <Input placeholder='test@gmail.com' />
          </Form.Item>
          <Form.Item name='password' label='Password' rules={[{ required: true, message: "Password is required" }]}>
            <Input placeholder='12345678' />
          </Form.Item>
          <Form.Item name='sex' label='Sex' rules={[{ required: true, message: "Sex is required" }]}>
            <Input placeholder='M | F' />
          </Form.Item>
          <Form.Item name='phoneNumber' label='Phone Number' rules={[{ required: true, message: "Phone Number is required" }]}>
            <Input placeholder='01120029272' />
          </Form.Item>
          <Form.Item name='country' label='Country, city' rules={[{ required: true, message: "Country is required" }]}>
            <Input placeholder='Malaysia, KL' />
          </Form.Item>
          {/* <Form.Item name='role' label='Role' rules={[{ required: true, message: "Role is required" }]} initialValue="">
            <Select placeholder='Select Role'>
              <Select.Option value="">-- Select Role --</Select.Option>
              {roleListFilters.map(role =>
                <Select.Option key={role.name} value={role.id}>{role.name}</Select.Option>
              )}
            </Select>
          </Form.Item> */}
          {/* <Form.Item name='role' label='Role' rules={[{ required: true, message: "Role is required" }]} initialValue="">
            <Select placeholder='Select Role'>
              <Select.Option value="">-- Select Role --</Select.Option>
              {roleListFilters.map(role =>
                <Select.Option key={role.name} value={role.id}>{role.name}</Select.Option>
              )}
            </Select>
          </Form.Item> */}
          {/* <Form.Item name='branch' label='Branch' rules={[{ required: true, message: "Branch is required" }]} initialValue="">
            <Select placeholder='Select Branch'>
              <Select.Option value="">-- Select Branch --</Select.Option>
              {branchListFilters.map(branch =>
                <Select.Option key={branch.name} value={branch.id}>{branch.name}</Select.Option>
              )}
            </Select>
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} style={{ float: 'right' }} loading={loading}>
              Create User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </FormContainer >
  );
};

// export const EditUser: React.FC<EditUserProps> = ({ openEditUserForm, handleOpenEditUser, data, handleEditPassword, handleEditProfile }) => {
//   const [passwordForm] = useForm();
//   const [profileForm] = useForm();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     data && passwordForm.setFieldsValue({
//       email: data.email
//     });
//     data && profileForm.setFieldsValue({
//       email: data.email,
//       username: data.username,
//       role: data.roleId,
//       branch: data.branchId
//     });
//   }, [data]);

//   return (
//     <FormContainer openForm={openEditUserForm}>
//       <div className='overlay'>
//         <div style={{ backgroundColor: 'white', minWidth: '40rem', width: '50rem', padding: '2rem 2.5rem 0 2.5rem', borderRadius: '5px' }}>
//           <IconDiv style={{ paddingBottom: '2rem' }}>
//             <CloseOutlined style={{ float: 'right' }} onClick={() => { handleOpenEditUser(); }} />
//           </IconDiv>
//           <Tabs tabPosition='left' size='small'>
//             <Tabs.TabPane tab='Password' key='1'>
//               <Form form={passwordForm} layout='vertical' onFinish={formValue => { handleEditPassword({ id: data.id, ...formValue }); }}>
//                 <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Email is required' }, { type: "email", message: "Invalid email" }]}>
//                   <Input disabled />
//                 </Form.Item>
//                 <Form.Item name='password' label='New Password' rules={[{ required: true, message: 'Password is required' }, { min: 6, message: "Password must be at least 6 characters" }]}>
//                   <Input />
//                 </Form.Item>
//                 <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//                   <Button type="primary" htmlType="submit" icon={<EditOutlined />} style={{ float: 'right' }} loading={loading}>
//                     Edit User
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </Tabs.TabPane>
//             <Tabs.TabPane tab='Profile' key='2'>
//               <Form form={profileForm} layout='vertical' onFinish={formValue => { handleEditProfile({ id: data.id, ...formValue }); }}>
//                 <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Email is required' }, { type: "email", message: "Invalid email" }]}>
//                   <Input disabled />
//                 </Form.Item>
//                 <Form.Item name='username' label='Username' rules={[{ required: true, message: "Username is required" }]} initialValue="">
//                   <Input />
//                 </Form.Item>
//                 {/* <Form.Item name='role' label='Role' rules={[{ required: true, message: "Role is required" }]} initialValue="">
//                   <Select placeholder='Select Role'>
//                     <Select.Option value="">-- Select Role --</Select.Option>
//                     {roleListFilters.map(role =>
//                       <Select.Option key={role.name} value={role.id}>{role.name}</Select.Option>
//                     )}
//                   </Select>
//                 </Form.Item> */}
//                 {/* <Form.Item name='branch' label='Branch' rules={[{ required: true, message: "Branch is required" }]} initialValue="">
//                   <Select placeholder='Select Branch'>
//                     <Select.Option value="">-- Select Branch --</Select.Option>
//                     {branchListFilters.map(branch =>
//                       <Select.Option key={branch.name} value={branch.id}>{branch.name}</Select.Option>
//                     )}
//                   </Select>
//                 </Form.Item> */}
//                 <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//                   <Button type="primary" htmlType="submit" icon={<EditOutlined />} style={{ float: 'right' }} loading={loading}>
//                     Edit User
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </Tabs.TabPane>
//           </Tabs>
//         </div>
//       </div>
//     </FormContainer>
//   );
// };

export default AddUser;