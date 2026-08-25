import React, { useState } from 'react';
import { 
  Wifi, 
  Bluetooth, 
  Plane, 
  Radio, 
  Share2, 
  Sliders, 
  Sun, 
  Volume2, 
  VolumeX,
  Moon, 
  Flashlight, 
  Timer, 
  Lock, 
  Cast, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Plus, 
  Power, 
  Heart, 
  Music, 
  ShieldCheck, 
  Layers, 
  RotateCcw,
  Sparkles,
  Smartphone,
  ChevronRight,
  Tv,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ControlCenterSimulator() {
  // Simulator State
  const [currentPage, setCurrentPage] = useState<'main' | 'music' | 'connectivity'>('main');
  const [hookMode, setHookMode] = useState<'ios18' | 'ios16'>('ios18');
  
  // Toggles
  const [airplane, setAirplane] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [cellular, setCellular] = useState(true);
  const [airdrop, setAirdrop] = useState(true);
  const [hotspot, setHotspot] = useState(false);
  const [vpn, setVpn] = useState(false);
  
  const [flashlight, setFlashlight] = useState(false);
  const [rotationLock, setRotationLock] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [focus, setFocus] = useState(false);
  
  // Sliders
  const [brightness, setBrightness] = useState(72);
  const [volume, setVolume] = useState(60);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);

  // Radius values depending on hookMode
  const moduleRadius = hookMode === 'ios18' ? 'rounded-[26px]' : 'rounded-2xl';
  const circleRadius = hookMode === 'ios18' ? 'rounded-full' : 'rounded-2xl';
  const sliderRadius = hookMode === 'ios18' ? 'rounded-[26px]' : 'rounded-2xl';

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start">
      {/* Phone Stage */}
      <div className="w-full xl:w-[420px] shrink-0 mx-auto flex flex-col items-center">
        {/* Device Frame */}
        <div className="w-full max-w-[390px] h-[810px] bg-black rounded-[52px] p-3.5 shadow-2xl border-4 border-neutral-800 relative select-none overflow-hidden flex flex-col">
          
          {/* Dynamic Island / Speaker Pill */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
            <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900"></div>
          </div>

          {/* Screen Content */}
          <div 
            className="w-full h-full rounded-[40px] relative overflow-hidden flex flex-col text-white transition-all duration-300"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 20%, rgba(30, 90, 160, 0.75), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Ambient Blur Layer */}
            <div className="absolute inset-0 backdrop-blur-xl bg-black/40 z-0"></div>

            {/* Status Bar */}
            <div className="relative z-10 pt-3 px-6 flex items-center justify-between text-xs font-semibold tracking-tight">
              {/* Left Edit + Button */}
              <div className="flex items-center gap-1">
                {hookMode === 'ios18' ? (
                  <button 
                    className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform text-white/90 hover:bg-white/30"
                    title="iOS 18 CC Edit Controls"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                ) : (
                  <span className="text-white/80">9:41</span>
                )}
              </div>

              {/* Center Location/Carrier pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-[11px] text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>T-Mobile Wi-Fi</span>
              </div>

              {/* Right Power Button / Battery */}
              <div className="flex items-center gap-2">
                {hookMode === 'ios18' ? (
                  <button 
                    className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform text-white/90 hover:bg-white/30"
                    title="iOS 18 Power Toggle"
                  >
                    <Power className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-[11px]">
                    <span>76%</span>
                    <div className="w-5 h-2.5 border border-white/70 rounded-xs p-0.5 flex items-center">
                      <div className="w-3.5 h-full bg-white rounded-2xs"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main CC Modules Canvas */}
            <div className="relative z-10 flex-1 px-4 pt-4 pb-2 flex flex-col justify-between overflow-y-auto no-scrollbar">
              <AnimatePresence mode="wait">
                {currentPage === 'main' && (
                  <motion.div 
                    key="main-page"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-3.5"
                  >
                    {/* Top Row: 2x2 Connectivity Matrix + 2x2 Media Player */}
                    <div className="grid grid-cols-2 gap-3.5">
                      
                      {/* Connectivity 2x2 Platter */}
                      <div 
                        className={`bg-neutral-900/60 backdrop-blur-2xl border border-white/10 p-3 flex flex-col justify-between h-[152px] ${moduleRadius} transition-all shadow-lg`}
                      >
                        <div className="grid grid-cols-2 gap-2.5 place-items-center flex-1">
                          {/* Airplane */}
                          <button
                            onClick={() => setAirplane(!airplane)}
                            className={`w-12 h-12 ${circleRadius} flex items-center justify-center transition-all duration-200 active:scale-95 ${
                              airplane 
                                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' 
                                : 'bg-white/15 text-white hover:bg-white/20'
                            }`}
                          >
                            <Plane className="w-5 h-5 fill-current" />
                          </button>

                          {/* AirDrop */}
                          <button
                            onClick={() => setAirdrop(!airdrop)}
                            className={`w-12 h-12 ${circleRadius} flex items-center justify-center transition-all duration-200 active:scale-95 ${
                              airdrop 
                                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30' 
                                : 'bg-white/15 text-white hover:bg-white/20'
                            }`}
                          >
                            <Share2 className="w-5 h-5 stroke-[2.2]" />
                          </button>

                          {/* Wi-Fi */}
                          <button
                            onClick={() => setWifi(!wifi)}
                            className={`w-12 h-12 ${circleRadius} flex items-center justify-center transition-all duration-200 active:scale-95 ${
                              wifi 
                                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30' 
                                : 'bg-white/15 text-white hover:bg-white/20'
                            }`}
                          >
                            <Wifi className="w-5 h-5 stroke-[2.2]" />
                          </button>

                          {/* Cellular */}
                          <button
                            onClick={() => setCellular(!cellular)}
                            className={`w-12 h-12 ${circleRadius} flex items-center justify-center transition-all duration-200 active:scale-95 ${
                              cellular 
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                                : 'bg-white/15 text-white hover:bg-white/20'
                            }`}
                          >
                            <Radio className="w-5 h-5 stroke-[2.2]" />
                          </button>
                        </div>
                      </div>

                      {/* Now Playing 2x2 Platter */}
                      <div 
                        className={`bg-neutral-900/60 backdrop-blur-2xl border border-white/10 p-3.5 flex flex-col justify-between h-[152px] ${moduleRadius} transition-all shadow-lg`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img 
                            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=120&q=80" 
                            alt="Album" 
                            className="w-10 h-10 rounded-lg object-cover shadow"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-white truncate">Monday, Monday</div>
                            <div className="text-[10px] text-white/60 truncate">The Mamas & The Papas</div>
                          </div>
                          <Cast className="w-4 h-4 text-white/60 shrink-0" />
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-around pt-1 text-white">
                          <button className="p-1 active:scale-90 transition-transform">
                            <SkipBack className="w-4 h-4 fill-current" />
                          </button>
                          <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center active:scale-90 transition-transform"
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 fill-current" />
                            ) : (
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            )}
                          </button>
                          <button className="p-1 active:scale-90 transition-transform">
                            <SkipForward className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Middle Row: Lock/Mirroring + Sliders */}
                    <div className="grid grid-cols-4 gap-3.5 h-[152px]">
                      {/* Col 1-2: 2x1 Rotation Lock & Screen Mirroring */}
                      <div className="col-span-2 flex flex-col gap-3.5">
                        {/* 1x1 buttons in a 2-col row */}
                        <div className="grid grid-cols-2 gap-3.5">
                          <button 
                            onClick={() => setRotationLock(!rotationLock)}
                            className={`h-[68px] ${hookMode === 'ios18' ? 'rounded-full' : 'rounded-2xl'} bg-neutral-900/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center active:scale-95 transition-all shadow ${
                              rotationLock ? 'bg-red-500/80 text-white' : 'text-white/90 hover:bg-white/10'
                            }`}
                          >
                            <Lock className="w-5 h-5 stroke-[2.2]" />
                          </button>

                          <button 
                            className={`h-[68px] ${hookMode === 'ios18' ? 'rounded-full' : 'rounded-2xl'} bg-neutral-900/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/90 active:scale-95 hover:bg-white/10 transition-all shadow`}
                          >
                            <Layers className="w-5 h-5 stroke-[2.2]" />
                          </button>
                        </div>

                        {/* Focus 2x1 Capsule */}
                        <button 
                          onClick={() => setFocus(!focus)}
                          className={`h-[68px] ${hookMode === 'ios18' ? 'rounded-[26px]' : 'rounded-2xl'} bg-neutral-900/60 backdrop-blur-2xl border border-white/10 px-4 flex items-center gap-3 active:scale-98 transition-all shadow ${
                            focus ? 'bg-purple-600/80 text-white' : 'text-white/90 hover:bg-white/10'
                          }`}
                        >
                          <Moon className="w-5 h-5 stroke-[2.2] fill-current" />
                          <div className="text-xs font-medium text-left truncate">
                            <div>Focus</div>
                            <div className="text-[10px] text-white/60">{focus ? 'On' : 'Off'}</div>
                          </div>
                        </button>
                      </div>

                      {/* Col 3: Brightness Continuous Slider */}
                      <div className="col-span-1">
                        <div className={`relative w-full h-[152px] bg-neutral-900/70 backdrop-blur-2xl border border-white/10 ${sliderRadius} overflow-hidden flex flex-col justify-end shadow-lg group`}>
                          {/* Fill */}
                          <div 
                            className="w-full bg-white transition-all duration-75 relative flex items-center justify-center"
                            style={{ height: `${brightness}%` }}
                          >
                            <Sun className="w-5 h-5 text-neutral-800 absolute bottom-4 stroke-[2.2]" />
                          </div>
                          {/* Invisible Slider Input for scrub interaction */}
                          <input 
                            type="range" 
                            min="5" 
                            max="100" 
                            value={brightness}
                            onChange={(e) => setBrightness(Number(e.target.value))}
                            className="absolute inset-0 opacity-0 cursor-ns-resize w-full h-full"
                          />
                        </div>
                      </div>

                      {/* Col 4: Volume Continuous Slider */}
                      <div className="col-span-1">
                        <div className={`relative w-full h-[152px] bg-neutral-900/70 backdrop-blur-2xl border border-white/10 ${sliderRadius} overflow-hidden flex flex-col justify-end shadow-lg group`}>
                          {/* Fill */}
                          <div 
                            className="w-full bg-white transition-all duration-75 relative flex items-center justify-center"
                            style={{ height: `${volume}%` }}
                          >
                            {volume > 0 ? (
                              <Volume2 className="w-5 h-5 text-neutral-800 absolute bottom-4 stroke-[2.2]" />
                            ) : (
                              <VolumeX className="w-5 h-5 text-neutral-800 absolute bottom-4 stroke-[2.2]" />
                            )}
                          </div>
                          {/* Invisible Slider Input */}
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="absolute inset-0 opacity-0 cursor-ns-resize w-full h-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: 1x1 Quick Access Circular Toggles */}
                    <div className="grid grid-cols-4 gap-3.5">
                      {/* Timer */}
                      <button 
                        className={`h-[68px] ${hookMode === 'ios18' ? 'rounded-full' : 'rounded-2xl'} bg-neutral-900/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/90 active:scale-95 hover:bg-white/10 transition-all shadow`}
                      >
                        <Timer className="w-5 h-5 stroke-[2.2]" />
                      </button>

                      {/* Flashlight */}
                      <button 
                        onClick={() => setFlashlight(!flashlight)}
                        className={`h-[68px] ${hookMode === 'ios18' ? 'rounded-full' : 'rounded-2xl'} bg-neutral-900/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center active:scale-95 transition-all shadow ${
                          flashlight ? 'bg-white text-black shadow-lg shadow-white/30' : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        <Flashlight className="w-5 h-5 stroke-[2.2]" />
                      </button>

                      {/* Dark Mode */}
                      <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className={`h-[68px] ${hookMode === 'ios18' ? 'rounded-full' : 'rounded-2xl'} bg-neutral-900/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center active:scale-95 transition-all shadow ${
                          darkMode ? 'bg-neutral-100 text-black' : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-current flex overflow-hidden">
                          <div className="w-1/2 h-full bg-current"></div>
                        </div>
                      </button>

                      {/* QR Scanner */}
                      <button 
                        className={`h-[68px] ${hookMode === 'ios18' ? 'rounded-full' : 'rounded-2xl'} bg-neutral-900/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/90 active:scale-95 hover:bg-white/10 transition-all shadow`}
                      >
                        <QrCode className="w-5 h-5 stroke-[2.2]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentPage === 'music' && (
                  <motion.div 
                    key="music-page"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-3"
                  >
                    {/* iOS 18 Dedicated Big Music Platter */}
                    <div className="bg-neutral-900/80 backdrop-blur-3xl border border-white/10 p-5 rounded-[32px] flex flex-col gap-4 shadow-2xl">
                      <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/10 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80" 
                          alt="Album Full" 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-base font-bold text-white">Monday, Monday</div>
                          <div className="text-xs text-white/70">The Mamas & The Papas</div>
                        </div>
                        <button 
                          onClick={() => setLiked(!liked)}
                          className="p-2 active:scale-90 transition-transform"
                        >
                          <Heart className={`w-5 h-5 ${liked ? 'fill-pink-500 text-pink-500' : 'text-white/60'}`} />
                        </button>
                      </div>

                      {/* Scrub Bar */}
                      <div className="flex flex-col gap-1">
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-white rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-white/60">
                          <span>0:02</span>
                          <span>-3:24</span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-8 text-white py-1">
                        <button className="active:scale-90 transition-transform">
                          <SkipBack className="w-6 h-6 fill-current" />
                        </button>
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center active:scale-90 transition-transform"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6 fill-current" />
                          ) : (
                            <Play className="w-6 h-6 fill-current ml-1" />
                          )}
                        </button>
                        <button className="active:scale-90 transition-transform">
                          <SkipForward className="w-6 h-6 fill-current" />
                        </button>
                      </div>

                      {/* Output route capsule */}
                      <div className="mx-auto px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md flex items-center gap-2 text-xs text-white/90">
                        <Cast className="w-3.5 h-3.5" />
                        <span>iPhone</span>
                      </div>
                    </div>

                    {/* Bottom Pill: Control Other Speakers & TVs */}
                    <div className="p-3 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between text-xs text-white/80">
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4 text-white/70" />
                        <span>Control Other Speakers & TVs</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                    </div>
                  </motion.div>
                )}

                {currentPage === 'connectivity' && (
                  <motion.div 
                    key="connectivity-page"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2.5"
                  >
                    {/* Expanded Connectivity List as in iOS 18 screenshot */}
                    <div className="flex flex-col gap-2">
                      {/* Airplane */}
                      <div 
                        onClick={() => setAirplane(!airplane)}
                        className={`p-3 bg-neutral-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center gap-3.5 cursor-pointer active:scale-98 transition-all`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${airplane ? 'bg-amber-500 text-white' : 'bg-white/15 text-white'}`}>
                          <Plane className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Airplane Mode</div>
                          <div className="text-[10px] text-white/60">{airplane ? 'On' : 'Off'}</div>
                        </div>
                      </div>

                      {/* AirDrop */}
                      <div 
                        onClick={() => setAirdrop(!airdrop)}
                        className={`p-3 bg-neutral-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-all`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${airdrop ? 'bg-blue-500 text-white' : 'bg-white/15 text-white'}`}>
                            <Share2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">AirDrop</div>
                            <div className="text-[10px] text-white/60">{airdrop ? 'Contacts Only' : 'Off'}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/40" />
                      </div>

                      {/* Wi-Fi */}
                      <div 
                        onClick={() => setWifi(!wifi)}
                        className={`p-3 bg-neutral-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-all`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${wifi ? 'bg-blue-500 text-white' : 'bg-white/15 text-white'}`}>
                            <Wifi className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">Wi-Fi</div>
                            <div className="text-[10px] text-white/60">{wifi ? 'USS Enterprise' : 'Off'}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/40" />
                      </div>

                      {/* Cellular Data */}
                      <div 
                        onClick={() => setCellular(!cellular)}
                        className={`p-3 bg-neutral-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center gap-3.5 cursor-pointer active:scale-98 transition-all`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cellular ? 'bg-emerald-500 text-white' : 'bg-white/15 text-white'}`}>
                          <Radio className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Cellular Data</div>
                          <div className="text-[10px] text-white/60">{cellular ? 'On' : 'Off'}</div>
                        </div>
                      </div>

                      {/* Bluetooth */}
                      <div 
                        onClick={() => setBluetooth(!bluetooth)}
                        className={`p-3 bg-neutral-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-all`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bluetooth ? 'bg-blue-500 text-white' : 'bg-white/15 text-white'}`}>
                            <Bluetooth className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">Bluetooth</div>
                            <div className="text-[10px] text-white/60">{bluetooth ? 'On' : 'Off'}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/40" />
                      </div>

                      {/* Personal Hotspot */}
                      <div 
                        onClick={() => setHotspot(!hotspot)}
                        className={`p-3 bg-neutral-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center gap-3.5 cursor-pointer active:scale-98 transition-all`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hotspot ? 'bg-emerald-500 text-white' : 'bg-white/15 text-white'}`}>
                          <Radio className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Personal Hotspot</div>
                          <div className="text-[10px] text-white/60">{hotspot ? 'On' : 'Off'}</div>
                        </div>
                      </div>

                      {/* VPN */}
                      <div 
                        onClick={() => setVpn(!vpn)}
                        className={`p-3 bg-neutral-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center gap-3.5 cursor-pointer active:scale-98 transition-all`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${vpn ? 'bg-blue-600 text-white' : 'bg-white/15 text-white'}`}>
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">VPN</div>
                          <div className="text-[10px] text-white/60">{vpn ? 'Connected' : 'Off'}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right-side Page Indicator Dots (iOS 18 Multi-Page CC) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 py-2 px-1 rounded-full bg-black/20 backdrop-blur-md">
              <button 
                onClick={() => setCurrentPage('main')}
                className={`p-1 transition-all ${currentPage === 'main' ? 'text-white scale-125' : 'text-white/40 hover:text-white/70'}`}
                title="Main Controls"
              >
                <Heart className={`w-3.5 h-3.5 ${currentPage === 'main' ? 'fill-white' : ''}`} />
              </button>
              <button 
                onClick={() => setCurrentPage('music')}
                className={`p-1 transition-all ${currentPage === 'music' ? 'text-white scale-125' : 'text-white/40 hover:text-white/70'}`}
                title="Now Playing Controls"
              >
                <Music className={`w-3.5 h-3.5 ${currentPage === 'music' ? 'fill-white' : ''}`} />
              </button>
              <button 
                onClick={() => setCurrentPage('connectivity')}
                className={`p-1 transition-all ${currentPage === 'connectivity' ? 'text-white scale-125' : 'text-white/40 hover:text-white/70'}`}
                title="Connectivity Controls"
              >
                <Radio className={`w-3.5 h-3.5 ${currentPage === 'connectivity' ? 'stroke-[2.8]' : ''}`} />
              </button>
            </div>

            {/* Home Indicator Bar */}
            <div className="relative z-10 pb-2 pt-1 flex justify-center">
              <div className="w-32 h-1 bg-white/70 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Controls & Technical Insights */}
      <div className="flex-1 space-y-5">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Live Control Center Hook Inspector
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Toggle tweak runtime behavior and inspect hooked Objective-C properties.
              </p>
            </div>
            <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
              <button
                onClick={() => setHookMode('ios18')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  hookMode === 'ios18' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                iOS 18 Tweak Hooked
              </button>
              <button
                onClick={() => setHookMode('ios16')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  hookMode === 'ios16' 
                    ? 'bg-neutral-800 text-white shadow' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Stock iOS 16 Rectangles
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-3">
              <div className="text-[11px] font-mono text-neutral-400">layer.cornerCurve</div>
              <div className="text-sm font-semibold text-blue-400 mt-1">
                {hookMode === 'ios18' ? 'kCACornerCurveContinuous' : 'kCACornerCurveCircular'}
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">
                Squircle continuous bezier curves applied to all containers.
              </p>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-3">
              <div className="text-[11px] font-mono text-neutral-400">1x1 Module Corner Radius</div>
              <div className="text-sm font-semibold text-emerald-400 mt-1">
                {hookMode === 'ios18' ? 'bounds.width / 2.0 (34pt)' : '18.0pt (Stock)'}
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">
                Full circular geometry for quick toggles and round buttons.
              </p>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-3">
              <div className="text-[11px] font-mono text-neutral-400">CCUIContinuousSliderView</div>
              <div className="text-sm font-semibold text-amber-400 mt-1">
                {hookMode === 'ios18' ? '26.0pt Continuous Capsule' : '16.0pt Radius'}
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">
                Thickened continuous slider clipping and indicator view.
              </p>
            </div>
          </div>

          {/* Quick Page Navigators */}
          <div className="mt-4 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
            <div className="text-xs text-neutral-400">Simulate Pages (Right sidebar dots):</div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setCurrentPage('main')}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  currentPage === 'main' 
                    ? 'border-blue-500 bg-blue-500/10 text-blue-300' 
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                Page 1: Main Platters
              </button>
              <button
                onClick={() => setCurrentPage('music')}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  currentPage === 'music' 
                    ? 'border-blue-500 bg-blue-500/10 text-blue-300' 
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                Page 2: 2x4 Music Hero
              </button>
              <button
                onClick={() => setCurrentPage('connectivity')}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  currentPage === 'connectivity' 
                    ? 'border-blue-500 bg-blue-500/10 text-blue-300' 
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                Page 3: Expanded Connectivity
              </button>
            </div>
          </div>
        </div>

        {/* Hooked Private Classes Info */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Hooked iOS 16 Classes & Methods
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 flex items-center justify-between">
              <span>%hook <strong className="text-blue-400">CCUIContentModuleContainerView</strong></span>
              <span className="text-neutral-500">- (void)layoutSubviews</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 flex items-center justify-between">
              <span>%hook <strong className="text-blue-400">CCUIContinuousSliderView</strong></span>
              <span className="text-neutral-500">- (void)layoutSubviews</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 flex items-center justify-between">
              <span>%hook <strong className="text-blue-400">CCUIRoundButton</strong></span>
              <span className="text-neutral-500">- (void)layoutSubviews</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 flex items-center justify-between">
              <span>%hook <strong className="text-blue-400">CCUIModularControlCenterOverlayViewController</strong></span>
              <span className="text-neutral-500">- (void)viewDidLoad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
