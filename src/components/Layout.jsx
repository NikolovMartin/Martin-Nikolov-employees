import styled from 'styled-components';

export const Layout = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
