<div align="center">
  
# Vox - Your Encrypted Thought.

**A web application that converts text to Morse code and generates authentic audio playback**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

---

## 🎯 About The Project

**Vox** is a sophisticated web application that bridges modern communication with classical telegraphy. It converts alphanumeric text (A-Z, 0-9) into International Morse Code and generates high-quality audio representations using the Web Audio API. Built with React and TypeScript, Vox features a premium glassy UI with a black and green color scheme, delivering both aesthetic appeal and functional excellence.

### Why Vox?

- **Educational Tool**: Perfect for learning Morse code
- **Accessibility**: Convert text to audio for various use cases
- **Historical Preservation**: Keep the art of Morse code alive
- **Modern Implementation**: Leverages cutting-edge web technologies

---

## ✨ Features

### Core Functionality

- 🔤 **Real-time Text Conversion** - Instant Morse code translation as you type
- 🔊 **Authentic Audio Generation** - Web Audio API creates genuine dot and dash tones
- 💾 **Audio Download** - Export Morse code as WAV files
- 📋 **One-click Copy** - Copy Morse code to clipboard
- ✅ **Input Validation** - Smart filtering of valid characters (A-Z, 0-9, spaces)
- 📚 **Reference Chart** - Interactive Morse code lookup table

### User Experience

- 🎨 **Premium Glassy UI** - Black background with vibrant green accents
- 💨 **Smooth Animations** - Professional, minimal transitions
- 📱 **Fully Responsive** - Seamless experience across all devices
- ♿ **Accessible Design** - WCAG compliant color contrasts
- ⚡ **Lightning Fast** - Powered by Vite for optimal performance

---

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe JavaScript
- **Vite 5.4.2** - Next-generation build tool
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Audio Processing

- **Web Audio API** - Native browser audio generation
- **Custom WAV Encoder** - PCM audio encoding to WAV format

### Development Tools

- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Vox Application                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │              │         │              │                   │
│  │  User Input  │────────▶│  Validation  │                  │
│  │   (Text)     │         │   (A-Z,0-9)  │                  │
│  │              │         │              │                   │
│  └──────────────┘         └───────┬──────┘                  │
│                                   │                          │
│                                   ▼                          │
│                          ┌─────────────────┐                │
│                          │                 │                │
│                          │  Morse Encoder  │                │
│                          │   (Converter)   │                │
│                          │                 │                │
│                          └────────┬────────┘                │
│                                   │                          │
│                    ┌──────────────┴──────────────┐          │
│                    ▼                              ▼          │
│          ┌──────────────────┐          ┌──────────────────┐ │
│          │                  │          │                  │ │
│          │  Display Output  │          │  Audio Service   │ │
│          │  (Morse Code)    │          │  (Web Audio API) │ │
│          │                  │          │                  │ │
│          └──────────────────┘          └────────┬─────────┘ │
│                                                  │           │
│                                   ┌──────────────┴──────┐   │
│                                   ▼                     ▼   │
│                          ┌──────────────┐    ┌──────────────┐
│                          │              │    │              │
│                          │  Play Audio  │    │   Download   │
│                          │   (Browser)  │    │  (WAV File)  │
│                          │              │    │              │
│                          └──────────────┘    └──────────────┘
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
┌──────────┐
│  Start   │
└────┬─────┘
     │
     ▼
┌──────────────────┐
│ User Types Text  │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐      ┌─────────────┐
│ Validate Input   │─────▶│ Show Error  │
│ (A-Z, 0-9 only)  │  ✗   └─────────────┘
└────┬─────────────┘
     │ ✓
     ▼
┌──────────────────┐
│ Convert to Morse │
│ (Real-time)      │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Display Morse    │
│ Code Output      │
└────┬─────────────┘
     │
     ├─────────────┐
     │             │
     ▼             ▼
┌──────────┐  ┌──────────┐
│  Copy to │  │ Generate │
│ Clipboard│  │  Audio   │
└──────────┘  └────┬─────┘
                   │
           ┌───────┴───────┐
           │               │
           ▼               ▼
     ┌──────────┐    ┌──────────┐
     │   Play   │    │ Download │
     │  Audio   │    │   WAV    │
     └──────────┘    └──────────┘
```

### Audio Generation Workflow

```
┌──────────────────┐
│  Morse String    │
│  "... --- ..."   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Parse Symbols   │
│  . = 80ms        │
│  - = 240ms       │
│  space = gap     │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│  Web Audio API           │
│  ┌────────────────────┐  │
│  │ Create AudioContext│  │
│  └─────────┬──────────┘  │
│            ▼              │
│  ┌────────────────────┐  │
│  │ Generate Sine Wave │  │
│  │ Frequency: 600Hz   │  │
│  └─────────┬──────────┘  │
│            ▼              │
│  ┌────────────────────┐  │
│  │ Apply Envelope     │  │
│  │ (Attack/Release)   │  │
│  └─────────┬──────────┘  │
│            ▼              │
│  ┌────────────────────┐  │
│  │ Create AudioBuffer │  │
│  └─────────┬──────────┘  │
└────────────┼─────────────┘
             │
     ┌───────┴────────┐
     │                │
     ▼                ▼
┌──────────┐    ┌──────────┐
│   Play   │    │  Encode  │
│  Buffer  │    │  to WAV  │
└──────────┘    └────┬─────┘
                     │
                     ▼
                ┌──────────┐
                │ Download │
                │   File   │
                └──────────┘
