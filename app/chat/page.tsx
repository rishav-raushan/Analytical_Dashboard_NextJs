'use client';

import { useState, useEffect, useRef } from 'react';
import { NavBar } from '@/components/nav-bar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import type { Message } from '@/lib/types';

const INACTIVITY_TIMEOUT = 30000; // 30 seconds

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      timestamp: new Date().toISOString(),
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [lastActivity, setLastActivity] = useState(Date.now());
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity > INACTIVITY_TIMEOUT) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            content: 'Is there anything specific you\'d like to know about our analytics dashboard?',
            timestamp: new Date().toISOString(),
            sender: 'bot',
          },
        ]);
        setLastActivity(Date.now());
      }
    }, 5000);

    return () => clearInterval(checkInactivity);
  }, [lastActivity]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        content: input,
        timestamp: new Date().toISOString(),
        sender: 'user',
      },
    ]);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Thank you for your message. Our team will assist you shortly.',
          timestamp: new Date().toISOString(),
          sender: 'bot',
        },
      ]);
    }, 1000);

    setInput('');
    setLastActivity(Date.now());
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto p-4">
        <Card className="max-w-4xl mx-auto">
          <div className="h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Support Chat</h2>
              <p className="text-sm text-muted-foreground">
                Get help with your analytics dashboard
              </p>
            </div>
            
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.content}</p>
                      <time className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}