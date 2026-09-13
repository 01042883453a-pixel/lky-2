import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Clock, User, Heart } from 'lucide-react';

interface FortuneFormProps {
  onSubmit: (data: { 
    name: string; 
    birthDate: string; 
    birthTime: string; 
    gender: string; 
    calendarType: string 
  }) => void;
  isLoading: boolean;
}

export default function FortuneForm({ onSubmit, isLoading }: FortuneFormProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [ampm, setAmpm] = useState('오전');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [gender, setGender] = useState('남성');
  const [calendarType, setCalendarType] = useState('양력');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) return;
    const birthTime = `${ampm} ${hour}시 ${minute}분`;
    onSubmit({ name, birthDate, birthTime, gender, calendarType });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto w-full p-8 rounded-3xl glass shadow-2xl relative overflow-hidden"
      id="fortune-form-container"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} className="text-gold" />
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif font-bold gold-text mb-2">운명 확인하기</h2>
        <p className="text-slate-400 text-sm">별의 위치를 읽기 위해 당신의 정보를 알려주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400 flex items-center gap-2" htmlFor="name">
            <User size={16} className="text-gold/60" /> 이름
          </label>
          <input
            id="name"
            type="text"
            placeholder="성함을 입력하세요"
            required
            className="input-mystic"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Gender Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2">
            <Heart size={16} className="text-gold/60" /> 성별
          </label>
          <div className="flex gap-4">
            {['남성', '여성'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 py-3 rounded-lg border transition-all text-sm ${
                  gender === g 
                    ? 'border-gold bg-gold/10 text-gold' 
                    : 'border-mystic-700 bg-mystic-700/30 text-slate-500'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Date and Calendar Type */}
        <div className="space-y-2">
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2" htmlFor="birth-date">
              <Calendar size={16} className="text-gold/60" /> 생년월일
            </label>
            <div className="flex bg-mystic-900/50 rounded-full p-1 border border-mystic-700">
              {['양력', '음력'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setCalendarType(t)}
                  className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                    calendarType === t 
                      ? 'bg-gold text-mystic-900' 
                      : 'text-slate-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <input
            id="birth-date"
            type="date"
            required
            className="input-mystic"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400 flex items-center gap-2" htmlFor="birth-time">
            <Clock size={16} className="text-gold/60" /> 태어난 시각
          </label>
          <div className="flex gap-2">
            <div className="flex bg-mystic-900/50 rounded-lg p-1 border border-mystic-700 shrink-0">
              {['오전', '오후'].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmpm(a)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                    ampm === a 
                      ? 'bg-gold text-mystic-900 font-bold' 
                      : 'text-slate-500'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <select
              className="input-mystic py-2 px-2 text-center"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i).map((h) => (
                <option key={h} value={h.toString().padStart(2, '0')}>
                  {h}시
                </option>
              ))}
            </select>
            <select
              className="input-mystic py-2 px-2 text-center"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            >
              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                <option key={m} value={m.toString().padStart(2, '0')}>
                  {m}분
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-gold w-full flex items-center justify-center gap-2 group mt-6"
          id="submit-fortune-btn"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-mystic-900 border-t-transparent rounded-full"
            />
          ) : (
            <>
              운세 확인하기
              <Sparkles size={20} className="group-hover:animate-pulse" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
