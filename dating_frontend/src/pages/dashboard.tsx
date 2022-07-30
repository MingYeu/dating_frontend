import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from "react"
import Layout from '../components/layout/Layout';
import { User } from '../types/user';
import { authentication } from '../utils/authentication';
import commaNumber from "comma-number"
import React from 'react'

// Ant Design 
import { Row, Col, notification, Skeleton, Divider } from "antd"
import styled from 'styled-components';

// Components
// import BarChart from "../components/BarChart"

import { AiOutlineSafetyCertificate } from "react-icons/ai"

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const DashboardBox = styled.div`
    width: 100%;
    max-width: 120rem;

    .searching_and_filtering {
        margin-top: 20px;
    }

    .table_wrapper {
        margin-top: 50px;
    }

    .total_warranty, .my_branch_warranty {
        width: 100%;
        background-color: #1890ff;
        border-radius: 5px;
        padding: 20px;
        color: white;

        .iconWrapper .icon {
            font-size: 25px;
        }

        .number {
            margin-top: 10px;
            font-size: 25px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .description {
            font-size: 12px;
            letter-spacing: 1px;
        }
    }

    .my_branch_warranty {
        background-color: #f64e60
    }
`

interface DashboardProps {
  user: User;
}


const Dashboard: React.FC<DashboardProps> = ({ user }) => {

  // const [totalWarranty, setTotalWarranty] = useState(0);
  // const [totalMyBranchWarranty, setTotalMyBranchWarranty] = useState(0);
  // const [dataByBranch, setDataByBranch] = useState<any>([]);
  // const [chartData, setChartData] = useState<any>(null);

  // useEffect(() => {
  //   fetch(`${process.env.apiURL}/statByBranch`, {
  //     method: "GET",
  //     credentials: "include"
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     if(!data.ok) {
  //       return notification.error({
  //         message: "Error",
  //         description: typeof data.message === "string" ? data.message : "Something went wrong, please try again", 
  //       })
  //     }
  //     setTotalMyBranchWarranty(data.data.totalWarranty)
  //   })
  //   .catch(err => {
  //     return notification.error({
  //       message: "Error",
  //       description: typeof err === "string" ? err : "Something went wrong, please try again", 
  //     })
  //   })

  //   fetch(`${process.env.apiURL}/detailStat`, {
  //     method: "GET",
  //     credentials: "include"
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     if(!data.ok) {
  //       return notification.error({
  //         message: "Error",
  //         description: typeof data.message === "string" ? data.message : "Something went wrong, please try again", 
  //       })
  //     }
  //     setTotalWarranty(data.data.totalWarranty)
  //     setDataByBranch(data.data.barChartData)
      
      
  //   })
  //   .catch(err => {
  //     return notification.error({
  //       message: "Error",
  //       description: typeof err === "string" ? err : "Something went wrong, please try again", 
  //     })
  //   })
  // }, [])

  // useEffect(() => {
  //   if(dataByBranch.length > 0) {
  //     setChartData({
  //       labels: dataByBranch.map((item: any) => item.name),
  //       dataSets: [{
  //         label: "Warranty By Branches",
  //         data: dataByBranch.map((item: any) => item.total)
  //       }]
  //     })
  //   }
  // }, [dataByBranch])

  return (
    <Layout heading='Dashboard' user={user}>
      <Head>
          <title>Dashboard | Unique</title>
      </Head>
      <Container>
        <DashboardBox>
            <Row gutter={[30, 0]}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <div className="my_branch_warranty">
                        <div className="iconWrapper">
                          <AiOutlineSafetyCertificate className="icon" />
                        </div>
                        <div className="number">
                          100
                            {/* {commaNumber(totalMyBranchWarranty)} */}
                        </div>
                        <div className="description">
                            Total Male
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <div className="total_warranty">
                        <div className="iconWrapper">
                          <AiOutlineSafetyCertificate className="icon" />
                        </div>
                        <div className="number">
                          100
                            {/* {commaNumber(totalWarranty)} */}
                        </div>
                        <div className="description">
                            Total Female
                        </div>
                    </div>
                </Col>
            </Row>
            {/* <Divider orientation="left" orientationMargin={0} style={{fontWeight: "bold", fontSize: 20 ,marginTop: 50}}>Warranty By Branch</Divider> */}
            {/* <Row gutter={[16, 0]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {chartData !== null && chartData !== undefined ? <BarChart chartData={dataByBranch} /> :<Skeleton active paragraph={{ rows: 8 }} /> }
                </Col>
            </Row> */}
        </DashboardBox>
      </Container>
    </Layout>
  );
};

export default Dashboard;

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