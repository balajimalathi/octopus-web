import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface FeedbackUpdateEmailProps {
  boardName: string;
  postTitle: string;
  updateType: 'comment' | 'status_change';
  updateContent: string;
  ownerName: string;
  boardSlug: string;
  postId: string;
  appUrl: string;
  appName: string;
}

export const FeedbackUpdateEmail = ({
  boardName = 'Your Board',
  postTitle = 'Feature Request',
  updateType = 'comment',
  updateContent = 'The owner has commented on your feedback.',
  ownerName = 'Board Owner',
  boardSlug = 'board-slug',
  postId = 'post-id',
  appUrl = 'http://localhost:3000',
  appName = 'Octopus',
}: FeedbackUpdateEmailProps) => {
  const postUrl = `${appUrl}/b/${boardSlug}?postId=${postId}`;
  const updateTitle = updateType === 'comment' ? 'New Comment' : 'Status Updated';

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{updateTitle} on Your Feedback</Heading>

          <Text style={text}>
            <strong>{ownerName}</strong> from <strong>{boardName}</strong> has updated your feedback:
          </Text>

          <Section style={feedbackBox}>
            <Heading as="h2" style={h2}>
              {postTitle}
            </Heading>
          </Section>

          <Section style={updateBox}>
            <Text style={updateLabel}>{updateTitle}:</Text>
            <Text style={updateText}>{updateContent}</Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={postUrl}>
              View Full Discussion
            </Button>
          </Section>

          <Text style={footer}>
            You received this email because you submitted feedback on {boardName}. Manage your notification preferences in your account settings.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default FeedbackUpdateEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
};

const feedbackBox = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '24px 40px',
  padding: '16px 24px',
};

const updateBox = {
  backgroundColor: '#e8f5e9',
  borderLeft: '4px solid #4caf50',
  borderRadius: '4px',
  margin: '24px 40px',
  padding: '16px 24px',
};

const updateLabel = {
  color: '#2e7d32',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px',
};

const updateText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};

const buttonContainer = {
  padding: '0 40px',
  marginTop: '24px',
};

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
  marginTop: '32px',
};
