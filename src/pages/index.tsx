import Head from "next/head";
import styled from "styled-components";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(123, 92, 255, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(123, 92, 255, 0.03) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin-bottom: 2rem;
`;

const UserInfo = styled.div`
  background: ${({ theme }) => theme.accentMuted};
  border: 1px solid ${({ theme }) => theme.accent}40;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const UserField = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const FieldLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FieldValue = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${({ theme, $variant }) => $variant === 'secondary' ? 'transparent' : theme.accent};
  border: 1px solid ${({ theme, $variant }) => $variant === 'secondary' ? theme.border : theme.accent};
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme, $variant }) => $variant === 'secondary' ? theme.textSecondary : theme.background};
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  margin-top: 0.5rem;
  
  &:hover {
    background: ${({ theme, $variant }) => $variant === 'secondary' ? theme.surfaceHover : theme.accentHover};
    border-color: ${({ theme, $variant }) => $variant === 'secondary' ? theme.accent : theme.accentHover};
    color: ${({ theme, $variant }) => $variant === 'secondary' ? theme.accent : theme.background};
    transform: translateY(-2px);
    box-shadow: 0 4px 20px ${({ theme }) => theme.accentGlow};
  }
`;

const LoadingText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textMuted};
  text-align: center;
`;

export default function Home() {
  const { user, isLoading, signOut } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    signOut();
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Renaissance App Block Template</title>
          <meta name="description" content="Renaissance App Block Template" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Card>
            <Title>Loading...</Title>
            <LoadingText>Checking authentication status...</LoadingText>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Renaissance App Block Template</title>
        <meta name="description" content="Renaissance App Block Template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Card>
          <Title>Renaissance App Block</Title>
          <Subtitle>
            {user ? 'Welcome back!' : 'A template with phone + PIN authentication'}
          </Subtitle>
          
          {user ? (
            <>
              <UserInfo>
                <UserField>
                  <FieldLabel>Username</FieldLabel>
                  <FieldValue>{user.username || 'Not set'}</FieldValue>
                </UserField>
                <UserField>
                  <FieldLabel>Display Name</FieldLabel>
                  <FieldValue>{user.displayName || user.name || 'Not set'}</FieldValue>
                </UserField>
                <UserField>
                  <FieldLabel>Phone</FieldLabel>
                  <FieldValue>{user.phone || 'Not set'}</FieldValue>
                </UserField>
                <UserField>
                  <FieldLabel>Role</FieldLabel>
                  <FieldValue style={{ textTransform: 'capitalize' }}>{user.role}</FieldValue>
                </UserField>
                {user.accountAddress && (
                  <UserField>
                    <FieldLabel>Wallet</FieldLabel>
                    <FieldValue style={{ fontSize: '0.75rem' }}>
                      {user.accountAddress.slice(0, 6)}...{user.accountAddress.slice(-4)}
                    </FieldValue>
                  </UserField>
                )}
              </UserInfo>
              <Button $variant="secondary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => router.push('/login')}>
                Sign In
              </Button>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
