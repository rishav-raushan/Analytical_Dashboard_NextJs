'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { BarChart2, MessageSquare } from 'lucide-react';

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BarChart2 className="h-6 w-6" />
            <span className="font-bold">Analytics</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/dashboard' ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/chat"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/chat' ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              Support Chat
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild>
            <Link href="/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat Support
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}