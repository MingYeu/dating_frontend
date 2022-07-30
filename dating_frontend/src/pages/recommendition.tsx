import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from "react"
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { User } from '../types/user';
import { authentication } from '../utils/authentication';
import Gallery from 'react-grid-gallery';
import CSS from 'csstype';
import React from 'react'
import { UserOutlined, LockOutlined, EditOutlined, PlusOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons"
import { Tabs, Form, Input, Row, Col, notification, Select, Button, message } from "antd"
import Swal from 'sweetalert2';

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
    border-collapse: collapse;
    width: 100%;
    padding-top: 50px;
    border-top: 50px;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }

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
`;

const ButtonStyle = styled.div`
  float: right;
  padding-top: 50px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 80px;
`;

const Images = styled.div`
  padding-top: 50px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 80px;
  margin-bottom: 50px;
`;

const SwalCs = styled.div` 
  font-size: 1.6rem !important;
  font-family: Georgia, serif;
`;


const IMAGES =
[{
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      isSelected: true,
      caption: "After Rain (Jeshu John - designerspics.com)"
},
{
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
      caption: "Boats (Jeshu John - designerspics.com)"
},

{
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212
},
{
  src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
  thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 174,
  tags: [{value: "Nature", title: "Nature"}, {value: "Flora", title: "Flora"}],
  caption: "After Rain (Jeshu John - designerspics.com)"
},
{
  src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
  thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 212,
  caption: "Boats (Jeshu John - designerspics.com)"
},
{
  src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
  thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 212,
  caption: "Color Pencils (Jeshu John - designerspics.com)"
},
{
  src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
  thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
},
{
  src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
  thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 183,
  caption: "37H (gratispgraphy.com)"
},
{
  src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
  thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg",
  thumbnailWidth: 240,
  thumbnailHeight: 320,
  tags: [{value: "Nature", title: "Nature"}],
  caption: "8H (gratisography.com)"
},
{
  src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
  thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 190,
  caption: "286H (gratisography.com)"
},
{
  src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
  thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 148,
  tags: [{value: "People", title: "People"}],
  caption: "315H (gratisography.com)"
},
{
  src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
  thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  caption: "201H (gratisography.com)"
},
{
  src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
  alt: "Big Ben - London",
  thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
  thumbnailWidth: 248,
  thumbnailHeight: 320,
  caption: "Big Ben (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
  alt: "Red Zone - Paris",
  thumbnail: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 113,
  tags: [{value: "People", title: "People"}],
  caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
  alt: "Wood Glass",
  thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
  thumbnailWidth: 313,
  thumbnailHeight: 320,
  caption: "Wood Glass (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
  thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
  thumbnail: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 194,
  caption: "Old Barn (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
  alt: "Cosmos Flower",
  thumbnail: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  caption: "Cosmos Flower Macro (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
  thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
  thumbnailWidth: 271,
  thumbnailHeight: 320,
  caption: "Orange Macro (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
  thumbnail: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  tags: [{value: "Nature", title: "Nature"}, {value: "People", title: "People"}],
  caption: "Surfer Sunset (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
  thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  tags: [{value: "People", title: "People"}, {value: "Sport", title: "Sport"}],
  caption: "Man on BMX (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
  thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
  thumbnail: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  caption: "Time to Think (Tom Eversley - isorepublic.com)"
},
{
  src: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
  thumbnail: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 179,
  tags: [{value: "Nature", title: "Nature"}, {value: "Fauna", title: "Fauna"}],
  caption: "Untitled (Jan Vasek - jeshoots.com)"
},
{
  src: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
  thumbnail: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_n.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 215,
  tags: [{value: "People", title: "People"}],
  caption: "Untitled (moveast.me)"
}]


const Recommendition: React.FC<RecommenditionProps> = ({ user }) => {

  const [array, setArray] = useState<string[] | null>(null);
  const [count, setCount] = useState<number>(0);

  const ppl = [
    ["capton.png", "Youman", "Lim", "Female", "Malaysia", "Kuala Lumpur", "An Artist"],
      ["ironman.png", "Kate", "Chong", "Female", "Malaysia", "Kuala Lumpur", "An Artist"],
      ["capton.png", "Carmen", "Lim", "Female", "Malaysia", "Kuala Lumpur", "Love Swimming & Drawing"],
      ["ironman.png", "Kitty", "Low", "Female", "Malaysia", "Kuala Lumpur", "Play Game"],
      ["capton.png", "Ketty", "Saw", "Female", "Malaysia", "Kuala Lumpur", "An Artist"],
      ["ironman.png", "Bubblr", "Soo", "Female", "Malaysia", "Kuala Lumpur", "An Artist"]
  ];

  //Button Click Function
  const openSweetAlertRecommended = () =>
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Each day only 5 people can be recommended!',
    })
  }

  const openSweetMatch = () =>
  {
    Swal.fire({
      icon: 'success',
      title: 'Match!',
    })
  }
  

  const onEdit = () =>{
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  useEffect(() => {
      if(array !== null) return;
      nextPPL();
  }, [array])

  const nextPPL = () => {
    if (count < 5){
      setArray(ppl[count]);
      setCount(count + 1)
      onEdit();
    }
    else{
      openSweetAlertRecommended();
      // setArray(["capton.png", "0", "0", "0", "0", "0", "0"]);
    }
  }

  const h1Styles: CSS.Properties = {
    float: 'right',
    fontSize: '10px'
  };

  return (
    <Layout heading='Recommendition' user={user}>
        <Head>
            <title>Recommendition</title>
        </Head>
        <Container>
          {array !== null ? <ProfileBox>
                <img src={array[0]} alt="" />
                <h1>{array[1]}</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>{array[2]}</th>
                    </tr>
                    <tr>
                        <td>Sex</td>
                        <td>{array[3]}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{array[4]}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{array[5]}</td>
                    </tr>
                    <tr>
                        <td>Desctibe</td>
                        <td>{array[6]}</td>
                    </tr>
                    </table>  

                    <Images>
                      <Gallery images={IMAGES}/>  
                    </Images>

                    <ButtonStyle>
                      <ButtonStyle><Button type='primary' onClick={nextPPL} icon={<RightOutlined />}>Pass</Button></ButtonStyle>
                      <ButtonStyle><Button type='default' onClick={openSweetMatch} icon={<PlusOutlined />}>Match?</Button></ButtonStyle>
                    </ButtonStyle>
            </ProfileBox> : <div>Loading...</div>}
            
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