# Elnis Website

[English](README.md) | [Lietuvių](README.lt.md)

A modern, responsive website built with Next.js, PayloadCMS, and TailwindCSS.

## 🚀 Features

- Built with Next.js 15 and React 19
- PayloadCMS for content management
- TailwindCSS for styling
- TypeScript for type safety
- SQLite database
- Form builder plugin
- SEO optimization
- Live preview capabilities
- Responsive design
- Docker support

## 📋 Prerequisites

- Node.js (^18.20.2 or >=20.9.0)
- pnpm (v10.3.0)
- Docker (optional, for containerized deployment)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd elnis
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration.

## 🚀 Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Building for Production

Build the application:
```bash
pnpm build
```

Start the production server:
```bash
pnpm start
```

## 🐳 Docker Deployment

Build and run with Docker:
```bash
docker-compose up --build
```

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm reinstall` - Clean install dependencies

## 🛡️ Environment Variables

Create a `.env` file with the following variables (see `.env.example` for reference):

```env
PAYLOAD_SECRET=your-secret-key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## 📚 Tech Stack

- **Framework**: Next.js 15
- **CMS**: PayloadCMS
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Database**: SQLite
- **Package Manager**: pnpm
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form
- **Animations**: Framer Motion
- **Email**: SendGrid

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the repository or contact the maintainers.
