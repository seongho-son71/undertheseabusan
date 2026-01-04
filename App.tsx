
import React, { useState, useEffect, Suspense } from 'react';
import { OceanHeroScene, DiverScene } from './components/SeaScenes';
import { BreathCycleDiagram, CurriculumChart } from './components/FreediveVisuals';
import { ArrowDown, Menu, X, Anchor, Users, Calendar, Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const InstructorCard = ({ name, role, tags, delay }: { name: string, role: string, tags: string[], delay: string }) => {
  return (
    <div className="flex flex-col group items-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 w-full max-w-sm hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: delay }}>
      <div className="w-32 h-32 bg-ocean-sand rounded-full mb-6 flex items-center justify-center text-ocean-deep overflow-hidden border-4 border-ocean-aqua/20 shadow-inner group-hover:scale-105 transition-transform">
         <Users size={56} />
      </div>
      <h3 className="font-serif text-3xl text-slate-900 text-center mb-1">{name}</h3>
      <p className="text-ocean-medium font-bold text-sm uppercase tracking-widest mb-6">{role}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-xs px-3 py-1 bg-ocean-sand text-ocean-deep font-medium rounded-full border border-ocean-aqua/10">{tag}</span>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

  if (!isMounted) return <div className="min-h-screen bg-ocean-deep" />;

  return (
    <div className="min-h-screen bg-ocean-sand text-slate-800 font-sans selection:bg-ocean-aqua selection:text-ocean-deep">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-white/90 shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-ocean-deep rounded-xl flex items-center justify-center text-ocean-aqua shadow-lg">
                <Anchor size={20} />
            </div>
            <span className={`font-serif font-extrabold text-xl tracking-tighter transition-colors ${scrolled ? 'text-ocean-deep' : 'text-white'}`}>
              UNDER THE SEA <span className="font-normal text-ocean-aqua">BUSAN</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-tight">
            <a href="#intro" onClick={scrollToSection('intro')} className={`hover:text-ocean-aqua transition-colors uppercase ${scrolled ? 'text-slate-600' : 'text-white'}`}>브랜드 소개</a>
            <a href="#curriculum" onClick={scrollToSection('curriculum')} className={`hover:text-ocean-aqua transition-colors uppercase ${scrolled ? 'text-slate-600' : 'text-white'}`}>교육과정</a>
            <a href="#instructors" onClick={scrollToSection('instructors')} className={`hover:text-ocean-aqua transition-colors uppercase ${scrolled ? 'text-slate-600' : 'text-white'}`}>강사진</a>
            <a 
              href="https://open.kakao.com/o/syourlink" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-ocean-aqua text-ocean-deep rounded-full hover:scale-105 transition-all shadow-lg font-bold flex items-center gap-2"
            >
              <Calendar size={16} /> 예약하기
            </a>
          </div>

          <button className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-ocean-deep canvas-container">
        <Suspense fallback={<div className="absolute inset-0 bg-ocean-deep" />}>
          <OceanHeroScene />
        </Suspense>
        
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <div className="inline-block mb-6 px-5 py-2 border border-ocean-aqua/40 text-ocean-aqua text-xs tracking-[0.4em] font-bold rounded-full backdrop-blur-sm bg-white/5 uppercase">
            Safe & Professional Freediving
          </div>
          <h1 className="font-serif text-5xl md:text-8xl font-black leading-tight mb-8 drop-shadow-2xl">
            고요한 바다,<br/><span className="italic font-normal text-ocean-aqua">그 깊은 자유</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-12">
            부산 해운대·송정의 푸른 바다에서 시작하는 특별한 호흡. <br/>
            언더더씨 부산은 당신의 한계를 넘는 가장 안전한 방법을 제시합니다.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
             <button onClick={scrollToSection('curriculum')} className="px-12 py-5 bg-ocean-aqua text-ocean-deep font-extrabold rounded-full shadow-2xl hover:scale-105 transition-all">
                교육과정 보기
             </button>
             <a href="#intro" onClick={scrollToSection('intro')} className="group flex items-center gap-4 text-sm font-bold text-white/80 hover:text-white transition-colors">
                <span>SCROLL TO DISCOVER</span>
                <span className="p-3 border-2 border-white/20 rounded-full group-hover:border-ocean-aqua transition-all animate-bounce">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main className="relative z-30">
        <section id="intro" className="py-32 bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 relative group">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-ocean-sand">
                    <Suspense fallback={<div className="w-full h-full bg-slate-200" />}>
                      <DiverScene />
                    </Suspense>
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 via-transparent to-transparent"></div>
                </div>
            </div>
            <div className="lg:col-span-7">
              <div className="inline-block mb-6 text-sm font-black tracking-widest text-ocean-medium uppercase border-b-2 border-ocean-aqua pb-1">Our Philosophy</div>
              <h2 className="font-serif text-5xl md:text-6xl mb-10 leading-[1.1] text-slate-900">
                한 번의 호흡으로 만나는<br/><span className="text-ocean-deep font-black">완전한 평온</span>
              </h2>
              <div className="text-xl text-slate-600 leading-relaxed space-y-8 font-light">
                <p>프리다이빙은 단순히 숨을 오래 참는 기록 경기가 아닙니다. 물속의 압력과 고요 속에서 <strong>나의 내면을 오롯이 마주하는 명상</strong>입니다.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                    <div className="p-6 bg-ocean-sand rounded-3xl text-center">
                        <div className="font-serif text-3xl font-black text-ocean-deep mb-1">99%</div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">초보자 이수율</p>
                    </div>
                    <div className="p-6 bg-ocean-sand rounded-3xl text-center">
                        <div className="font-serif text-3xl font-black text-ocean-deep mb-1">1:3</div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">교육 비율</p>
                    </div>
                    <div className="p-6 bg-ocean-sand rounded-3xl text-center">
                        <div className="font-serif text-3xl font-black text-ocean-deep mb-1">PADI</div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">공인 인증</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="curriculum" className="py-32 bg-ocean-sand/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="font-serif text-5xl md:text-6xl mb-8 text-slate-900 tracking-tight">성장 커리큘럼</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <BreathCycleDiagram />
                    <CurriculumChart />
                </div>
            </div>
        </section>

        <section id="instructors" className="py-32 bg-white">
           <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="font-serif text-5xl md:text-6xl text-slate-900">강사진</h2>
                </div>
                <div className="flex flex-wrap gap-10 justify-center">
                    <InstructorCard 
                        name="손성호" 
                        role="Master Instructor" 
                        tags={['PADI Instructor', 'FRTI 응급처치 전문가', '물공포증 특화', '부산 로컬 다이버']}
                        delay="0s" 
                    />
                </div>
           </div>
        </section>

        <section className="py-32 bg-ocean-deep text-white text-center relative overflow-hidden">
            <h2 className="font-serif text-4xl md:text-6xl mb-12 relative z-10">부산의 푸른 바다가 <br/> 당신을 기다립니다</h2>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
                <a href="https://open.kakao.com/o/syourlink" className="px-10 py-5 bg-ocean-aqua text-ocean-deep font-black rounded-full shadow-xl transition-transform hover:scale-105">실시간 카톡 상담</a>
                <a href="https://instagram.com/underthesea_busan" className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 font-black rounded-full transition-colors hover:bg-white/20">인스타그램</a>
            </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-20 px-6">
        <div className="container mx-auto text-center">
          <p>© 2024 언더더씨 부산. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
