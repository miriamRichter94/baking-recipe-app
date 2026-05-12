import styled from "styled-components";

export default function Card({ children, ...rest }) {
  return <CardSection {...rest}>{children}</CardSection>;
}

function CardTitle({ children, ...rest }) {
  return <Title {...rest}>{children}</Title>;
}

Card.Title = CardTitle;

const CardSection = styled.section`
  background: var(--color-surface-alt);
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 12px var(--color-shadow);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: var(--heading-font);
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 14px;
`;
