# P3MO User Management System

A responsive user management system built for the P3MO developer evaluation test.

## Current Implementation Status

This project is currently a work in progress. The following components have been implemented:

- Next.js 14/15 frontend with App Router
- TailwindCSS and ShadCN UI for styling
- React Hook Form with Zod validation for form handling
- Highcharts integration for data visualization
- API routes using Next.js route handlers (BFF layer)

The .NET backend implementation is planned but not yet started.

## Features

- Dashboard with user statistics and Highcharts visualization
- User management (list, create, edit, delete)
- User detail view with print functionality
- Form validation with React Hook Form and Zod
- Responsive design for all devices
- BFF architecture with Next.js route handlers

## Tech Stack

### Frontend (Implemented)
- Next.js 14/15 (App Router)
- TailwindCSS
- ShadCN UI components
- React Hook Form
- Zod validation
- Highcharts for data visualization
- Server-side rendering (SSR) where possible

## Getting Started

### Frontend
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/src                    # Frontend source files
  /app                  # Next.js App Router pages
  /components           # React components
  /hooks                # Custom React hooks
  /lib                  # Utility functions
  /services             # API services (BFF)
  /types                # TypeScript types
```

## Architecture

This application follows a BFF (Backend for Frontend) architecture:

1. The frontend (Next.js) never directly calls the .NET backend
2. All API calls go through the Next.js route handlers (BFF layer)
3. The BFF layer will communicate with the .NET backend (when implemented)

## PDF Generation (Planned)

The PDF generation feature will work as follows:

1. User clicks the print button on the frontend
2. Request goes through the BFF layer to the .NET backend
3. The .NET backend will use Playwright to capture the frontend page's exact layout
4. The captured page will be converted to PDF
5. The PDF will be sent back to the frontend for download