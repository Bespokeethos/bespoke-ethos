'use client';

import React from 'react';
import Button from '@/components/ui/Button'; // Import the custom Button component

export function ScheduleDemoForm() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Fill out the form below to schedule a demo. (Placeholder)
      </p>
      <form className="flex flex-col space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            id="company"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Your Company"
          />
        </div>
        <Button type="submit" className="w-full">
          Submit Request
        </Button>
      </form>
    </div>
  );
}
