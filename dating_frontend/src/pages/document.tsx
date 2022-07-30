import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="./UNIQUE Logo-01.png?" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
};