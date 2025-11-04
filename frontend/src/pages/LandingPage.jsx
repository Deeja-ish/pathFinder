import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Import shadcn components & icons
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'; 
import {
  Check,
  BrainCircuit,
  Search,
  GraduationCap,
  Sparkles,
  BookOpen,
  Target,
  Users,
  Languages,
  HelpCircle,
  ArrowRight
} from 'lucide-react'; // Added new icons

const LandingPage = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- Header / Navigation --- */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6" />
            <span className="font-bold text-lg">PathFinder AI</span>
          </Link>
          <div className="flex items-center space-x-2">
            {userInfo ? (
              <Button className="" variant="default" size="sm" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="" variant="default" size="sm" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="flex-1">
        {/* --- Hero Section --- */}
        <section className="container flex flex-col items-center justify-center text-center py-24 md:py-32 px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Stop Drowning in Information.
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-10">
            PathFinder AI transforms complex educational topics into simple, visual, and interactive learning paths. Your personal AI guide to mastering any subject.
          </p>
          {userInfo ? (
            <Button className="" variant="default" size="lg" asChild>
              <Link to="/dashboard">Go to Your Dashboard</Link>
            </Button>
          ) : (
            <Button className="" variant="default" size="lg" asChild>
              <Link to="/register">Start Learning for Free</Link>
            </Button>
          )}
        </section>

        {/* --- How It Works Section --- */}
        <section className="bg-muted/50 py-20 md:py-28 px-4 md:px-8">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="">
                <CardHeader className="items-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <Search className="h-8 w-8" />
                  </div>
                  <CardTitle className="">1. Start with a Topic</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Enter any subject you want to learn, from 'Quantum Physics' to 'The French Revolution'.
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="items-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <BrainCircuit className="h-8 w-8" />
                  </div>
                  <CardTitle className="">2. Get a Visual Map</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Our AI generates an interactive mind map, breaking down the topic into core concepts and nodes.
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="items-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <CardTitle className="">3. Learn & Understand</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Get a detailed, plain-English explanation of the entire topic, right alongside your map.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* --- NEW: Features in Detail Section --- */}
        <section className="py-20 md:py-28 px-4 md:px-8">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              A Smarter Way to Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex items-start space-x-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                  <BrainCircuit className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Visual Mind Maps</h3>
                  <p className="text-muted-foreground text-lg">
                    See the big picture. Our AI generates interactive graphs that show you how ideas connect, helping you build a strong mental model of any subject.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">AI-Powered Explanations</h3>
                  <p className="text-muted-foreground text-lg">
                    No more confusing textbooks. Get a comprehensive, easy-to-understand text explanation for your topic, right next to your visual map.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Advanced Learning Tools (Premium)</h3>
                  <p className="text-muted-foreground text-lg">
                    Go deeper with premium tools. Get advanced academic explanations with "Explain Deeper" or break language barriers with the "Translate" feature.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Save & Manage Your Learning</h3>
                  <p className="text-muted-foreground text-lg">
                    Build your personal knowledge library. Save every map and explanation you generate, and revisit them anytime from your personal dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW: Who It's For Section --- */}
        <section className="bg-muted/50 py-20 md:py-28 px-4 md:px-8">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Designed For Every Kind of Learner
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader className="">
                  <Users className="h-10 w-10 mx-auto text-primary" />
                  <CardTitle className="mt-4">Visual Learners</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  If you learn best by *seeing* how things are connected, our mind maps will be a game-changer for you.
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="">
                  <Target className="h-10 w-10 mx-auto text-primary" />
                  <CardTitle className="mt-4">Self-Directed Students</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Tackling a new skill or subject alone? Use PathFinder AI to create a structured curriculum on the fly.
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="">
                  <Languages className="h-10 w-10 mx-auto text-primary" />
                  <CardTitle className="mt-4">Non-Native Speakers</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Understand complex topics in your native language with our Premium "Translate" tool.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* --- Pricing / Tiers Section --- */}
        <section className="py-20 md:py-28 px-4 md:px-8">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Start for free, upgrade when you're ready for mastery.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Free Plan Card */}
              <Card className="flex flex-col">
                <CardHeader className="">
                  <CardTitle className="text-2xl">Access Plan</CardTitle>
                  <CardDescription className="">Perfect for casual learners and getting started.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-6">
                  <div className="text-4xl font-bold">$0<span className="text-xl font-normal text-muted-foreground">/ forever</span></div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Up to 5 AI Map Generations / month
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Full Interactive Visual Interface
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      "ELI5 (Explain Like I'm 5)" Tool
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Save & Manage Up to 3 Maps
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="">
                  <Button variant="outline" className="w-full h-10" size="md">
                    <Link to="/register">Get Started for Free</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan Card */}
              <Card className="border-primary flex flex-col">
                <CardHeader className="">
                  <CardTitle className="text-2xl">Mastery Plan</CardTitle>
                  <CardDescription className="">Unlock your full learning potential.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-6">
                  <div className="text-4xl font-bold">$2<span className="text-xl font-normal text-muted-foreground">/ month</span></div>
                  <ul className="space-y-3">
                    <li className="flex items-center font-semibold">
                      Everything in the Access Plan, plus:
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="h-5 w-5 text-primary mr-2" />
                      Unlimited AI Map Generations
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="h-5 w-5 text-primary mr-2" />
                      Save & Manage Unlimited Maps
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="h-5 w-5 text-primary mr-2" />
                      Premium AI Tools: 'Explain Deeper' & 'Translate'
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="h-5 w-5 text-primary mr-2" />
                      Priority Support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="">
                  <Button className="w-full h-10" variant="default" size="md">
                    <Link to="/register">
                      Upgrade to Mastery
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* --- NEW: FAQ Section --- */}
        <section className="bg-muted/50 py-20 md:py-28 px-4 md:px-8">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem className="" value="item-1">
                <AccordionTrigger className="text-lg">What is PathFinder AI?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  PathFinder AI is a web application that uses AI to turn complex subjects into simple, interactive mind maps and plain-English explanations. It's designed to make learning visual, faster, and more effective.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="" value="item-2">
                <AccordionTrigger className="text-lg">How is this different from just using an AI chatbot?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  A standard chatbot gives you a wall of text. PathFinder AI gives you a structured, interactive *visual* graph of the information, plus a detailed explanation. This helps you see the connections between ideas, which is crucial for true understanding.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="" value="item-3">
                <AccordionTrigger className="text-lg">How does the "Access Plan" (Free) work?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  The free Access Plan is designed to let you experience the core value of PathFinder AI. You can generate up to 5 complete map + explanation combos per month and save up to 3 of them to your dashboard.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="" value="item-4">
                <AccordionTrigger className="text-lg">What payment provider do you use?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  We use Paystack, a secure and trusted payment processor, to handle all subscriptions. We never see or store your credit card information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* --- NEW: Final CTA Section --- */}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Ready to Master Your Next Subject?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              Sign up today and get your first learning path in seconds.
            </p>
            <Button className="" variant="default" size="lg" asChild>
              <Link to="/register">
                Start Learning for Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="border-t">
        <div className="container py-8 text-center text-sm text-muted-foreground px-4 md:px-8">
          © {new Date().getFullYear()} PathFinder AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;