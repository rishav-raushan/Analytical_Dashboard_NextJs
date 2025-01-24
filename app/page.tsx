import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Analytics Dashboard
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Real-time analytics and insights with integrated support chatbot.
            Monitor your metrics and get assistance when you need it.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button size="lg">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" size="lg">
                Open Support Chat
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Monitor your metrics in real-time with beautiful visualizations and instant updates.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Smart Support</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Get instant help from our AI-powered chatbot that understands your context.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Dark Mode</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Switch between light and dark themes for comfortable viewing any time of day.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}