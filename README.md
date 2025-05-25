# V4 Dashboard

A modern dashboard application built with Next.js 15, React 19, and shadcn/ui v4.

## Features

- 🎨 Beautiful, responsive dashboard layout with sidebar navigation
- 📊 Interactive charts and data visualization 
- 🎯 Data tables with sorting, filtering, and pagination
- 🌙 Dark/light mode support with theme switching
- 📱 Mobile-responsive design
- ⚡ Built with Next.js 15 and React 19
- 🎨 Styled with Tailwind CSS
- 🧩 UI components from shadcn/ui v4

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── dashboard/           # Dashboard pages and layout
│   │   ├── components/      # Dashboard-specific components
│   │   ├── data.json       # Sample data
│   │   ├── layout.tsx      # Dashboard layout with sidebar
│   │   ├── page.tsx        # Main dashboard page
│   │   └── theme.css       # Dashboard-specific styles
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Root page (redirects to dashboard)
│   └── themes.css          # Theme definitions
├── components/             # Shared UI components
├── lib/                    # Utility functions and configurations
├── registry/               # shadcn/ui component registry
└── public/                 # Static assets
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui v4** - Beautiful, accessible UI components
- **Recharts** - Charts and data visualization
- **Radix UI** - Primitive UI components
- **Lucide React** - Beautiful icons

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## License

MIT
