import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import router from 'next/router';
// import React from 'react'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { authentication } from '../utils/authentication';
import { ResetPasswordEmail } from '../components/form/PasswordForm';
import { message, notification } from 'antd';
import Head from 'next/head';
import AddUser from '../components/form/UserForm';
import { PlusOutlined } from "@ant-design/icons";

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-items: center;
  background: white;
`;

const LoginBox = styled.div`
  max-width: 40rem;
  width: 100%;
  margin: auto;
  padding: 3rem 3rem;
  border-radius: 6px;
  box-shadow: 0 10px 20px rgb(0 0 0/ 19%), 0 6px 6px rgb(0 0 0/ 23%);
  transition: all 0.3s;
  .logo {
    // width: 50%;
    img {
      width: 150px;
      height: 130px;
      margin: 0 0 10px 80px;
    }
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: 1fr 1fr;
  label {
    display: block;
    font-size: 1.4rem;
    color: rgba(0,0,0,0.85);
    margin-bottom: 1rem;
    ::before {
      display: inline-block;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 1.4rem;
      line-height: 1;
      content: "*";
    }
  }
  input {
    width: 100%;
    padding: .6rem .8rem;
    font-size: 1.45rem;
    line-height: 1.45;
    border: 1.5px solid lightgray;
    border-radius: 2px;
    transition: all 0.3s;
    ::placeholder {
      color: #aaa;
    }
  }
`;

const ErrorMessage = styled.div<PasswordProps>`
  padding-bottom: .5rem;
  opacity: ${props => props.isValid ? '0' : '1'};
  pointer-events: ${props => props.isValid ? 'none' : 'auto'};
  visibility: ${props => props.isValid ? 'hidden' : 'visible'};
  font-size: 1.4rem;
  color: #ff4d4f;
  line-height: 1.45;
`;

const PasswordInput = styled.div<PasswordProps>`
  display: grid;
  grid-template-columns: 90fr 10fr;
  border: 1.5px solid lightgray;
  border-radius: 2px;
  transition: all 0.3s;
  &:focus-within {
    border: ${props => props.isValid ? "1.5px solid #40a9ff" : "1.5px solid #ff4d4f"};
    box-shadow: ${props => props.isValid ? "0 0 0 2px rgb(24 144 255/20%)" : "0 0 0 2px rgb(255 77 79/20%)"};
    outline: 0;
  }
  input {
    border: none;
    outline: none;
    &:hover {
      border: none;
    }
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      height: 2rem;
      width: 2rem;
      color: rgba(0,0,0,.45);
      
      &:hover {
        cursor: pointer;
        color: #000;
      }
    }
  }
  &:hover, &:active {
    border-radius: 2px;
    border: ${props => props.isValid ? "1.5px solid #40a9ff" : "1.5px solid #ff4d4f"};
  } 
`;

const EmailInput = styled.div<PasswordProps>`
  input {
    &:hover, &:active {
      border-radius: 2px;
      border: ${props => props.isValid ? "1.5px solid #40a9ff" : "1.5px solid #ff4d4f"};
    }
    &:focus {
      border: ${props => props.isValid ? "1.5px solid #40a9ff" : "1.5px solid #ff4d4f"};
      box-shadow: ${props => props.isValid ? "0 0 0 2px rgb(24 144 255/20%)" : "0 0 0 2px rgb(255 77 79/20%)"};
      outline: 0;
    } 
  }
`;

const ForgetPassword = styled.div`
  color: #bbb;
  font-size: 1.4rem;
  font-weight: 400;
  transition: all 0.3s;
  margin-bottom: 1rem;
  &:hover {
    color: #40a9ff;
    cursor: pointer;
  }
`;

const Button = styled.button`
  font-size: 1.5rem;
  color: #fff;
  background-color: #1890ff;
  border: none;
  border-radius: 2px;
  padding: 1rem 1.5rem;
  line-height: 1.5;
  font-weight: 400;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

type PasswordProps = {
  isValid: boolean;
};

const Home: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordNotEmpty, setIsPasswordNotEmpty] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [openForgetPassword, setOpenForgetPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const savePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordNotEmpty(e.target.value.length !== 0);
    setIsPasswordValid(e.target.value.length >= 6);
  };

  const saveEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailEmpty(e.target.value.length !== 0);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const credentialValues = {
      email: email,
      password: password
    };

    async function fetchData() {
      await fetch(process.env.apiURL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(credentialValues)
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
          router.push("/dashboard");
        });
    }
    fetchData();
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
        // fetchUser({
        //   URL: `${url}/users?page=${pagination.current}&row=${pagination.pageSize}`,
        // });
      });
  };

  const handleOpenAddUser = () => {
    setOpenAddUser(!openAddUser);
  };

  const onForgetPassword = () => {
    setOpenForgetPassword(!openForgetPassword);
  };

  return (
    <>
    <AddUser openAddUserForm={openAddUser} handleOpenAddUser={handleOpenAddUser} handleAddUser={handleAddUser} />
      <Head>
          <title>Login | Unique</title>
      </Head>
      {openForgetPassword && <ResetPasswordEmail button='Send Verification Email' onForgetPassword={onForgetPassword} />}
      <Container>
        <LoginBox>
          <div className="logo">
            <img src="dating_logo.png" alt="logo" />
          </div>
          <Form onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="email">Email</label>
              <EmailInput isValid={isEmailEmpty}>
                <input
                  type="email"
                  id="email"
                  placeholder='test@example.com'
                  value={email || ''}
                  required
                  onChange={saveEmail}
                />
                <ErrorMessage isValid={isEmailEmpty}>
                  Email is required
                </ErrorMessage>
              </EmailInput>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div>
                <PasswordInput isValid={isPasswordValid}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder='Must be at least 6 characters'
                    required
                    value={password || ''}
                    onChange={savePassword}
                  />
                  <div>
                    {showPassword ?
                      <IoEyeOutline className='icon' onClick={() => { togglePassword(); }} /> :
                      <IoEyeOffOutline className='icon' onClick={() => { togglePassword(); }} />}
                  </div>
                </PasswordInput>
                {!isPasswordNotEmpty && <ErrorMessage isValid={isPasswordNotEmpty}>Password is required</ErrorMessage>}
                {(isPasswordNotEmpty && !isPasswordValid) && <ErrorMessage isValid={isPasswordValid}>Password must be at least 6 characters</ErrorMessage>}
              </div>
            </div>
            <ForgetPassword onClick={onForgetPassword}>
              Forget Password?
            </ForgetPassword>
            <ForgetPassword onClick={handleOpenAddUser}>
              Register?
            </ForgetPassword>
            <Button type='submit'>Sign In</Button>
          </Form>
        </LoginBox>
      </Container >
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await authentication(context);

  if (result.ok) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      }
    };
  }

  return {
    props: {
      // props to pass to the page component as props
    }
  };
};