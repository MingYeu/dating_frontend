import { message } from 'antd';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import SetPassword from '../../components/form/PasswordForm';
import React from 'react'

type VerifyEmailProps = {
  email: string;
  userId: string;
  token: string;
};

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, userId, token }) => {
  const onSubmit = (value: any, setLoading: any) => {
    fetch(process.env.apiURL + `/verifyPassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        password: value.password,
        userId,
        token
      }),
    }).then(res => res.json()).then(data => {
      if (!data.ok) {
        setLoading(false);
        return message.error(typeof data.message === 'string' ? data.message : "Something went wrong, please try again.");
      }

      message.success(data.message);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    });
  };

  return (
    <SetPassword email={email} button='Set Password' disabled onSubmit={onSubmit} />
  );
};

export default VerifyEmail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId, token } = context.query;

  const response = await fetch(process.env.apiURL + `/verifyToken/${userId}/${token}`, {
    method: 'GET',
  });

  let result = await response.json();

  if (!result.ok) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      }
    };
  }

  return {
    props: {
      email: result.email,
      userId,
      token
    }
  };
};