```

### Component Architecture

```
App.tsx (Root Component)
│
├─── State Management
│    ├─── inputText (string)
│    ├─── morseCode (string)
│    ├─── isPlaying (boolean)
│    ├─── isGenerating (boolean)
│    ├─── copied (boolean)
│    └─── error (string)
│
├─── Effects
│    └─── useEffect (Real-time conversion)
│
├─── Event Handlers
│    ├─── handleConvert()
│    ├─── handlePlay()
│    ├─── handleDownload()
│    └─── handleCopy()
│
└─── UI Components
     ├─── Header (Title & Description)
     ├─── Input Panel
     │    ├─── Textarea (User Input)
     │    └─── Validation Error
     ├─── Output Panel
     │    ├─── Morse Display
     │    └─── Copy Button
     ├─── Action Buttons
     │    ├─── Convert Button
     │    ├─── Play Button
     │    └─── Download Button
     ├─── MorseReference.tsx (Reference Chart)
     └─── Footer (Copyright & Links)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rajtilak-2020/vox.git
cd vox
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 💡 Usage

### Basic Conversion

1. Type your message in the input field (A-Z, 0-9, and spaces only)
2. The Morse code appears automatically in real-time
3. Click **Convert** to generate audio
4. Click **Play** to hear your message
5. Click **Download** to save the audio file

### Advanced Features

#### Copy to Clipboard

Click the **Copy** button next to the output to copy the Morse code to your clipboard.

#### Reference Chart

Scroll down to view the complete Morse code reference chart showing all letter and number mappings.

### Example Conversions

| Input Text | Morse Code Output |
|-----------|-------------------|
| HELLO | `.... . .-.. .-.. ---` |
| SOS | `... --- ...` |
| 123 | `.---- ..--- ...--` |
| HELLO WORLD | `.... . .-.. .-.. --- / .-- --- .-. .-.. -..` |

---

## 🔍 How It Works

### Morse Code Conversion

The application uses a mapping table that follows the International Morse Code standard:

```typescript
const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-',    'B': '-...',  'C': '-.-.',
  'D': '-..',   'E': '.',     'F': '..-.',
  // ... etc
};
```

**Conversion Process:**

1. Convert input to uppercase
2. Split into individual characters
3. Map each character to Morse code
4. Join with spaces between letters
5. Use '/' for word breaks

### Audio Generation

**Timing Standards:**

- **Dot duration**: 80ms
- **Dash duration**: 240ms (3× dot)
- **Symbol gap**: 80ms (between dots/dashes)
- **Letter gap**: 240ms (between letters)
- **Word gap**: 560ms (between words)

**Audio Parameters:**

- **Frequency**: 600Hz (standard Morse tone)
- **Sample Rate**: 44.1kHz (CD quality)
- **Wave Type**: Sine wave
- **Amplitude**: 0.3 (30% to prevent clipping)
- **Envelope**: 5ms attack/release for smooth tones

### WAV Encoding

The application encodes audio to WAV format using:

- **Format**: PCM (Pulse Code Modulation)
- **Bit Depth**: 16-bit
- **Channels**: Mono (1 channel)
- **Sample Rate**: 44,100 Hz

---

## 📁 Project Structure

```
vox/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── MorseReference.tsx      # Morse code reference chart
│   ├── services/
│   │   └── audioService.ts         # Web Audio API & WAV encoding
│   ├── utils/
│   │   └── morseCode.ts            # Morse conversion logic
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   ├── index.css                   # Global styles
│   └── vite-env.d.ts              # TypeScript definitions
├── .env                            # Environment variables
├── .gitignore                      # Git ignore rules
├── eslint.config.js               # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Dependencies & scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── README.md                       # This file
```

---

## 📚 API Reference

### Morse Code Utilities

#### `textToMorse(text: string): string`

Converts text to Morse code.

**Parameters:**
- `text` - Input string (A-Z, 0-9, spaces)

**Returns:**
- Morse code string with spaces between letters and `/` for word breaks

**Example:**
```typescript
textToMorse("HELLO") // Returns: ".... . .-.. .-.. ---"
```

#### `validateInput(text: string): boolean`

Validates if input contains only allowed characters.

**Parameters:**
- `text` - Input string to validate

**Returns:**
- `true` if valid, `false` otherwise

### Audio Service

#### `generateMorseAudio(morseCode: string): Promise<MorseAudioData>`

Generates audio buffer from Morse code string.

**Parameters:**
- `morseCode` - Morse code string (dots, dashes, spaces)

**Returns:**
- Promise resolving to `{ audioBuffer, audioContext }`

#### `playMorseAudio(audioBuffer: AudioBuffer, audioContext: AudioContext): AudioBufferSourceNode`

Plays the generated Morse code audio.

**Parameters:**
- `audioBuffer` - Audio buffer to play
- `audioContext` - Web Audio context

**Returns:**
- Audio source node for playback control

#### `downloadMorseAudio(audioBuffer: AudioBuffer, filename?: string): void`

Downloads audio as WAV file.

**Parameters:**
- `audioBuffer` - Audio buffer to encode
- `filename` - Optional filename (default: "morse-code.wav")

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep PRs focused and atomic

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Contact

**K Rajtilak**

- GitHub: [@rajtilak-2020](https://github.com/rajtilak-2020)
- Project Link: [https://github.com/rajtilak-2020/vox](https://github.com/rajtilak-2020/vox)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [International Morse Code Standard](https://en.wikipedia.org/wiki/Morse_code)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)

---

<div align="center">

**Made with ❤️ by [rajtilak-2020](https://github.com/rajtilak-2020)**

⭐ Star this repository if you found it helpful!

</div>
