# SLR Articles Web

**SLR Articles Web** is a sophisticated tool designed to streamline and accelerate the process of **Systematic Literature Reviews (SLR)**. By leveraging the power of **Google Gemini AI**, this application automates the extraction of critical data from scientific papers, enabling researchers to focus on analysis rather than manual data entry.

## 🚀 Key Features

- **📄 Intelligent Document Analysis**: Upload PDF files or provide URLs to scientific articles for instant processing.
- **🤖 AI-Powered Extraction**: Utilizes Google's Gemini models to accurately extract:
  - **Metadata**: Title, Year, Source, ISSN, Quartiles, Publication Type.
  - **Authors**: Names, Affiliations, and h-index.
  - **Content**: Structured abstracts, keywords, and conclusions.
- **📊 Visual Analytics**:
  - **Word Frequency Charts**: Visualize key themes and topics.
  - **Citation Metrics**: Analyze citation trends over time.
- **🌍 Internationalization (i18n)**: Fully localized interface supporting **English**, **Spanish**, and **Czech**.
- **🎨 Modern Experience**: Built with a responsive design, featuring **Dark/Light mode** support for comfortable reading in any environment.

## 🛠️ Tech Stack

This project is built with a modern, high-performance technology stack:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: 
  - [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
  - [Material UI](https://mui.com/) (Components & Icons)
- **Visualization**: 
  - [Recharts](https://recharts.org/)
  - [MUI X Charts](https://mui.com/x/react-charts/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Validation**: [Zod](https://zod.dev/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Version 20 or higher is recommended.
- **Package Manager**: npm, yarn, pnpm, or bun.
- **Gemini API Key**: You need a valid API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Flavio-Ore/slr-articles-web.git
    cd slr-articles-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Google Gemini API key:

    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### Running the Application

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── [locale]/        # Localized routes
│   │   └── (slr)/       # Main SLR feature routes
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn UI primitives
│   └── ...
├── config/              # Configuration files (AI, etc.)
├── i18n/                # Internationalization setup
├── lib/                 # Utility functions
├── messages/            # Translation JSON files (en, es, cs)
├── schemas/             # Zod schemas for data validation
└── utils/               # Helper scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
