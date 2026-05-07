import styled from "styled-components";
import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <Wrapper>
      <Title>Access Denied</Title>
      <Text>You need to be signed in to view this page.</Text>
      <SignInBtn onClick={() => signIn("discord")}>
        Sign in with Discord
      </SignInBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-family: var(--heading-font);
  font-size: 28px;
  font-weight: 400;
  color: var(--color-text);
  margin: 0;
`;

const Text = styled.p`
  color: var(--color-text-muted);
  font-size: 15px;
  margin: 0;
`;

const SignInBtn = styled.button`
  background: var(--color-brand);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
