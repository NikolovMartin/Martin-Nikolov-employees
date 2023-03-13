import styled from 'styled-components';

export const Footer = () => (
  <Container>
    <p>All rights resered</p>
  </Container>
);

const Container = styled.footer`
  padding: 1rem 0;
  background-color: #3f2a2a34;

  p {
    margin: 0;
  }
`;
