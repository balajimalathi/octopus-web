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

interface FeedbackShippedEmailProps {
  boardName: string;
  postTitle: string;
  postDescription: string;
  boardSlug: string;
  postId: string;
  appUrl: string;
  appName: string;
}

export const FeedbackShippedEmail = ({
  boardName = 'Your Board',
  postTitle = 'Feature Request',
  postDescription = 'Your feature request',
  boardSlug = 'board-slug',
  postId = 'post-id',
  appUrl = 'http://localhost:3000',
  appName = 'Octopus',
}: FeedbackShippedEmailProps) => {
  const postUrl = `${appUrl}/b/${boardSlug}?postId=${postId}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={celebrationBox}>
            <Text style={celebration}>🎉</Text>
          </Section>

          <Heading style={h1}>Your Feedback Has Been Shipped!</Heading>

          <Text style={text}>
            Great news! The feedback you submitted on <strong>{boardName}</strong> has been implemented and shipped.
          </Text>

          <Section style={feedbackBox}>
            <Heading as="h2" style={h2}>
              {postTitle}
            </Heading>
            <Text style={description}>{postDescription}</Text>
          </Section>

          <Text style={text}>
            Thank you for taking the time to share your feedback. Your input helps make our product better for everyone!
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={postUrl}>
              View Shipped Feedback
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

export default FeedbackShippedEmail;

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

const celebrationBox = {
  textAlign: 'center' as const,
  padding: '20px 0',
};

const celebration = {
  fontSize: '64px',
  margin: '0',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '20px 0 20px',
  padding: '0 40px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 10px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  marginBottom: '16px',
};

const feedbackBox = {
  backgroundColor: '#e8f5e9',
  borderRadius: '8px',
  margin: '24px 40px',
  padding: '24px',
};

const description = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};

const buttonContainer = {
  padding: '0 40px',
  marginTop: '24px',
};

const button = {
  backgroundColor: '#4caf50',
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
