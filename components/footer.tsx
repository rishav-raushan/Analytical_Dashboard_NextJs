import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-6 flex flex-col items-center text-center">
        <p className="text-lg font-semibold">Rishav Raushan</p>
        <p className="text-muted-foreground">B.Tech (CSE) 4th Year</p>
        <p className="text-muted-foreground">Central University of Haryana</p>
      </div>
    </footer>
  );
}