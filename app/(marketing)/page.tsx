import { SignInButton } from '@/components/auth/sign-in-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Zap, Globe, MessageSquare, TrendingUp, Settings } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Collect Feedback.
            <br />
            <span className="text-primary">Build Better Products.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The easiest way to collect, organize, and act on customer feedback.
            Create beautiful feedback boards in minutes.
          </p>
          <div className="flex gap-4 justify-center">
            <SignInButton />
            <Link href="#features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage feedback
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Collaborative"
              description="Let your users vote and comment on feedback. See what matters most to your customers."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Embeddable"
              description="Embed feedback boards anywhere with a simple JavaScript snippet. Seamless integration."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Multilingual"
              description="Reach global audiences with built-in translation support and auto-translate features."
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="Real-time Comments"
              description="Engage with your users directly. Comment on feedback and mark items as shipped."
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Vote & Prioritize"
              description="Let users upvote feedback. Easily see what features are most requested."
            />
            <FeatureCard
              icon={<Settings className="h-8 w-8" />}
              title="Customizable"
              description="Match your brand with custom themes, colors, and fonts. Full control over the look."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to start collecting feedback?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Try {process.env.NEXT_PUBLIC_APP_NAME || 'Octopus'} free for 3 months. No credit card required.
          </p>
          <SignInButton />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="space-y-8">
            <StepCard
              number="1"
              title="Create a Board"
              description="Set up a feedback board for your product in seconds. Customize the look to match your brand."
            />
            <StepCard
              number="2"
              title="Share or Embed"
              description="Share the link with your users or embed the board directly on your website."
            />
            <StepCard
              number="3"
              title="Collect & Prioritize"
              description="Users submit feedback, vote, and comment. You see what matters most and take action."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4 text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function StepCard({ number, title, description }: any) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
