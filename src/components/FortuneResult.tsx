import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Moon, RefreshCcw, Share2 } from 'lucide-react';

interface FortuneResultProps {
  fortune: string;
  onReset: () => void;
}

export default function FortuneResult({ fortune, onReset }: FortuneResultProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto w-full p-8 md:p-12 rounded-3xl glass shadow-2xl relative"
      id="fortune-result-container"
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-mystic-900 border-4 border-mystic-700 flex items-center justify-center shadow-lg">
        <Moon className="text-gold" fill="currentColor" />
      </div>

      <div className="markdown-body mt-4">
        <ReactMarkdown>{fortune}</ReactMarkdown>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all text-sm"
          id="reset-fortune-btn"
        >
          <RefreshCcw size={16} /> 다시 확인하기
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(fortune);
            alert("운세가 클립보드에 복사되었습니다.");
          }}
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 text-slate-400 hover:bg-white/5 transition-all text-sm"
          id="share-fortune-btn"
        >
          <Share2 size={16} /> 친구에게 공유
        </button>
      </div>
      
      <p className="mt-8 text-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">
        Crescent Moon Fortune • Guided by Stars
      </p>
    </motion.div>
  );
}
