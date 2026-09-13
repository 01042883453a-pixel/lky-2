/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Star, Sparkles } from 'lucide-react';
import { generateFortune } from './lib/gemini';
import FortuneForm from './components/FortuneForm';
import FortuneResult from './components/FortuneResult';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [fortune, setFortune] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetFortune = async (data: { 
    name: string; 
    birthDate: string; 
    birthTime: string; 
    gender: string; 
    calendarType: string 
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateFortune(
        data.name, 
        data.birthDate, 
        data.birthTime, 
        data.gender, 
        data.calendarType
      );
      setFortune(result || "운세를 가져올 수 없습니다.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFortune(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center relative overflow-hidden" id="app-root">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700 shadow-[0_0_10px_white]" />
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-1000 shadow-[0_0_10px_white]" />
        <div className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200 shadow-[0_0_10px_white]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
        id="app-header"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Moon size={48} className="text-gold" fill="currentColor" />
            <Sparkles size={20} className="absolute -top-2 -right-2 text-gold-light animate-bounce" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold gold-text tracking-tighter mb-2">초승달 운세</h1>
        <p className="text-slate-400 font-light tracking-wide italic">Glow with the stars, Flow with the moon</p>
      </motion.header>

      {/* Main Content */}
      <main className="w-full relative z-10" id="main-content">
        <AnimatePresence mode="wait">
          {!fortune ? (
            <div key="form">
              <FortuneForm onSubmit={handleGetFortune} isLoading={isLoading} />
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 rounded-xl bg-red-900/20 border border-red-900/50 text-red-200 text-sm text-center max-w-md mx-auto"
                >
                  {error}
                </motion.div>
              )}
            </div>
          ) : (
            <FortuneResult key="result" fortune={fortune} onReset={reset} />
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="mt-16 text-slate-600 text-[10px] flex items-center gap-2" id="app-footer">
        <Star size={10} /> 2026 Monthly Fortune App <Star size={10} />
      </footer>
    </div>
  );
}
