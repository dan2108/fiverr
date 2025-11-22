# AI Fiverr Studio

A production-ready full-stack web application to help you deliver AI-powered Fiverr services fast. Generate social media content packs, TikTok scripts, and branding kits with ease.

## Features

### 🎯 Three Main Generators

1. **Social Media Content Packs** (`/social/new`)
   - Generate multiple social media posts with captions, hooks, hashtags, and CTAs
   - Support for Instagram, TikTok, Facebook, LinkedIn, Twitter/X, YouTube, Pinterest
   - Customizable tone of voice and objectives
   - Export as Markdown, TXT, or JSON

2. **TikTok / Short-Form Video Scripts** (`/scripts/new`)
   - Create engaging short-form video scripts
   - Includes hooks, script body, beats/timestamps, on-screen text suggestions
   - Optimized for 15s, 30s, 60s, and longer formats
   - Multiple content types: Informational, Storytime, Skits, Reviews, etc.

3. **Branding Kits** (`/branding/new`)
   - Generate brand names, taglines, color palettes, and font pairings
   - Tone of voice guidelines
   - Moodboard descriptions for visual design
   - Complete branding package in one generation

### 📊 Project Management

- Save all generated content to a database
- View, filter, and search projects
- Duplicate projects to regenerate with variations
- Export content in multiple formats

### 🎨 Modern UI

- Clean, minimal, agency dashboard style
- Mobile-friendly responsive design
- Built with shadcn/ui components
- Dark mode support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Prisma + SQLite (easily swappable to Postgres)
- **AI**: OpenAI-compatible API (OpenAI, Anthropic, etc.)
- **Deployment**: Optimized for Vercel

## Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   OPENAI_API_KEY="your-api-key-here"
   OPENAI_MODEL="gpt-4o-mini"  # Optional, defaults to gpt-4o-mini
   OPENAI_API_URL="https://api.openai.com/v1/chat/completions"  # Optional, for custom endpoints
   ```

4. **Set up the database**:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### OpenAI API Key

The app primarily reads the API key from `process.env.OPENAI_API_KEY`. You can also set it in the Settings page (stored locally in browser), but this is mainly for testing.

### Database

By default, the app uses SQLite. To switch to Postgres:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update your `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Custom AI Providers

The app uses OpenAI-compatible endpoints. You can use:
- OpenAI
- Anthropic (with adapter)
- Local models (Ollama, etc.)
- Any OpenAI-compatible API

Just set `OPENAI_API_URL` and `OPENAI_API_KEY` in your environment variables.

## Usage

### Creating a Social Media Content Pack

1. Navigate to **Social Content** → **New Content Pack**
2. Fill in the client brief:
   - Client name, business name, niche
   - Select platforms
   - Describe target audience
   - Choose tone of voice
   - Set number of posts (default: 30)
   - Add objectives and notes
3. Click **Generate Content**
4. Review the generated posts
5. Export using the copy/download buttons

### Creating TikTok Scripts

1. Navigate to **TikTok Scripts** → **New Script Pack**
2. Fill in the brief:
   - Client/channel name, niche
   - Content type, target audience
   - Video length, number of scripts
   - Hook style, CTA preferences
3. Click **Generate Scripts**
4. Review scripts in the accordion view
5. Copy individual scripts or export all

### Creating a Branding Kit

1. Navigate to **Branding Kits** → **New Branding Kit**
2. Fill in the brief:
   - Brand name (optional - leave empty to generate ideas)
   - Industry, keywords, target audience
   - Brand personality
   - Color preferences/restrictions
   - Toggle name generation
3. Click **Generate Branding Kit**
4. Review all branding assets
5. Export the complete kit

### Managing Projects

- View all projects on the **Projects** page
- Filter by type or search by client name/niche
- Click on any project to view full details
- Use **Duplicate & Regenerate** to create variations

## Project Structure

```
├── app/
│   ├── actions/          # Server actions
│   │   ├── generate.ts   # AI generation functions
│   │   └── projects.ts   # Project CRUD operations
│   ├── branding/         # Branding kit pages
│   ├── projects/         # Project list and detail pages
│   ├── scripts/          # TikTok scripts pages
│   ├── social/           # Social content pages
│   ├── settings/         # Settings page
│   ├── layout.tsx        # Root layout with navigation
│   └── page.tsx          # Dashboard
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Sidebar navigation
│   └── ...               # Other components
├── lib/
│   ├── aiClient.ts       # OpenAI API client
│   ├── prompts/          # AI prompt templates
│   │   ├── social.ts
│   │   ├── scripts.ts
│   │   └── branding.ts
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
└── prisma/
    └── schema.prisma     # Database schema
```

## Building for Production

```bash
npm run build
npm start
```

For Vercel deployment:
1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Database connection string | Yes | `file:./dev.db` |
| `OPENAI_API_KEY` | OpenAI API key | Yes | - |
| `OPENAI_MODEL` | Model to use | No | `gpt-4o-mini` |
| `OPENAI_API_URL` | API endpoint URL | No | `https://api.openai.com/v1/chat/completions` |

## Tips for Best Results

1. **Be Specific**: The more detailed your brief, the better the AI output
2. **Use Examples**: Reference specific styles or examples in extra notes
3. **Iterate**: Use the duplicate feature to generate variations
4. **Review**: Always review and refine AI-generated content before delivery
5. **Customize**: Adjust prompts in `lib/prompts/` to match your style

## Troubleshooting

### Database Issues
- Make sure you've run `npx prisma migrate dev`
- Check that `DATABASE_URL` is set correctly
- For SQLite, ensure write permissions in the project directory

### API Errors
- Verify `OPENAI_API_KEY` is set correctly
- Check your API quota/limits
- Ensure the model name is correct
- For custom endpoints, verify `OPENAI_API_URL` format

### Build Errors
- Run `npx prisma generate` after schema changes
- Clear `.next` folder and rebuild
- Check TypeScript errors with `npm run build`

## License

This project is private and proprietary.

## Support

For issues or questions, please check the Settings page for help documentation or review the code comments.

---

Built with ❤️ for fast Fiverr service delivery
