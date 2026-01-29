'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Zap,
  Palette,
  BarChart3,
  MessageSquare,
  ThumbsUp,
  Globe,
  Code,
  Layers,
  ArrowRight,
  Check,
} from 'lucide-react';
import Link from 'next/link';


export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-100/60 via-transparent to-transparent rounded-full blur-3xl -z-10" />

        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium">
              ✨ The #1 Feedback Collection Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Collect beautiful feedback
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                for any product
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform customer insights into action. Create stunning feedback boards
              that engage users, prioritize features, and build products people love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Link href="#features">
                <Button variant="outline" size="lg" className="gap-2 group">
                  See how it works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Cards Preview */}
          <div className="relative max-w-4xl mx-auto mt-16">
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 border">
              {/* Main preview card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    O
                  </div>
                  <div>
                    <h3 className="font-semibold">Feature Request Board</h3>
                    <p className="text-sm text-muted-foreground">12 new ideas this week</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <FeedbackPreviewCard
                    title="Dark mode support"
                    votes={47}
                    status="In Progress"
                    statusColor="bg-yellow-100 text-yellow-700"
                  />
                  <FeedbackPreviewCard
                    title="API integrations"
                    votes={32}
                    status="Planned"
                    statusColor="bg-blue-100 text-blue-700"
                  />
                  <FeedbackPreviewCard
                    title="Mobile app"
                    votes={28}
                    status="Open"
                    statusColor="bg-slate-100 text-slate-700"
                  />
                </div>
              </div>

              {/* Floating accent cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border animate-pulse">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-sm">+24 votes today</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-sm">15 new comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 px-4 border-y bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {['Vercel', 'Stripe', 'Notion', 'Linear', 'Figma', 'Discord'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-muted-foreground">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The most customizable and
              <br />
              fastest feedback solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to collect, organize, and act on customer feedback. Built for speed and flexibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Lightning Fast"
              description="Optimized for speed. Your feedback boards load instantly, keeping users engaged."
              gradient="from-yellow-500 to-orange-500"
            />
            <FeatureCard
              icon={<Palette className="h-6 w-6" />}
              title="Fully Customizable"
              description="Match your brand perfectly with custom themes, colors, fonts, and CSS support."
              gradient="from-pink-500 to-rose-500"
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Rich Analytics"
              description="Understand your users with detailed insights on votes, trends, and engagement."
              gradient="from-blue-500 to-indigo-500"
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Real-time Comments"
              description="Engage directly with users. Threaded comments keep conversations organized."
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6" />}
              title="Embed Anywhere"
              description="Drop a snippet on any website. Seamless integration with just a few lines of code."
              gradient="from-purple-500 to-violet-500"
            />
            <FeatureCard
              icon={<ThumbsUp className="h-6 w-6" />}
              title="Smart Voting"
              description="Let users upvote ideas. Automatically surface what matters most to your audience."
              gradient="from-cyan-500 to-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Integrations</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Feedback solutions for all
                <br />
                development and no-code tools
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you&apos;re a developer or using no-code platforms, Octopus integrates seamlessly with your existing workflow.
              </p>

              <Tabs defaultValue="developers" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="developers" className="gap-2">
                    <Code className="h-4 w-4" />
                    Developers
                  </TabsTrigger>
                  <TabsTrigger value="nocode" className="gap-2">
                    <Layers className="h-4 w-4" />
                    No-Code
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="developers" className="mt-6">
                  <div className="space-y-4">
                    <IntegrationItem
                      title="JavaScript SDK"
                      description="Full control with our lightweight SDK"
                    />
                    <IntegrationItem
                      title="REST API"
                      description="Programmatic access to all features"
                    />
                    <IntegrationItem
                      title="Webhooks"
                      description="Real-time notifications to your backend"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="nocode" className="mt-6">
                  <div className="space-y-4">
                    <IntegrationItem
                      title="Iframe Embed"
                      description="Copy-paste integration for any website"
                    />
                    <IntegrationItem
                      title="WordPress Plugin"
                      description="One-click install for WordPress sites"
                    />
                    <IntegrationItem
                      title="Webflow & Notion"
                      description="Native embeds for popular platforms"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <Badge variant="secondary">Preview</Badge>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm text-slate-600 overflow-x-auto">
                  <pre>{`<div id="octopus-widget"></div>
<script src="octopus.js"></script>
<script>
  new OctopusWidget({
    boardId: 'your-board-id',
    theme: 'auto'
  });
</script>`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 text-center text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Add unlimited feedback
                <br />
                boards for free
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Get started today with our generous free tier. No credit card required.
                Upgrade anytime as you grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="bg-white rounded-lg mb-3 px-6 border">
              <AccordionTrigger className="text-left font-medium">
                What is Octopus?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Octopus is a feedback collection platform that helps you gather, organize,
                and prioritize customer feedback. Create beautiful feedback boards, let users
                vote and comment, and build products your customers actually want.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-white rounded-lg mb-3 px-6 border">
              <AccordionTrigger className="text-left font-medium">
                How does the voting system work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Users can upvote feedback they find valuable. Each user gets one vote per item.
                The most popular ideas rise to the top, helping you understand what features
                matter most to your audience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-white rounded-lg mb-3 px-6 border">
              <AccordionTrigger className="text-left font-medium">
                Can I embed the feedback board on my website?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! You can embed your feedback board on any website using our JavaScript widget.
                Just copy a few lines of code and paste them into your site. The widget is fully
                customizable to match your brand.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-white rounded-lg mb-3 px-6 border">
              <AccordionTrigger className="text-left font-medium">
                Is there a free plan?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! We offer a generous free tier that includes unlimited feedback boards,
                voting, and comments. You can upgrade to a paid plan for additional features
                like custom branding and priority support.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="bg-white rounded-lg mb-3 px-6 border">
              <AccordionTrigger className="text-left font-medium">
                How do I customize the look of my board?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                In the board settings, you can customize colors, fonts, and themes. We support
                preset themes like Default and New York, plus you can add custom CSS for complete
                control over the styling.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 md:p-16 text-center text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Build better products
                <br />
                with customer feedback
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of teams using Octopus to collect and organize feedback.
                Start for free, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#features">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeedbackPreviewCard({
  title,
  votes,
  status,
  statusColor,
}: {
  title: string;
  votes: number;
  status: string;
  statusColor: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center bg-white rounded-lg px-3 py-2 shadow-sm border">
          <ThumbsUp className="h-4 w-4 text-blue-500 mb-1" />
          <span className="text-sm font-semibold">{votes}</span>
        </div>
        <span className="font-medium text-sm">{title}</span>
      </div>
      <Badge className={statusColor} variant="secondary">
        {status}
      </Badge>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardContent className="p-6">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function IntegrationItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Check className="h-4 w-4 text-green-600" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
