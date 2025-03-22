# P3MO User Management System

A responsive user management system built with Next.js 14 App Router, serving as a frontend for a user management application. This project simulates a backend connection via BFF (Next.js Route Handlers) and provides a fully functional UI for managing users.

## Tech Stack

- **Next.js 14 App Router** - For routing and server-side rendering
- **TailwindCSS** - For styling and responsive design
- **ShadCN UI** - Component library for consistent UI elements
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation for forms
- **Highcharts** - Data visualization for user statistics
- **Next.js Route Handlers** - BFF layer for API communication
- **Axios** - HTTP client wrapped in a custom hook (useApi)

## Features

- **Dashboard with Statistics**
  - Active vs. Inactive users chart
  - Role distribution chart (Admin/User/Guest)
  - Monthly registration trend chart

- **User List**
  - Paginated table with sorting functionality
  - Search and filter capabilities
  - Clickable rows for user details

- **User Creation**
  - Form with validation using React Hook Form + Zod
  - File upload for profile images
  - Real-time form feedback

- **User Detail Page**
  - Complete user information display
  - Print functionality (PDF generation through BFF)
  - Responsive layout

## Architecture

### Folder Structure

The project follows a clean and maintainable folder structure:

```
/src
  /app                  # Next.js App Router pages
    /api                # Route Handlers (BFF layer)
    /users              # Users list page
    /user/[id]          # User detail page
  /components           # Reusable React components
    /charts             # Chart components
    /dashboard          # Dashboard components
    /forms              # Form components
    /layout             # Layout components
    /ui                 # ShadCN UI components
    /users              # User-specific components
  /hooks                # Custom React hooks
  /lib                  # Utility functions and validations
  /types                # TypeScript type definitions
```

### BFF Layer

The Backend-For-Frontend (BFF) layer is implemented using Next.js Route Handlers located in the `/app/api` directory. These handlers:

1. Intercept frontend requests
2. Forward them to the backend (simulated in this demo)
3. Transform responses if needed
4. Return data to the frontend

This approach provides:
- Simplified frontend code
- Centralized API communication
- Ability to handle authentication and data transformation

### API Communication

All API calls are managed through a custom `useApi` hook that:
- Handles loading and error states
- Provides a consistent interface for GET, POST, PUT, DELETE operations
- Supports file uploads
- Manages API response parsing

### Form Validation

Forms are managed with React Hook Form and validated with Zod schemas, providing:
- Type-safe validation rules
- Real-time form validation
- Efficient form state management
- Customizable error messages

### PDF Generation

The PDF generation flow:
1. User clicks "Print" button on user detail page
2. Request goes to BFF layer (`/api/users/[id]/pdf`)
3. BFF would call backend (simulated)
4. Backend would use Playwright to render the page and generate a PDF
5. PDF is returned to the frontend for download

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/p3mo-user-crud.git
cd p3mo-user-crud
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Deployment

This application can be deployed on Vercel, Netlify, or any other hosting service that supports Next.js applications.

```bash
npm run build
npm start
```

## Implementation Decisions

### Server-Side Rendering (SSR)

SSR is used where applicable, especially for initial data loading. This improves:
- Page load performance
- SEO optimization
- Consistent UI rendering

### Responsive Design

The application follows a desktop-first approach but is fully responsive for mobile devices:
- Flexible grid layouts with Tailwind CSS
- Responsive components
- Mobile-friendly navigation

### Error Handling

Comprehensive error handling is implemented:
- Form validation errors
- API request errors
- Loading states
- User-friendly error messages

### Data Visualization

Highcharts was chosen for data visualization because:
- It's highly customizable
- Supports responsive charts
- Has good performance with large datasets
- Provides a rich set of chart types

## Future Improvements

- Implement user deletion functionality
- Add pagination for large user lists
- Implement real-time updates
- Add unit and integration tests
- Add more advanced filtering options
- Implement user roles and permissions
