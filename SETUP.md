# Octopus Feedback Platform - Setup Guide

## 🎉 What's Been Built

A complete, production-ready feedback collection platform with:

### ✅ Core Features Implemented
- **Authentication**: Better-auth with Google OAuth2
- **Board Management**: Create, customize, and manage feedback boards
- **Feedback System**: Submit, vote, comment on feedback posts
- **Theme Customization**: Preset themes (Default, New York) + custom colors/fonts
- **Embed Widget**: Iframe-based widget for external websites
- **Admin Dashboard**: Platform-wide analytics and management
- **Role-Based Access**: User, Owner, Admin, Super Admin roles
- **Moderation Tools**: Delete posts/comments (owner only)
- **Landing Page**: Professional marketing site

### 🗄️ Database Schema
Complete PostgreSQL schema with:
- Users, accounts, sessions (Better-auth)
- Boards (with JSONB theme config)
- Posts (with status enum)
- Votes (with unique constraint)
- Comments (with owner flag)
- Notifications (ready for email integration)

---

## 🚀 Quick Start

### 1. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env.local
```

Fill in your `.env.local`:
```env
# Database (Neon, Supabase, or local PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/octopus"

# Better Auth (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-32-character-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Octopus"
```

### 2. Database Setup

**Option A: Neon (Recommended)**
1. Sign up at https://neon.tech
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

**Option B: Local PostgreSQL with Docker**
```bash
docker run --name octopus-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=octopus \
  -p 5432:5432 \
  -d postgres:16
```

Then set: `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/octopus"`

**Run Migrations:**
```bash
pnpm db:push
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Add authorized redirect URI:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Secret to `.env.local`

### 4. Install Dependencies & Run

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000

---

## 📂 Project Structure

```
octopus-web/
├── app/
│   ├── (marketing)/          # Landing page
│   │   └── page.tsx
│   ├── (dashboard)/          # Authenticated pages
│   │   ├── dashboard/        # Owner dashboard
│   │   ├── boards/           # Board management
│   │   └── admin/            # Super admin panel
│   ├── (board)/              # Public board views
│   │   └── b/[slug]/
│   ├── api/                  # API routes
│   │   ├── auth/             # Better-auth
│   │   ├── boards/           # Board CRUD
│   │   ├── posts/            # Post CRUD + voting
│   │   └── comments/         # Comment CRUD
│   └── embed/[boardId]/      # Embeddable widget
├── components/
│   ├── ui/                   # shadcn components
│   ├── auth/                 # Auth components
│   ├── board/                # Board components
│   ├── feedback/             # Post/comment components
│   └── layout/               # Header, footer
├── lib/
│   ├── auth/                 # Better-auth config
│   ├── db/
│   │   ├── schema/           # Drizzle schemas
│   │   └── queries/          # Database queries
│   └── validations/          # Zod schemas
└── public/embed/             # Widget files
```

---

## 🎨 How to Use

### As a Board Owner

1. **Sign in with Google** on the homepage
2. **Create a board**: Dashboard → "Create Board"
3. **Customize theme**: Board Settings → Theme tab
   - Choose preset (Default/New York)
   - Customize colors and fonts
   - Add custom CSS
4. **Share board**: Copy the link from settings
5. **Embed on website**: Settings → Embed tab → Copy code

### As a User

1. Visit a public board (no sign-in required to view)
2. **Sign in to interact**: Vote, comment, submit feedback
3. **Submit feedback**: Fill out the form at the top
4. **Vote**: Click the up arrow on posts you like
5. **Comment**: Expand a post and add your thoughts

### As an Admin

1. **Access admin panel**: `/admin` (only for admin/super_admin roles)
2. **View stats**: Total users, boards, posts
3. **Manage users**: View recent signups
4. **Manage boards**: View all boards across platform

---

## 🔐 User Roles

- **user**: Can view public boards, vote, comment (requires sign-in)
- **owner**: Can create and manage their own boards
- **admin/super_admin**: Full platform access, admin dashboard

**To promote a user to admin:**
You'll need to manually update the database:
```sql
UPDATE users SET role = 'super_admin' WHERE email = 'your-email@example.com';
```

---

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Database
pnpm db:push          # Push schema changes (dev)
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations (prod)
pnpm db:studio        # Open Drizzle Studio

# Build
pnpm build            # Production build
pnpm start            # Start production server
```

---

## 🎯 Key Features in Detail

### Board Customization
- **Preset Themes**: Choose from Default or New York
- **Custom Colors**: Set primary color and background
- **Font Families**: Sans-serif, Serif, or Monospace
- **Custom CSS**: Add your own styles

### Voting System
- Atomic transactions for vote counting
- Unique constraint prevents duplicate votes
- Optimistic UI updates

### Comment System
- Owner comments are badged
- Threaded display with timestamps
- Real-time comment count

### Embed Widget
- Iframe-based (recommended for security)
- Auto-resizing via postMessage
- Fully responsive
- Theme inheritance from board

### Moderation (Owner Only)
- Delete posts
- Delete comments
- Soft deletes preserve data

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (your production domain)
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_APP_NAME`
4. Update Google OAuth redirect URI with production domain
5. Deploy!

### Database Migration (Production)

```bash
pnpm db:migrate
```

---

## 🔮 Future Enhancements (Not Yet Implemented)

These are ready for implementation but not built yet:

### Phase 7: Notifications & Email
- Resend integration
- Email templates (React Email)
- Notify owners of new feedback
- Notify users when posts are marked "Shipped"

### Phase 8: Multilingual Support
- next-intl setup
- Translation files (en, es, fr, de)
- Google Translate API integration
- Language switcher

### Payments & Tiers
- Dodo Payments integration
- 3-month free trial
- Tier-based feature gates

---

## 📝 Notes

### Database Indexes
All critical queries are indexed:
- `boards.slug` - Fast board lookup
- `posts.boardId, createdAt` - Recent posts
- `posts.boardId, voteCount` - Top voted posts

### Security
- CSRF protection via Better-auth
- SQL injection prevention (Drizzle parameterized queries)
- XSS prevention (React auto-escaping)
- Owner-only moderation checks

### Performance
- Server Components for initial render
- Client Components only for interactivity
- Optimistic UI updates for voting
- Minimal bundle size

---

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check `DATABASE_URL` is correct
- Ensure database is accessible
- Run `pnpm db:push` to create tables

### "Google OAuth not working"
- Verify redirect URI matches exactly
- Check Client ID and Secret
- Ensure Google+ API is enabled

### "Toaster not showing"
- Check that Sonner is properly installed: `pnpm add sonner`
- Verify Toaster component is in root layout

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review the implementation plan at `.claude/plans/`
3. Check database with `pnpm db:studio`

---

## 🎉 You're Ready!

Your Octopus Feedback Platform is fully functional and ready for production. Start by:

1. Setting up your database
2. Configuring Google OAuth
3. Running migrations
4. Creating your first board!

**Happy feedback collecting! 🐙**
