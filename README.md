# Social Formatter - Static Website

A client-side social media content formatter that transforms marketing copy into platform-specific posts with AI-powered optimization.

> **Deployment Status**: Ready for production deployment  
> **Last Updated**: November 10, 2025

## Features

- **Real-time Formatting**: Instant preview for 6 social media platforms
- **AI Optimization**: One-click content enhancement using OpenAI GPT-4o-mini
- **Session Storage**: Content persists until tab is closed or blurb changes
- **No Backend Required**: Pure static site with serverless API functions
- **Mobile Responsive**: Works perfectly on all device sizes

## Platform Support

| Platform | Character Limit | Features |
|----------|----------------|-----------|
| LinkedIn | 3,000 | Professional formatting |
| X (Twitter) | 280 | Concise, hashtag-optimized |
| Threads | 500 | Casual, engaging tone |
| Instagram | 2,200 | Visual-friendly format |
| Facebook | 63,206 | Comprehensive posts |
| BlueSky | 300 | Clean, modern style |

## Deployment

### Vercel (Recommended)

1. Clone this repository
2. Install dependencies: `npm install`
3. Set up environment variable in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
4. Deploy to Vercel: `vercel --prod`

### Local Development

1. Install dependencies: `npm install`
2. Create `.env.local` file with: `OPENAI_API_KEY=your_key_here`
3. Start development server: `npm run dev`
4. Open http://localhost:5173

## Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **API**: Vercel Serverless Functions
- **Storage**: Browser sessionStorage (auto-clearing)
- **AI**: OpenAI GPT-4o-mini for content optimization

## Cache Behavior

- Content cached in browser sessionStorage
- Cache automatically cleared when:
  - Browser tab is closed
  - New marketing blurb is entered
  - Page is refreshed
- No server-side storage or user accounts needed

## Environment Variables

Required for AI optimization feature:
- `OPENAI_API_KEY`: OpenAI API key for content optimization

## Build Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally

## Browser Support

Works in all modern browsers with sessionStorage support (IE8+).