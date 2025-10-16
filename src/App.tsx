import { useState, useEffect, useRef } from 'react';
import { Volume2, Download, Copy, Check } from 'lucide-react';
import { textToMorse, validateInput } from './utils/morseCode';
import { generateMorseAudio, playMorseAudio, downloadMorseAudio, MorseAudioData} from './services/audioService';

function App() {
  const [inputText, setInputText] = useState('');
  const [morseCode, setMorseCode] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const audioDataRef = useRef<MorseAudioData | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (inputText === '') {
      setMorseCode('');
      setError('');
      audioDataRef.current = null;
      return;
    }

    if (!validateInput(inputText)) {
      setError('Only letters (A-Z), numbers (0-9), and spaces are allowed');
      setMorseCode('');
      audioDataRef.current = null;
      return;
    }

    setError('');
    const morse = textToMorse(inputText);
    setMorseCode(morse);
    audioDataRef.current = null;
  }, [inputText]);

  const handleConvert = async () => {
    if (!morseCode || error) return;

    setIsGenerating(true);
    try {
      const audioData = await generateMorseAudio(morseCode);
      audioDataRef.current = audioData;
    } catch (err) {
      setError('Failed to generate audio');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlay = async () => {
    if (!audioDataRef.current) {
      await handleConvert();
      if (!audioDataRef.current) return;
    }

    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }

    setIsPlaying(true);
    const source = playMorseAudio(
      audioDataRef.current.audioBuffer,
      audioDataRef.current.audioContext
    );
    audioSourceRef.current = source;

    source.onended = () => {
      setIsPlaying(false);
      audioSourceRef.current = null;
    };
  };

  const handleDownload = async () => {
    if (!audioDataRef.current) {
      await handleConvert();
      if (!audioDataRef.current) return;
    }

    downloadMorseAudio(audioDataRef.current.audioBuffer);
  };

  const handleCopy = async () => {
    if (!morseCode) return;
    await navigator.clipboard.writeText(morseCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent animate-pulse">
          Vox
        </h1>
          <p className="text-green-300/70 text-lg">Your Encrypted Thought.</p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg border border-green-500/30 rounded-3xl p-8 shadow-2xl shadow-green-500/10">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="input-text"
                className="block text-green-400 font-semibold mb-3 text-lg"
              >
                Enter Text (A-Z, 0-9)
              </label>
              <textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl px-4 py-3 text-white placeholder-green-300/30 focus:outline-none focus:border-green-500/60 transition-colors duration-200 resize-none"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="mr-2">⚠</span>
                  {error}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-green-400 font-semibold text-lg">
                  Morse Code Output
                </label>
                {morseCode && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg text-green-400 hover:border-green-500/60 hover:text-green-300 transition-colors duration-200 text-sm"
                  >
                    {copied ? (
                      <>
                        <Check size={14} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="w-full min-h-32 bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl px-4 py-3 text-green-300 font-mono text-lg break-words">
                {morseCode || (
                  <span className="text-green-300/30">
                    Morse code will appear here...
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">


              <button
                onClick={handlePlay}
                disabled={!morseCode || !!error || isPlaying}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-sm border-2 border-green-500 text-green-400 font-bold rounded-xl hover:bg-green-500/10 hover:border-green-400 disabled:border-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200 disabled:opacity-50"
              >
                <Volume2 size={20} />
                {isPlaying ? 'Playing...' : 'Play'}
              </button>

              <button
                onClick={handleDownload}
                disabled={!morseCode || !!error}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-sm border-2 border-green-500 text-green-400 font-bold rounded-xl hover:bg-green-500/10 hover:border-green-400 disabled:border-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200 disabled:opacity-50"
              >
                <Download size={20} />
                Download
              </button>
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-green-300/50 text-sm space-y-2">
          <p>Built with React, TypeScript, and Web Audio API</p>
          <p>
            © {currentYear}{' '}
            <a
              href="https://github.com/rajtilak-2020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400/70 hover:text-green-400 transition-colors duration-500"
            >
              K Rajtilak
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
