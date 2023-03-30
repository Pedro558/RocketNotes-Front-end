import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

export const Form = styled.form`
  padding: 0 136px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  text-align: center;

  > h1{
    font-size: 48px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > h2{
    font-size: 24px;
    margin-top: 84px;
    margin-bottom: 24px;
  }

  >p{
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  >a{
    margin-top: 124px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`