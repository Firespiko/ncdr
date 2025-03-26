import { useState, useCallback } from "react";
import { Lock, Unlock, Terminal, Shield } from "lucide-react";

type Mode = "encode" | "decode";
type CipherMode = "normal" | "random";

function App() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<Mode>("encode");
  const [cipherMode, setCipherMode] = useState<CipherMode>("normal");
  const [randomOutput, setRandomOutput] = useState("");

  const randomMode = useCallback((text: string, mode: Mode) => {
    let randomtext = "";
    for (let i = 0; i < text.length; i++) {
      const randomShiftSeed = Math.floor(Math.random() * 25) + 1;
      randomtext += caesarCipher(text[i], randomShiftSeed, mode);
      console.log(randomShiftSeed);
    }
    return randomtext;
  }, []);

  const handleGenerate = () => {
    setRandomOutput(randomMode(input, mode));
  };

  const caesarCipher = useCallback(
    (text: string, shift: number, mode: Mode) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?`~'\" \\";
      const actualShift = mode === "decode" ? -shift : shift;

      return text
        .split("")
        .map((char) => {
          const index = characters.indexOf(char);
          if (index === -1) return char;
          const newIndex = (index + actualShift) % characters.length;
          return characters[
            newIndex >= 0 ? newIndex : newIndex + characters.length
          ];
        })
        .join("");
    },
    []
  );

  const output =
    cipherMode === "normal" ? caesarCipher(input, shift, mode) : randomOutput;

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
              onClick={() => setMode("encode")}
              className={`px-6 py-2 rounded-md ${
                mode === "encode"
                  ? "bg-[#0fa]/20 text-[#0fa] neon-glow"
                  : "text-[#0fa]/70"
              }`}
            >
              {" "}
              &gt; ENCODE{" "}
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-6 py-2 rounded-md ${
                mode === "decode"
                  ? "bg-[#0fa]/20 text-[#0fa] neon-glow"
                  : "text-[#0fa]/70"
              }`}
            >
              {" "}
              &gt; DECODE{" "}
            </button>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="bg-black/50 rounded-lg p-1 flex gap-1 neon-box">
            <button
              onClick={() => setCipherMode("normal")}
              className={`px-6 py-2 rounded-md ${
                cipherMode === "normal"
                  ? "bg-[#0fa]/20 text-[#0fa] neon-glow"
                  : "text-[#0fa]/70"
              }`}
            >
              {" "}
              NORMAL MODE{" "}
            </button>
            <button
              onClick={() => setCipherMode("random")}
              className={`px-6 py-2 rounded-md ${
                cipherMode === "random"
                  ? "bg-[#0fa]/20 text-[#0fa] neon-glow"
                  : "text-[#0fa]/70"
              }`}
            >
              {" "}
              RANDOM MODE{" "}
            </button>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <label className="block text-lg font-mono flex items-center gap-2">
            Shift:
            <input
              type="number"
              value={shift}
              onChange={(e) => setShift(Number(e.target.value))}
              className="w-20 p-2 rounded-lg bg-black/50 border border-[#0fa]/30 font-mono text-[#0fa]"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-lg font-mono flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {mode === "encode" ? "PLAINTEXT" : "CIPHERTEXT"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-48 p-4 rounded-lg bg-black/50 border border-[#0fa]/30 font-mono text-[#0fa]"
            />
            {cipherMode === "random" && (
              <button
                onClick={handleGenerate}
                className="px-6 py-2 bg-[#0fa]/20 text-[#0fa] neon-glow rounded-md"
              >
                Generate Random Output
              </button>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-mono flex items-center gap-2">
              <Unlock className="w-4 h-4" />
              {mode === "encode" ? "CIPHERTEXT" : "PLAINTEXT"}
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-48 p-4 rounded-lg bg-black/50 border border-[#0fa]/30 font-mono text-[#0fa]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
