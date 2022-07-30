import { Children, useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import moment from 'moment';
import React from 'react'
import { Button, Col, Form, Input, message, Modal, notification, Row, Select, Table, Tag, Tooltip } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import space from 'antd/lib/space';
import { LockOutlined, UnlockOutlined, EditOutlined, DeleteOutlined, FilterOutlined, PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { RiSendPlaneLine } from "react-icons/ri";

import Layout from '../components/layout/Layout';
import { authentication } from '../utils/authentication';
import { Action, User } from '../types/user';
import AddUser from '../components/form/UserForm';
// import { NADiv } from './branch';
import Head from 'next/head';
import { log } from 'console';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const UserListBox = styled.div`
  width: 100%;
  max-width: 120rem;
`;

const CreateUser = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const SearchUser = styled.div`
  border: none;
  margin-bottom: 1.5rem;

  input::placeholder {
    font-size: 1.5rem;
  }
`;

const FilterUser = styled.div`
  margin-bottom: 2rem;
  width: fit-content;

  @media(max-width: 23em) {
    width: 100%;
  }

  .responsive-form {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    @media(max-width: 43em) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 1rem;
    }

    @media(max-width: 40em) {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 1rem;
    }

    @media(max-width: 31em) {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 1rem;
    }

    @media(max-width: 22em) {
      width: 100%;
      grid-template-columns: repeat(1, 1fr);
      row-gap: 1.5rem;
    }
  }

  .select {
    max-width: 15rem;

    @media(max-width: 23em) {
      row-gap: 1rem;
      max-width: 100%;
    }
  }

  .status {
    max-width: 20rem;

    @media(max-width: 23em) {
      row-gap: 1rem;
      max-width: 100%;
    }
  }

  .button {
    max-width: 15rem;

    @media(max-width: 23em) {
      row-gap: 1rem;
      max-width: 100%;
    }
  }

  .branch {
    max-width: 20rem;

    @media(max-width: 23em) {
      row-gap: 1rem;
      max-width: 100%;
    }
  }
`;

const ActionLayout = styled(space)`
  font-size: 2rem;

  .iconAction {
    cursor: pointer;
  }

  .notApplicable {
    font-size: 1.3rem;
  }

  .delete {
    color: red;
  }
`;

type Params = {
  URL: string;
  reset?: boolean;
};

type UserProps = {
  user: User;
};

export type FetchUserProps = {
  id: string;
  // branchId: string;
  email: string;
  username: string;
  // roleId: string;
};

const Users: React.FC<UserProps> = ({ user }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

//   const [branchListFilters, setBranchListFilters] = useState<Branch[]>([]);
  const [roleListFilters, setRoleListFilters] = useState<Action[]>([]);

  const [searchEmailUsername, setSearchEmailUsername] = useState("");
  const [filterRole, setFilterRole] = useState<string>();
  // const [filterBranch, setFilterBranch] = useState<string>();
  const [filterStatus, setFilterStatus] = useState<string>();
  const url = `${process.env.apiURL}`;

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);

  const [userInfo, setUserInfo] = useState<any>();

  async function fetchUser(params: Params) {
    setLoading(true);

    const emailString = searchEmailUsername === '' ? `` : `&email=${searchEmailUsername}`;
    const activeString = filterStatus === undefined ? `` : `&active=${filterStatus}`;
    // const branchString = filterBranch === undefined ? `` : `&branch=${filterBranch}`;
    const roleString = filterRole === undefined ? `` : `&role=${filterRole}`;
    
    let URL: string;
    if (params.reset) {
      URL = `${params.URL}`;
    } else {
      URL = `${params.URL}${emailString}${activeString}${roleString}`;//${branchString}`;
    }

    fetch(URL, {
      method: "GET",
      credentials: "include",
    }).then(res => res.json()).then(data => {
      setLoading(false);
      if (!data.ok) {
        console.log(URL);
        console.log("Cant get data");
        return;
      }

      setFilteredUsers(data.data);
      setPagination(prev => {
        console.log("Pagination");
        return { ...prev, total: data.total };
      });
    });
  };

  useEffect(() => {
    fetchUser({ URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}` });

    fetch(`${url}/user`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      if (!data.ok) {
        return;
      }
      setRoleListFilters(data.data);
    });

    // fetch(`${url}/branches`, {
    //   method: 'GET',
    //   credentials: 'include'
    // }).then(res => res.json()).then(data => {
    //   if (!data.ok) {
    //     return;
    //   }
    // //   setBranchListFilters(data.data);
    // });
  }, []);

  const columns: ColumnsType<User> = [{
    title: 'Username',
    dataIndex: 'username',
    key: 'username'
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  }, 
  // {
  //   title: 'Role',
  //   dataIndex: 'role',
  //   key: 'role'
  // }, 
  // {
  //   title: 'Branch Name',
  //   dataIndex: 'branch',
  //   key: 'branch',
  //   render: (branch: any) => {
  //     return branch.name;
  //   }
  // }, 
  {
    title: 'Status',
    dataIndex: 'active',
    key: 'active',
    render: (value: any, record: User) => {
      if (moment(record.tokenExpiredAt).isBefore(moment())) {
        return (
          <Tag color='red'>Verification Expired</Tag>
        );
      } else if (!record.password) {
        return (
          <Tag color='yellow'>Verification Pending</Tag>
        );
      } else {
        return (
          <Tag color={record.active ? "green" : "red"}>{record.active ? "Active" : "Inactive"}</Tag>
        );
      }
    },
  }, {
    title: "Action",
    render: (value: any, record: User) => {
      return (
        <ActionLayout size="middle">
          {(moment(record.tokenExpiredAt).isBefore(moment())) && <RiSendPlaneLine style={{ marginTop: '8px' }} className='iconAction' onClick={() => { handleResendVerificationEmail(record); }} />}
          {/* {(!user.action["USER_UPDATE"] && !user.action["USER_DELETE"]) &&
            <NADiv>Not Applicable</NADiv>
          } */}
          {user.action["USER_UPDATE"] &&
            <Tooltip title="Toggle Status">
              {record.active ?
                <LockOutlined className="iconAction" onClick={() => toggleActiveHandler(record.id, record.active)} /> :
                <UnlockOutlined className="iconAction" onClick={() => toggleActiveHandler(record.id, record.active)} />}
            </Tooltip>}
          {user.action["USER_DELETE"] && <Tooltip title="Delete User" >
            <DeleteOutlined className="iconAction delete" onClick={() => { onDeleteUserHandler(record); }} />
          </Tooltip>}
        </ActionLayout>
      );
    }
  }];

  const handleTableChange = (
    newPagination: TablePaginationConfig,
  ) => {
    setPagination(newPagination);
    fetchUser({
      URL: `${url}/users?page=${newPagination.current}&row=${newPagination.pageSize}`
    });
  };

  const handleAddUser = (values: any) => {
    setLoading(true);
    fetch(process.env.apiURL + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        if (!result.ok) {
          const message = typeof result.message === "string" ? result.message : "Something went wrong, please try again";
          return notification["error"]({
            message: 'Error Occurred',
            description: message,
          });
        }
        console.log("Success");
        message.success(result.message);
        handleOpenAddUser();
        fetchUser({
          URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`,
        });
      });
  };

  const handleEditPassword = (values: any) => {
    setLoading(true);
    fetch(`${process.env.apiURL}/user/password/${values.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ password: values.password })
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        if (!result.ok) {
          const message = typeof result.message === "string" ? result.message : "Something went wrong, please try again";
          return notification["error"]({
            message: 'Error Occurred',
            description: message,
          });
        }
        message.success(result.message);
        handleOpenEditUser();
        fetchUser({
          URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`,
        });
      });
  };

  const handleEditProfile = (values: any) => {
    setLoading(true);
    fetch(`${process.env.apiURL}/user/${values.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ username: values.username, role: values.role, branch: values.branch })
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        if (!result.ok) {
          const message = typeof result.message === "string" ? result.message : "Something went wrong, please try again";
          return notification["error"]({
            message: 'Error Occurred',
            description: message,
          });
        }
        message.success(result.message);
        handleOpenEditUser();
        fetchUser({
          URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`,
        });
      });
  };

  const onDeleteUserHandler = (user: User) => {
    Modal.confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: user.email + " will be deleted",
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      maskClosable: true,
      onOk: async () => {
        fetch(process.env.apiURL + "/user/" + user.id, {
          method: "DELETE",
          credentials: "include"
        })
          .then(res => res.json())
          .then(result => {
            if (!result.ok) {
              const message = typeof result.message === "string" ? result.message : "Something went wrong, please try again";
              return notification["error"]({
                message: 'Error Occurred',
                description: message,
              });
            }
            message.success(result.message);
            fetchUser({
              URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`,
            });
          });
      }
    });
  };

  const onEditUserHandler = (user: User) => {
    fetch(process.env.apiURL + `/user/${user.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(result => {
        if (!result.ok) {
          const message = typeof result.message === "string" ? result.message : "Something went wrong, please try again";
          return notification["error"]({
            message: 'Error Occurred',
            description: message,
          });
        }
        setUserInfo(result.data);
      });
  };

  const handleResendVerificationEmail = (user: User) => {
    setLoading(true);
    fetch(process.env.apiURL + `/user/resend-verification-email`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ userId: user.id })
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        if (!result.ok) {
          const message = typeof result.message === "string" ? result.message : "Something went wrong, please try again";
          return notification["error"]({
            message: 'Error Occurred',
            description: message,
          });
        }
        message.success(result.message);
        fetchUser({
          URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`,
        });
      });
  };

  const handleOpenAddUser = () => {
    setOpenAddUser(!openAddUser);
  };

  const handleOpenEditUser = () => {
    setOpenEditUser(!openEditUser);
  };

  const toggleActiveHandler = (id: string, currentActivation: boolean) => {
    fetch(process.env.apiURL + `/user/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ active: currentActivation })
    })
      .then(res => res.json())
      .then(result => {
        if (!result.ok) {
          const message = typeof result.message === "string" ? result.message : "Something went wrong, please try again";
          return notification["error"]({
            message: 'Error Occurred',
            description: message,
          });
        }
        message.success(result.message);
        fetchUser({
          URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`,
          reset: true
        });
      });
  };

  console.log(user);

  return (
    <>
    <Head>
      <title>Users | Unique</title>
    </Head>
      {/* <AddUser openAddUserForm={openAddUser} roleListFilters={roleListFilters} branchListFilters={branchListFilters} handleOpenAddUser={handleOpenAddUser} handleAddUser={handleAddUser} />
      <EditUser openEditUserForm={openEditUser} roleListFilters={roleListFilters} branchListFilters={branchListFilters} handleOpenEditUser={handleOpenEditUser} data={userInfo} handleEditPassword={handleEditPassword} handleEditProfile={handleEditProfile} /> */}
      <AddUser openAddUserForm={openAddUser} handleOpenAddUser={handleOpenAddUser} handleAddUser={handleAddUser} />
      {/* <EditUser openEditUserForm={openEditUser} handleOpenEditUser={handleOpenEditUser} data={userInfo} handleEditPassword={handleEditPassword} handleEditProfile={handleEditProfile} /> */}
      <Layout heading='Users' user={user}>
        <Container>
          <UserListBox>
            <CreateUser>
              {user.action["USER_ADD"] && <Button type='primary' icon={<PlusOutlined />} onClick={handleOpenAddUser}>Add User</Button>}
              {/* <Button type='primary' icon={<PlusOutlined />} onClick={handleOpenAddUser}>Add User</Button> */}
            </CreateUser>
            <SearchUser>
              <Row gutter={[16, 16]}>
                <Col style={{ width: "100%" }}>
                  <Input placeholder="Search by Email or Username" style={{ width: "100%", padding: '5px 11px' }} value={searchEmailUsername} onChange={e => setSearchEmailUsername(e.target.value)} />
                </Col>
              </Row>
            </SearchUser>
            <FilterUser>
              <Form className='responsive-form'>
                <Select
                  placeholder={'Select Status'}
                  className='select status'
                  value={filterStatus}
                  onChange={e => setFilterStatus(e)}>
                  <Select.Option value='true'>Active</Select.Option>
                  <Select.Option value='false'>Inactive</Select.Option>
                  <Select.Option value='pending'>Verification Pending</Select.Option>
                </Select>
                {/* <Select
                  placeholder={'Select Branch'}
                  className='select branch'
                  value={filterBranch}
                  onChange={e => setFilterBranch(e)}>
                  <Select.Option value="">-- Select Branch --</Select.Option>
                  {branchListFilters.map(branch =>
                    <Select.Option key={branch.id} value={branch.name}>{branch.name}</Select.Option>
                  )}
                </Select> */}
                {/* <Select
                  placeholder={'Select Role'}
                  className='select'
                  value={filterRole}
                  onChange={e => setFilterRole(e)}>
                  <Select.Option value="">-- Select Role --</Select.Option>
                  {roleListFilters.map(role =>
                    <Select.Option key={role.id} value={role.name}>{role.name}</Select.Option>
                  )}
                </Select> */}
                <Button type='primary' icon={<FilterOutlined />} className='select button' onClick={() => fetchUser({
                  URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`
                })}>Filter</Button>
                <Button className='select button' onClick={() => {
                  setSearchEmailUsername("");
                  // setFilterBranch(undefined);
                  setFilterRole(undefined);
                  setFilterStatus(undefined);
                  fetchUser({
                    URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`,
                    reset: true
                  });
                }}>Clear Filter</Button>
              </Form>
            </FilterUser>
            <div className='tableWrapper'>
              <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey={record => record.id}
                scroll={{ x: 900 }}
                pagination={{
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: [1, 10, 25, 50],
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                  total: pagination.total,
                }}
                loading={loading}
                onChange={handleTableChange}
              />
            </div>
          </UserListBox>
        </Container >
      </Layout >
    </>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await authentication(context, "USER");

  console.log(result.user);

  if (result.unauthorized) {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false
      }
    };
  }

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