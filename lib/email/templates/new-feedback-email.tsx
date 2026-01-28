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

interface NewFeedbackEmailProps {
  boardName: string;
  postTitle: string;
  postDescription: string;
  authorName: string;
  boardSlug: string;
  postId: string;
  appUrl: string;
  appName: string;
}

export const NewFeedbackEmail = ({
  boardName = 'Your Board',
  postTitle = 'New Feature Request',
  postDescription = 'This is a new feedback post.',
  authorName = 'Anonymous User',
  boardSlug = 'board-slug',
  postId = 'post-id',
  appUrl = 'http://localhost:3000',
  appName = 'Octopus',
}: NewFeedbackEmailProps) => {
  const postUrl = `${appUrl}/b/${boardSlug}?postId=${postId}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Feedback on {boardName}</Heading>

          <Text style={text}>
            <strong>{authorName}</strong> just submitted new feedback on your board:
          </Text>

          <Section style={feedbackBox}>
            <Heading as="h2" style={h2}>
              {postTitle}
            </Heading>
            <Text style={description}>{postDescription}</Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={postUrl}>
              View Feedback
            </Button>
          </Section>

          <Text style={footer}>
            You received this email because you own the board "{boardName}" on {appName}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NewFeedbackEmail;

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
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 10px',
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
