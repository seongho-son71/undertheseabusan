
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Calendar, TrendingUp, LogOut, MessageSquare } from 'lucide-react';

export const AdminDashboard: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const stats = [
    { label: '이번 달 교육생', value: '24', icon: <Users size={20} />, change: '+12%' },
    { label: '미확인 예약', value: '7', icon: <Calendar size={20} />, change: 'New' },
    { label: '평균 평점', value: '4.9', icon: <Activity size={20} />, change: 'Excellent' },
    { label: '문의 건수', value: '15', icon: <MessageSquare size={20} />, change: 'Daily' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ocean-deep text-white border-b border-white/10 overflow-hidden"
    >
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-ocean-aqua font-bold mb-1">
              <div className="w-2 h-2 rounded-full bg-ocean-aqua animate-pulse" />
              ADMIN MODE ACTIVE
            </div>
            <h3 className="text-2xl font-serif">안녕하세요, 손성호 관리자님.</h3>
          </div>
          <button 
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all border border-white/10"
          >
            <LogOut size={16} /> 로그아웃
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-ocean-aqua/20 text-ocean-aqua rounded-lg">
                  {stat.icon}
                </div>
                <div className="text-[10px] font-bold text-ocean-aqua bg-ocean-aqua/10 px-2 py-1 rounded uppercase tracking-widest">
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-serif font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-white/40 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
