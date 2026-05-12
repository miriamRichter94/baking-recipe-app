import styled, { css } from "styled-components";

export default function Page({ width = "wide", children, ...rest }) {
  return (
    <PageContent $width={width} {...rest}>
      {children}
    </PageContent>
  );
}

function PageHeader({ align = "left", children, ...rest }) {
  return (
    <Header $align={align} {...rest}>
      {children}
    </Header>
  );
}

function PageTitle({ size = "default", children, ...rest }) {
  return (
    <Title $size={size} {...rest}>
      {children}
    </Title>
  );
}

function PageSubtitle({ children, ...rest }) {
  return <Subtitle {...rest}>{children}</Subtitle>;
}

Page.Header = PageHeader;
Page.Title = PageTitle;
Page.Subtitle = PageSubtitle;

const widthStyles = {
  wide: css`
    max-width: 960px;
    @media (min-width: 641px) {
      padding: 40px 32px;
    }
  `,
  narrow: css`
    max-width: 720px;
    @media (min-width: 641px) {
      padding: 36px 32px;
    }
  `,
};

const PageContent = styled.div`
  padding: 24px 20px;
  margin: 0 auto;
  ${({ $width }) => widthStyles[$width] ?? widthStyles.wide}
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 24px;

  @media (min-width: 641px) {
    margin-bottom: 40px;
    text-align: ${({ $align }) => ($align === "center" ? "center" : "left")};
  }
`;

const titleSizes = {
  default: css`
    font-size: 28px;
    @media (min-width: 641px) {
      font-size: 36px;
    }
  `,
  hero: css`
    font-size: 28px;
    white-space: pre-line;
    @media (min-width: 641px) {
      font-size: 42px;
    }
  `,
};

const Title = styled.h1`
  font-family: var(--heading-font);
  font-weight: 400;
  color: var(--color-text);
  margin: 0 0 8px;
  ${({ $size }) => titleSizes[$size] ?? titleSizes.default}
`;

const Subtitle = styled.p`
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1.5;
  margin: 0;

  @media (min-width: 641px) {
    font-size: 16px;
  }
`;
