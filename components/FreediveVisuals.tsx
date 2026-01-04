
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Waves, Timer, MapPin, CheckCircle2 } from 'lucide-react';

export const BreathCycleDiagram: React.FC = () => {
  const [stage, setStage] = useState(0);
  const stages = [
    { name: '이완호흡', desc: '이완을 통한 심박수 안정화', color: 'bg-blue-300' },
    { name: '최종호흡', desc: '폐의 부피를 최대한 확보', color: 'bg-ocean-aqua' },
    { name: '무호흡 (Apnea)', desc: '고요한 수중 탐험', color: 'bg-ocean-deep' },
    { name: '회복호흡', desc: '빠른 산소 공급과 회복', color: 'bg-green-400' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((s) => (s + 1) % stages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between p-8 bg-white rounded-2xl shadow-sm border border-slate-100 w-full h-full">
      <h3 className="font-serif text-2xl mb-4 text-slate-800 text-center">프리다이빙 호흡 주기</h3>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {stages.map((s, i) => (
          <div 
            key={i}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${stage === i ? `${s.color} text-white shadow-md scale-105` : 'bg-slate-100 text-slate-400'}`}
          >
            {s.name}
          </div>
        ))}
      </div>
      
      <div className="relative w-48 h-48 flex items-center justify-center my-4">
        <motion.div 
          animate={{ 
            scale: stage === 1 ? 1.3 : stage === 2 ? 1.1 : stage === 3 ? 1.2 : 1,
            opacity: stage === 2 ? 0.6 : 1
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className={`w-32 h-32 rounded-full ${stages[stage].color} flex items-center justify-center shadow-lg`}
        >
          <Wind className="text-white" size={40} />
        </motion.div>
        
        {/* Ripple effects */}
        <motion.div 
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute w-32 h-32 rounded-full border-2 border-ocean-aqua pointer-events-none"
        />
      </div>
      
      <div className="mt-8 text-center max-w-sm">
        <p className="text-slate-600 font-medium">{stages[stage].desc}</p>
        <p className="text-xs text-slate-400 mt-2 italic">* 언더더씨 부산에서는 안전한 호흡법을 가장 먼저 가르칩니다.</p>
      </div>
    </div>
  );
};

export const CurriculumChart: React.FC = () => {
    const [selected, setSelected] = useState(1);
    const levels = [
        { id: 1, name: 'LV 1 (입문)', depth: '5m', target: '물과 친해지기, 기초 압력평형', color: '#72E1D1' },
        { id: 2, name: 'LV 2 (초급)', depth: '10-16m', target: '프리다이버, 수심 및 레스큐', color: '#1B6CA8' },
        { id: 3, name: 'LV 3 (중급)', depth: '20m+', target: '프렌젤, 수중 기술 최적화', color: '#00416A' },
        { id: 4, name: 'LV 4 (마스터)', depth: '32m+', target: '마우스필, 보조강사', color: '#002B4A' }
    ];

    return (
        <div className="p-8 bg-ocean-deep text-white rounded-2xl shadow-xl w-full h-full flex flex-col justify-between">
            <h3 className="font-serif text-2xl mb-6 text-ocean-aqua">교육 커리큘럼</h3>
            
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {levels.map(level => (
                    <button
                        key={level.id}
                        onClick={() => setSelected(level.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${selected === level.id ? 'bg-ocean-aqua text-ocean-deep' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
                    >
                        {level.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-grow">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Waves className="text-ocean-aqua" />
                        <span className="text-lg font-bold">권장 수심: {levels[selected-1].depth}</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-ocean-aqua mt-1 shrink-0" />
                        <span className="text-slate-300">핵심 목표: {levels[selected-1].target}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        강사가 밀착 케어하여 초보자도 쉽고 즐겁게 배울 수 있습니다. 각 레벨별 맞춤형 피드백을 제공합니다.
                    </p>
                </div>
                
                <div className="relative h-48 bg-slate-900/50 rounded-xl flex items-end justify-center p-6 overflow-hidden">
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(selected/levels.length) * 100}%` }}
                        className="w-full bg-gradient-to-t from-ocean-deep to-ocean-aqua opacity-50 rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-serif font-bold text-ocean-aqua">{levels[selected-1].depth}</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 mt-2">Target Depth</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 hidden md:block">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Under the sea busan professional training system</p>
            </div>
        </div>
    );
};
