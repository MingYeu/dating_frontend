import styled from 'styled-components';
import React from 'react'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  section {
    width: 94%;
  }
`;

const Section = styled.section`
  h1 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 400;
  }
  > div {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 2.5rem;
    padding: 3rem;
  }
`;

type ContentProps = {
  children: React.ReactNode;
  heading: string;
};

const ContentWrapper: React.FC<ContentProps> = ({ children, heading }) => {
  return (
    <Container>
      <Section>
        <h1>{heading}</h1>
        <div>
          {children}
        </div>
      </Section>
    </Container>
  );
};

export default ContentWrapper;