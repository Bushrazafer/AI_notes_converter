# 📝 AI Notes App

A modern, intelligent note-taking application powered by **Groq AI** (Llama 3.3 70B model). Create, edit, and enhance your notes with AI-powered features like summarization, translation, and content improvement.

![AI Notes App](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-19.2-61dafb) ![Vite](https://img.shields.io/badge/Vite-8.0-646cff) ![Groq](https://img.shields.io/badge/Groq-API-orange)

## ✨ Features

### 📋 Core Features
- **Create & Edit Notes** - Rich text editor with auto-save
- **Smart Search** - Quickly find notes by title or content
- **Tags System** - Organize notes with custom tags
- **Dark Mode** - Eye-friendly dark theme
- **Local Storage** - All notes saved locally in your browser

### 🤖 AI-Powered Features
- **📋 Summarize** - Get 3 bullet point summaries
- **✨ Improve** - Fix grammar and enhance clarity
- **💡 Explain** - Simplify complex content
- **📝 Expand** - Add more detail and examples
- **🌍 Translate** - Translate to 30+ languages including:
  - English, Urdu, Arabic
  - Spanish, French, German, Italian
  - Chinese, Japanese, Korean, Hindi
  - And many more!

### 🎨 UI/UX Features
- **Full-Screen AI Results** - Beautiful modal display for AI responses
- **Copy to Clipboard** - One-click copy functionality
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Polished user experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A free Groq API key ([Get it here](https://console.groq.com/keys))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Bushrazafer/AI_notes_converter.git
cd AI_notes_converter
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Groq API key
VITE_GROQ_API_KEY=your_groq_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:5173
```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `Bushrazafer/AI_notes_converter`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (or leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - **Key**: `VITE_GROQ_API_KEY`
   - **Value**: Your Groq API key
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add your VITE_GROQ_API_KEY when asked
```

### Important: Environment Variables on Vercel

After deployment, make sure to add your environment variable:

1. Go to your project on Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Name**: `VITE_GROQ_API_KEY`
   - **Value**: Your Groq API key
   - **Environment**: Production, Preview, Development
4. Redeploy your project

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## 🛠️ Tech Stack

- **Frontend**: React 19.2 + Vite 8.0
- **Styling**: Custom CSS with CSS Variables
- **AI**: Groq API (Llama 3.3 70B Versatile)
- **State Management**: React Context API
- **Storage**: Browser LocalStorage
- **Notifications**: React Hot Toast
- **Icons**: Emoji-based

## 📁 Project Structure

```
ai-notes-app/
├── src/
│   ├── components/
│   │   ├── AIPanel.jsx          # AI features sidebar
│   │   ├── AIResultModal.jsx    # Full-screen AI result display
│   │   ├── Editor.jsx            # Note editor
│   │   ├── Sidebar.jsx           # Notes list
│   │   ├── Toolbar.jsx           # Editor toolbar
│   │   ├── NoteCard.jsx          # Note preview card
│   │   └── Modal.jsx             # Confirmation dialogs
│   ├── context/
│   │   └── NotesContext.jsx      # Global state management
│   ├── services/
│   │   └── aiService.js          # Groq AI integration
│   ├── utils/
│   │   └── storage.js            # LocalStorage utilities
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # Global styles
│   └── main.jsx                  # App entry point
├── public/                       # Static assets
├── .env.example                  # Environment variables template
└── package.json                  # Dependencies
```

## 🔑 Getting a Groq API Key

1. Visit [Groq Console](https://console.groq.com)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy your key and add it to `.env`

**Note**: Groq offers free API access with generous rate limits!

## 🎯 Usage Tips

1. **Create a Note**: Click the `+` button in the sidebar
2. **Write Content**: Type your note in the editor
3. **Use AI Features**: Select any AI action from the right panel
4. **View Results**: AI responses appear in a full-screen modal
5. **Apply or Copy**: Choose to apply the result to your note or copy it
6. **Add Tags**: Type tags at the bottom of the editor (press Enter)
7. **Search**: Use the search bar to filter notes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Bushra Zafer**
- GitHub: [@Bushrazafer](https://github.com/Bushrazafer)

## 🙏 Acknowledgments

- [Groq](https://groq.com) for the amazing AI API
- [Vite](https://vitejs.dev) for the blazing fast build tool
- [React](https://react.dev) for the UI framework

---

Made with ❤️ and AI
