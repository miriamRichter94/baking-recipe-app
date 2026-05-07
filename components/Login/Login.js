import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <LoginWrapper>
        {session.user.image && (
          <Avatar
            src={session.user.image}
            width={24}
            height={24}
            alt={session.user.name}
          />
        )}
        <SignOutBtn onClick={() => signOut()}>Sign out</SignOutBtn>
      </LoginWrapper>
    );
  }

  return <SignInBtn onClick={() => signIn("discord")}>Sign in</SignInBtn>;
}

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
`;

const SignInBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-muted);
  padding: 0;

  &:hover {
    color: var(--color-brand);
  }
`;

const SignOutBtn = styled(SignInBtn)``;
