
import React, { useState, useEffect } from 'react';
import { OceanHeroScene, DiverScene } from './components/SeaScenes';
import { BreathCycleDiagram, CurriculumChart } from './components/FreediveVisuals';
import { ArrowDown, Menu, X, Anchor, Users, Calendar, Instagram, MessageCircle, MapPin } from 'lucide-react';

const InstructorCard = ({ name, role, tags, delay }: { name: string, role: string, tags: string[], delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 w-full max-w-xs hover:-translate-y-2" style={{ animationDelay: delay }}>
      <div className="w-24 h-24 bg-ocean-sand rounded-full mb-6 flex items-center justify-center text-ocean-deep overflow-hidden border-2 border-ocean-aqua/20">
         <Users size={40} />
      </div>
      <h3 className="font-serif text-2xl text-slate-900 text-center mb-1">{name}</h3>
      <p className="text-ocean-medium font-bold text-xs uppercase tracking-widest mb-4">{role}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-1 bg-slate-50 text-slate-500 rounded-md border border-slate-100">{tag}</span>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-ocean-sand text-slate-800 font-sans selection:bg-ocean-aqua selection:text-ocean-deep">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-ocean-deep rounded-xl flex items-center justify-center text-ocean-aqua shadow-lg">
                <Anchor size={20} />
            </div>
            <span className={`font-serif font-extrabold text-xl tracking-tighter transition-colors ${scrolled ? 'text-ocean-deep' : 'text-slate-900 md:text-white'}`}>
              UNDER THE SEA <span className="font-normal text-ocean-aqua">BUSAN</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-tight text-slate-600">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-ocean-deep transition-colors uppercase">소개</a>
            <a href="#curriculum" onClick={scrollToSection('curriculum')} className="hover:text-ocean-deep transition-colors uppercase">교육과정</a>
            <a href="#instructors" onClick={scrollToSection('instructors')} className="hover:text-ocean-deep transition-colors uppercase">강사진</a>
            <a 
              href="https://open.kakao.com/o/syourlink" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-ocean-deep text-white rounded-full hover:bg-ocean-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Calendar size={16} /> 실시간 예약
            </a>
          </div>

          <button className={`md:hidden p-2 ${scrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-2xl font-serif animate-fade-in">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-ocean-aqua">브랜드 소개</a>
            <a href="#curriculum" onClick={scrollToSection('curriculum')} className="hover:text-ocean-aqua">교육 커리큘럼</a>
            <a href="#instructors" onClick={scrollToSection('instructors')} className="hover:text-ocean-aqua">강사진 프로필</a>
            <a href="https://open.kakao.com/o/syourlink" className="px-8 py-4 bg-ocean-deep text-white rounded-full shadow-xl">지금 바로 예약하기</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-ocean-deep">
        <OceanHeroScene />
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="inline-block mb-6 px-4 py-1.5 border border-ocean-aqua/50 text-ocean-aqua text-xs tracking-[0.3em] font-bold rounded-full backdrop-blur-md bg-white/5 uppercase">
            Professional Freediving Academy
          </div>
          <h1 className="font-serif text-5xl md:text-8xl font-black leading-none mb-8 drop-shadow-2xl">
            고요한 바다,<br/><span className="italic font-normal text-ocean-aqua opacity-90">그 깊은 곳으로</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-12">
            부산 최고의 커리큘럼으로 당신의 새로운 호흡을 시작하세요. <br/>
            언더더씨 부산은 안전과 즐거움을 최우선으로 합니다.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
             <button onClick={scrollToSection('curriculum')} className="px-10 py-4 bg-ocean-aqua text-ocean-deep font-bold rounded-full shadow-[0_0_30px_rgba(114,225,209,0.3)] hover:scale-105 transition-transform">
                교육 문의하기
             </button>
             <a href="#intro" onClick={scrollToSection('intro')} className="group flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer">
                <span>SCROLL TO EXPLORE</span>
                <span className="p-2 border border-white/20 rounded-full group-hover:border-white transition-colors">
                    <ArrowDown size={14} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="intro" className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-ocean-sand">
                    <DiverScene />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/40 to-transparent"></div>
                </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-block mb-4 text-xs font-black tracking-widest text-ocean-medium uppercase">About Us</div>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-slate-900">
                한 번의 호흡으로 만나는<br/><span className="text-ocean-deep">새로운 세상</span>
              </h2>
              <div className="w-20 h-1.5 bg-ocean-aqua mb-8"></div>
              <div className="text-lg text-slate-600 leading-relaxed space-y-6 font-light">
                <p>
                  프리다이빙은 단순히 숨을 참는 스포츠가 아닙니다. 물속에서의 완전한 이완을 통해 <strong>자신과 마주하는 고요한 명상</strong>의 시간입니다. 
                </p>
                <p>
                  부산의 푸른 바다는 프리다이버들에게 최고의 놀이터를 제공합니다. 언더더씨 부산은 입문자부터 상급자까지, 체계적인 시스템을 통해 당신이 물속에서 가장 편안하고 안전하게 자유를 만끽할 수 있도록 돕습니다.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="p-4 bg-ocean-sand rounded-xl">
                        <h4 className="font-bold text-ocean-deep mb-1 text-2xl">99%</h4>
                        <p className="text-xs text-slate-500">입문자 교육 성공</p>
                    </div>
                    <div className="p-4 bg-ocean-sand rounded-xl">
                        <h4 className="font-bold text-ocean-deep mb-1 text-2xl">1:3</h4>
                        <p className="text-xs text-slate-500">소수 정예 밀착 교육</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Visuals */}
        <section id="curriculum" className="py-24 bg-ocean-sand border-y border-slate-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900 tracking-tight">당신의 성장을 설계합니다</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">언더더씨만의 체계적인 시각화 도구와 교육 시스템으로 프리다이빙의 원리를 쉽고 명확하게 이해할 수 있습니다.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <BreathCycleDiagram />
                    <CurriculumChart />
                </div>
            </div>
        </section>

        {/* Instructors */}
        <section id="instructors" className="py-24 bg-white">
           <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="inline-block mb-3 text-xs font-bold tracking-widest text-ocean-medium uppercase">Professional Team</div>
                        <h2 className="font-serif text-4xl md:text-5xl text-slate-900">강사진</h2>
                    </div>
                    <p className="text-slate-500 md:text-right font-light">수년간의 교육 경험과 실력을 겸비한 <br/> 강사가 여러분을 기다립니다.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch flex-wrap">
                    <InstructorCard 
                        name="손성호" 
                        role="Master Instructor" 
                        tags={['PADI 강사', 'FRTI(응급처치 트레이닝)', '물공포증 극복 전문']}
                        delay="0s" 
                    />
                </div>
           </div>
        </section>

        {/* Booking CTA */}
        <section className="py-20 bg-ocean-deep relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <DiverScene />
            </div>
            <div className="container mx-auto px-6 relative z-10 text-center text-white">
                <h2 className="font-serif text-3xl md:text-5xl mb-8">지금 바로 바다로 떠날 준비가 되셨나요?</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://open.kakao.com/o/syourlink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-ocean-aqua text-ocean-deep font-bold rounded-full hover:scale-105 transition-transform">
                        <MessageCircle size={20} /> 카카오톡 상담
                    </a>
                    <a href="https://instagram.com/underthesea_busan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-white/20 transition-all">
                        <Instagram size={20} /> 인스타그램 구경하기
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-20 border-t border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <div className="text-white font-serif font-bold text-2xl mb-6 flex items-center gap-2">
                    <Anchor className="text-ocean-aqua" /> 언더더씨 부산
                </div>
                <p className="text-sm leading-relaxed max-w-xs">
                    부산 최고의 프리다이빙 교육 전문 센터. 안전한 교육과 최상의 수중 경험을 약속합니다.
                </p>
                <div className="mt-6 flex items-center gap-2 text-ocean-aqua text-sm">
                  <MapPin size={16} /> <span>부산광역시 해운대구/송정 일대</span>
                </div>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6">Contact</h4>
                <ul className="text-sm space-y-3">
                    <li>전화: <a href="tel:010-3879-4710" className="hover:text-white">010-3879-4710</a></li>
                    <li>이메일: <a href="mailto:son21ckr@hanmail.net" className="hover:text-white">son21ckr@hanmail.net</a></li>
                    <li>카카오톡: underthesea_busan</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6">Operating Hours</h4>
                <ul className="text-sm space-y-3">
                    <li>평일: 18:00 - 22:00</li>
                    <li>주말: 07:00 - 20:00 (바다 교육 가능)</li>
                    <li>* 교육 중에는 연락이 늦을 수 있습니다. 문자 남겨주세요.</li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-6 border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2024 언더더씨 부산 (Under the Sea Busan). All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white">개인정보처리방침</a>
                <a href="#" className="hover:text-white">이용약관</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
