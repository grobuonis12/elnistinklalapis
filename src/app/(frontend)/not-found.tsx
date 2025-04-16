"use client";

import React from 'react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button 
        variant="default"
        onClick={handleHomeClick}
      >
        <a href="/">Go home</a>
      </Button>
    </div>
  )
}
