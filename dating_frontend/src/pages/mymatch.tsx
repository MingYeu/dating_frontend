import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from "react"
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { User } from '../types/user';
import { authentication } from '../utils/authentication';
import React from 'react'
import space from 'antd/lib/space';
import { UserOutlined, LockOutlined, EditOutlined, DeleteOutlined, WhatsAppOutlined } from "@ant-design/icons"
import { Tabs, Form, Input, Row, Col, notification, Select, Button, message, Tooltip } from "antd"

interface RecommenditionProps {
  user: User;
}

const Container = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 20%;
  }

  table {
    font-family: arial, sans-serif;
    // border-collapse: collapse;
    width: 100%;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    img{
        width: 50px;
        height: 50px;
    }
  }
  
  th{
    background-color: #f3f3f3;
    // color: #ffffff;
    text-align: left;
    padding: 12px 15px;
  }

  td {
    // border: 1px solid #dddddd;
    // text-align: left;
    // padding: 8px;
    padding: 12px 15px;
  }
  
//   tr:nth-child(odd) {
//     background-color:#f2f2f2;
//   }

//   tr.active-row {
//     font-weight: bold;
//     color: #009879;
//     }
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

const Recommendition: React.FC<RecommenditionProps> = ({ user }) => {

  const [array, setArray] = useState<string[] | null>(null);

    const ppl = [
        ["ironman.png", "Kate", "Chong", "Female", "Malaysia", "Kuala Lumpur", "An Artist"],
        ["capton.png", "Carmen", "Lim", "Female", "Malaysia", "Kuala Lumpur", "Love Swimming & Drawing"],
        ["ironman.png", "Kitty", "Low", "Female", "Malaysia", "Kuala Lumpur", "Play Game"],
        ["capton.png", "Ketty", "Saw", "Female", "Malaysia", "Kuala Lumpur", "An Artist"],
        ["ironman.png", "Bubblr", "Soo", "Female", "Malaysia", "Kuala Lumpur", "An Artist"]
    ];

    useEffect(() => {
      if(array !== null) return;
  }, [array])

  return (
    <Layout heading='My Match' user={user}>
        <Head>
            <title>My Match</title>
        </Head>
        <Container>
            <ProfileBox>
                {/* <img src={firstppl[0]} alt="" /> */}
                <h1 >{ppl[0][1]}</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td><img src={ppl[0][0]} alt="" />{ppl[0][2]}</td>
                        <td>{ppl[0][3]}</td>
                        <td>{ppl[0][4]}</td>
                        <td>{ppl[0][5]}</td>
                        <td>
                            <ActionLayout size="middle">
                            <Tooltip title="Whatsapp Chat" >
                              <a target="_blank" href="https://api.whatsapp.com/send?phone=60192137004">
                              <WhatsAppOutlined/>
                              </a>
                            </Tooltip>
                            <Tooltip title="Delete User" >
                                <DeleteOutlined className="iconAction delete" />
                            </Tooltip>
                            </ActionLayout>
                        </td>
                    </tr>
                    <tr>
                        <td><img src={ppl[1][0]} alt="" />{ppl[1][2]}</td>
                        <td>{ppl[1][3]}</td>
                        <td>{ppl[1][4]}</td>
                        <td>{ppl[1][5]}</td>
                        <td>
                        <ActionLayout size="middle">
                        <Tooltip title="Whatsapp Chat" >
                              <a target="_blank" href="https://api.whatsapp.com/send?phone=60192137004">
                              <WhatsAppOutlined/>
                              </a>
                            </Tooltip>
                            <Tooltip title="Delete User" >
                                <DeleteOutlined className="iconAction delete" />
                            </Tooltip>
                            </ActionLayout>
                        </td>
                    </tr>
                    <tr>
                        <td><img src={ppl[2][0]} alt="" />{ppl[2][2]}</td>
                        <td>{ppl[2][3]}</td>
                        <td>{ppl[2][4]}</td>
                        <td>{ppl[2][5]}</td>      
                        <td>
                        <ActionLayout size="middle">
                        <Tooltip title="Whatsapp Chat" >
                              <a target="_blank" href="https://api.whatsapp.com/send?phone=60192137004">
                              <WhatsAppOutlined/>
                              </a>
                            </Tooltip>
                            <Tooltip title="Delete User" >
                                <DeleteOutlined className="iconAction delete" />
                            </Tooltip>
                            </ActionLayout>
                        </td> 
                    </tr>
                    <tr>
                        <td><img src={ppl[3][0]} alt="" />{ppl[3][2]}</td>
                        <td>{ppl[3][3]}</td>
                        <td>{ppl[3][4]}</td>
                        <td>{ppl[3][5]}</td>
                        <td>
                        <ActionLayout size="middle">
                        <Tooltip title="Whatsapp Chat" >
                              <a target="_blank" href="https://api.whatsapp.com/send?phone=60192137004">
                              <WhatsAppOutlined/>
                              </a>
                            </Tooltip>
                            <Tooltip title="Delete User" >
                                <DeleteOutlined className="iconAction delete" />
                            </Tooltip>
                            </ActionLayout>
                        </td>
                    </tr>
                    <tr>
                        <td><img src={ppl[4][0]} alt="" />{ppl[4][2]}</td>
                        <td>{ppl[4][3]}</td>
                        <td>{ppl[4][4]}</td>
                        <td>{ppl[4][5]}</td>
                        <td><ActionLayout size="middle">
                        <Tooltip title="Whatsapp Chat" >
                              <a target="_blank" href="https://api.whatsapp.com/send?phone=60192137004">
                              <WhatsAppOutlined/>
                              </a>
                            </Tooltip>
                            <Tooltip title="Delete User" >
                                <DeleteOutlined className="iconAction delete" />
                            </Tooltip>
                            </ActionLayout>
                        </td>
                    </tr>
                    </table>  
            </ProfileBox>
        </Container>
    </Layout>
  );
};

export default Recommendition;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await authentication(context);
  console.log(result.user);

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