# 🐙 Octopus - Feedback Collection Platform

A complete, production-ready feedback collection platform built with Next.js 16, competing with Canny, FeatureBase, and RightFeature.

## ✨ Features

### 🎯 Core Features
- **Create & Manage Boards** - Public or private feedback boards
- **Theme Customization** - Preset themes (Default, New York) + custom colors/fonts
- **Voting System** - Upvote feedback with atomic transaction handling
- **Comments** - Threaded comments with owner badges
- **Status Tracking** - Mark feedback as Open, In Progress, Planned, Shipped, or Closed
- **Embed Widget** - Iframe-based widget for external websites
- **Google OAuth** - Secure authentication via Better-auth
- **Admin Dashboard** - Platform-wide stats and management

### 🛡️ User Roles
- **End User** - View, vote, comment (requires sign-in)
- **Owner** - Create/manage boards, moderate content
- **Super Admin** - Full platform access

### 🎨 Customization
- Shadcn preset themes
- Custom primary colors
- Font family selection (Sans, Serif, Mono)
- Custom CSS support
- Theme preview in real-time

## 🚀 Quick Start

See [SETUP.md](./SETUP.md) for detailed setup instructions.

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon, Supabase, or local)
- Google OAuth credentials

### Installation

1. **Clone and install dependencies:**
```bash
pnpm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

3. **Run database migrations:**
```bash
pnpm db:push
```

4. **Start development server:**
```bash
pnpm dev
```

Visit http://localhost:3000

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: Better-auth with Google OAuth2
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Shadcn UI + Tailwind CSS 4
- **Forms**: Zod + React Hook Form
- **Query Params**: nuqs
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
octopus-web/
├── app/
│   ├── (marketing)/         # Landing page
│   ├── (dashboard)/         # Owner dashboard
│   ├── (board)/             # Public board views
│   ├── api/                 # API routes
│   └── embed/               # Embeddable widget
├── components/
│   ├── ui/                  # shadcn components
│   ├── auth/                # Authentication
│   ├── board/               # Board components
│   ├── feedback/            # Post/comment components
│   └── layout/              # Header, footer
├── lib/
│   ├── auth/                # Better-auth config
│   ├── db/                  # Database schemas & queries
│   └── validations/         # Zod schemas
└── public/embed/            # Widget JavaScript & CSS
```

## 🔧 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

pnpm db:push      # Push schema changes (dev)
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations (prod)
pnpm db:studio    # Open Drizzle Studio
```

## 🎯 Usage

### Creating a Board

1. Sign in with Google
2. Go to Dashboard → "Create Board"
3. Fill in board details (name, description, visibility)
4. Customize theme in Settings
5. Share the link or embed on your website

### Embedding a Board

```html
<div id="octopus-widget"></div>
<script src="https://yourdomain.com/embed/widget.js"></script>
<script>
  new OctopusWidget({
    boardId: 'your-board-id',
    container: 'octopus-widget',
    mode: 'iframe'
  });
</script>
```

### Managing Feedback

- **Vote**: Click the up arrow (requires sign-in)
- **Comment**: Expand post and add comment
- **Moderate**: Board owners can delete posts/comments
- **Status**: Owners can mark posts as Shipped, In Progress, etc.

## 🔐 Security

- CSRF protection via Better-auth
- SQL injection prevention (Drizzle ORM)
- XSS prevention (React auto-escaping)
- Role-based access control
- Secure session management

## 📊 Database Schema

- **Users** - Authentication and roles
- **Boards** - Feedback boards with theme config
- **Posts** - Feedback with status and vote count
- **Votes** - Unique vote tracking
- **Comments** - Threaded comments
- **Notifications** - (Ready for email integration)

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 📝 Environment Variables

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Auth secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `NEXT_PUBLIC_APP_URL` - Your app URL
- `NEXT_PUBLIC_APP_NAME` - Your app name

## 🔮 Future Enhancements

- [ ] Email notifications (Resend integration)
- [ ] Multilingual support (next-intl)
- [ ] Payment integration (Dodo Payments)
- [ ] Rich text editor
- [ ] File attachments
- [ ] Roadmap view
- [ ] AI-powered features

## 📄 License

This is a private project. All rights reserved.

---

**Built with ❤️ using Next.js 16, Better-auth, and Drizzle ORM**
