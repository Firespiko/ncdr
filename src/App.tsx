import React, { useState, useCallback } from 'react';
import { Lock, Unlock, RotateCw, Terminal, Shield, Binary } from 'lucide-react';

type Mode = 'encode' | 'decode';

function App() {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<Mode>('encode');
  
  const caesarCipher = useCallback((text: string, shift: number, mode: Mode) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?`~\'" \\';
    const actualShift = mode === 'decode' ? -shift : shift;
    
    return text
      .split('')
      .map(char => {
        const index = characters.indexOf(char);
        if (index === -1) return char;
        const newIndex = (index + actualShift) % characters.length;
        return characters[newIndex >= 0 ? newIndex : newIndex + characters.length];
      })
      .join('');
  }, []);

  const output = caesarCipher(input, shift, mode);

  return (
    <div className="min-h-screen matrix-bg text-[#0fa] p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-black/80 backdrop-blur-xl rounded-xl p-8 neon-border">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Shield className="w-8 h-8 animate-pulse" />
          <h1 className="text-4xl font-bold text-center neon-glow font-mono">
            CAESAR_CIPHER.exe
          </h1>
          <Terminal className="w-8 h-8 animate-pulse" />
        </div>

        <div className="mb-8 flex justify-center">
          <div className="bg-black/50 rounded-lg p-1 flex gap-1 neon-box">
            <button
              onClick={() => setMode('encode')}
              className={`px-6 py-2 rounded-md transition-all duration-300 font-mono ${
                mode === 'encode'
                  ? 'bg-[#0fa]/20 text-[#0fa] neon-glow'
                  : 'text-[#0fa]/70 hover:text-[#0fa]'
              }`}
            >
              &gt; ENCODE
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-6 py-2 rounded-md transition-all duration-300 font-mono ${
                mode === 'decode'
                  ? 'bg-[#0fa]/20 text-[#0fa] neon-glow'
                  : 'text-[#0fa]/70 hover:text-[#0fa]'
              }`}
            >
              &gt; DECODE
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-lg font-mono flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {mode === 'encode' ? 'PLAINTEXT' : 'CIPHERTEXT'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-48 p-4 rounded-lg bg-black/50 border border-[#0fa]/30 font-mono 
                       text-[#0fa] placeholder-[#0fa]/30 focus:outline-none focus:neon-box 
                       transition-shadow duration-300"
              placeholder={`Enter ${mode === 'encode' ? 'plaintext' : 'ciphertext'} here...`}
            />
          </div>
          
          <div className="space-y-4">
            <label className="block text-lg font-mono flex items-center gap-2">
              <Unlock className="w-4 h-4" />
              {mode === 'encode' ? 'CIPHERTEXT' : 'PLAINTEXT'}
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-48 p-4 rounded-lg bg-black/50 border border-[#0fa]/30 font-mono 
                       text-[#0fa] placeholder-[#0fa]/30 focus:outline-none"
            />
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <label className="text-lg font-mono flex items-center gap-2">
              <Binary className="w-4 h-4" />
              SHIFT_KEY:
            </label>
            <div className="flex items-center gap-2 bg-black/50 rounded-lg p-2 border border-[#0fa]/30 neon-box">
              <button
                onClick={() => setShift(s => (s - 1 + 95) % 95)}
                className="text-[#0fa] hover:neon-glow p-1 transition-all duration-300"
              >
                -
              </button>
              <span className="font-mono w-8 text-center">{shift}</span>
              <button
                onClick={() => setShift(s => (s + 1) % 95)}
                className="text-[#0fa] hover:neon-glow p-1 transition-all duration-300"
              >
                +
              </button>
            </div>
            <button
              onClick={() => setShift(3)}
              className="flex items-center gap-2 text-[#0fa]/70 hover:text-[#0fa] hover:neon-glow
                       transition-all duration-300"
              title="Reset to default shift (3)"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;