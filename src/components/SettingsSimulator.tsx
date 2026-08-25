import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Mic, 
  Volume2, 
  Bell, 
  Moon, 
  Hourglass, 
  Camera, 
  Clock, 
  HardDrive, 
  ShieldAlert, 
  Share2, 
  Airplay, 
  PictureInPicture2, 
  Car, 
  KeyRound, 
  RefreshCw, 
  Calendar, 
  BookA, 
  Type, 
  Keyboard, 
  Globe, 
  Tv, 
  ShieldCheck, 
  Scale, 
  Power,
  RotateCw,
  SlidersHorizontal,
  Info,
  Layers,
  Sparkles,
  Settings as SettingsIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SettingsSimulator() {
  const [activeTab, setActiveTab] = useState<'general' | 'search' | 'advanced'>('general');
  const [hookMode, setHookMode] = useState<'ios18' | 'ios16'>('ios18');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start">
      {/* Phone Stage */}
      <div className="w-full xl:w-[420px] shrink-0 mx-auto flex flex-col items-center">
        {/* Device Frame */}
        <div className="w-full max-w-[390px] h-[810px] bg-black rounded-[52px] p-3.5 shadow-2xl border-4 border-neutral-800 relative select-none overflow-hidden flex flex-col">
          
          {/* Dynamic Island */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
            <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900"></div>
          </div>

          {/* Screen Content - Dark Theme Settings */}
          <div className="w-full h-full rounded-[40px] bg-black text-white relative overflow-hidden flex flex-col font-sans">
            
            {/* Status Bar */}
            <div className="pt-3 px-6 flex items-center justify-between text-xs font-semibold tracking-tight z-20">
              <span className="text-white">4:32</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium">5G</span>
                <div className="w-5 h-2.5 border border-white/70 rounded-xs p-0.5 flex items-center">
                  <div className="w-3.5 h-full bg-white rounded-2xs"></div>
                </div>
              </div>
            </div>

            {/* Top Navigation Bar */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-white/5 relative z-10">
              <button 
                onClick={() => setActiveTab('general')}
                className="flex items-center gap-1 text-blue-500 font-normal text-[17px] active:opacity-60 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 -ml-1 stroke-[2.5]" />
                <span>Settings</span>
              </button>
              
              <h2 className="text-[17px] font-semibold text-white tracking-tight absolute left-1/2 -translate-x-1/2">
                {activeTab === 'general' ? 'General' : 'Search'}
              </h2>

              <button 
                onClick={() => setActiveTab(activeTab === 'general' ? 'search' : 'general')}
                className="text-blue-500 text-[15px] font-medium"
              >
                {activeTab === 'general' ? <Search className="w-4 h-4" /> : 'Cancel'}
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-8 px-4 pt-3">
              <AnimatePresence mode="wait">
                {activeTab === 'general' && (
                  <motion.div 
                    key="general-view"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* iOS 18 HERO HEADER CARD (Injected via Tweak.x on PSListController) */}
                    {hookMode === 'ios18' ? (
                      <div className="w-full bg-neutral-900/90 border border-white/10 rounded-[24px] p-5 flex flex-col items-center text-center shadow-lg relative overflow-hidden backdrop-blur-xl">
                        {/* Glow effect */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

                        {/* Category Icon in Squircle */}
                        <div className="w-14 h-14 rounded-[14px] bg-neutral-700/60 border border-white/10 flex items-center justify-center shadow-inner mb-3">
                          <SettingsIcon className="w-8 h-8 text-neutral-200 stroke-[1.8]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                          General
                        </h3>

                        {/* Description */}
                        <p className="text-[13px] text-neutral-400 leading-relaxed max-w-[280px]">
                          Manage your overall setup and preferences for iPhone, such as software updates, device language, CarPlay, AirDrop, and more.
                        </p>
                      </div>
                    ) : (
                      /* Stock iOS 16 Style Header (Plain text or no hero) */
                      <div className="py-2 px-2 text-xs text-neutral-500 font-medium">
                        Standard iOS 16 grouped layout without hero overview card.
                      </div>
                    )}

                    {/* Group 1: About, Software Update, Storage */}
                    <div className="bg-neutral-900/80 rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-white">
                            <Info className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">About</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-white">
                            <SettingsIcon className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Software Update</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-white">
                            <HardDrive className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">iPhone Storage</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    </div>

                    {/* Group 2: AppleCare */}
                    <div className="bg-neutral-900/80 rounded-2xl overflow-hidden border border-white/5">
                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white">
                            <ShieldAlert className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">AppleCare & Warranty</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    </div>

                    {/* Group 3: AirDrop, AirPlay, PIP, CarPlay */}
                    <div className="bg-neutral-900/80 rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                            <Share2 className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">AirDrop</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <Airplay className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">AirPlay & Continuity</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                            <PictureInPicture2 className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Picture in Picture</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                            <Car className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">CarPlay</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    </div>

                    {/* Group 4: Autofill, Date, Fonts, Keyboard */}
                    <div className="bg-neutral-900/80 rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-white">
                            <KeyRound className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">AutoFill & Passwords</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-white">
                            <RefreshCw className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Background App Refresh</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Date & Time</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                            <BookA className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Dictionary</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-neutral-600 flex items-center justify-center text-white">
                            <Type className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Fonts</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-neutral-600 flex items-center justify-center text-white">
                            <Keyboard className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Keyboard</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                            <Globe className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Language & Region</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    </div>

                    {/* Reset & Shut Down */}
                    <div className="bg-neutral-900/80 rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-white">
                            <RotateCw className="w-4 h-4" />
                          </div>
                          <span className="text-[15px] font-normal text-white">Transfer or Reset iPhone</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between active:bg-white/5 cursor-pointer">
                        <span className="text-[15px] font-normal text-blue-500">Shut Down</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'search' && (
                  <motion.div 
                    key="search-view"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Search Field */}
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                      <input 
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2 pl-10 pr-10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                      />
                      <Mic className="w-4 h-4 text-neutral-400 absolute right-3.5" />
                    </div>

                    {/* Suggestions Grid (as in reference image ios-18-settings-2.webp) */}
                    <div>
                      <div className="text-xs text-neutral-400 font-medium mb-2.5 px-1">Suggestions</div>
                      <div className="grid grid-cols-4 gap-2">
                        {/* Sounds & Haptics */}
                        <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl bg-neutral-900/60 border border-white/5 active:scale-95 transition-transform cursor-pointer">
                          <div className="w-12 h-12 rounded-[12px] bg-red-500 flex items-center justify-center text-white shadow-md">
                            <Volume2 className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] text-neutral-300 leading-tight">Sounds & Haptics</span>
                        </div>

                        {/* Notifications */}
                        <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl bg-neutral-900/60 border border-white/5 active:scale-95 transition-transform cursor-pointer">
                          <div className="w-12 h-12 rounded-[12px] bg-red-500 flex items-center justify-center text-white shadow-md">
                            <Bell className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] text-neutral-300 leading-tight">Notifications</span>
                        </div>

                        {/* Focus */}
                        <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl bg-neutral-900/60 border border-white/5 active:scale-95 transition-transform cursor-pointer">
                          <div className="w-12 h-12 rounded-[12px] bg-indigo-600 flex items-center justify-center text-white shadow-md">
                            <Moon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] text-neutral-300 leading-tight">Focus</span>
                        </div>

                        {/* Screen Time */}
                        <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl bg-neutral-900/60 border border-white/5 active:scale-95 transition-transform cursor-pointer">
                          <div className="w-12 h-12 rounded-[12px] bg-purple-600 flex items-center justify-center text-white shadow-md">
                            <Hourglass className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] text-neutral-300 leading-tight">Screen Time</span>
                        </div>
                      </div>
                    </div>

                    {/* Recents List */}
                    <div>
                      <div className="text-xs text-neutral-400 font-medium mb-2 px-1">Recents</div>
                      <div className="bg-neutral-900/80 rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                        <div className="px-4 py-3 flex items-center gap-3 active:bg-white/5 cursor-pointer">
                          <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-white">
                            <SettingsIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">General</div>
                            <div className="text-[11px] text-neutral-500">GENERAL</div>
                          </div>
                        </div>

                        <div className="px-4 py-3 flex items-center gap-3 active:bg-white/5 cursor-pointer">
                          <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-white">
                            <Camera className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Camera</div>
                            <div className="text-[11px] text-neutral-500">SETTINGS</div>
                          </div>
                        </div>

                        <div className="px-4 py-3 flex items-center gap-3 active:bg-white/5 cursor-pointer">
                          <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Abode</div>
                            <div className="text-[11px] text-neutral-500">APPS</div>
                          </div>
                        </div>

                        <div className="px-4 py-3 flex items-center gap-3 active:bg-white/5 cursor-pointer">
                          <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center text-white">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Clock</div>
                            <div className="text-[11px] text-neutral-500">SETTINGS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Home Indicator */}
            <div className="pb-2 pt-1 flex justify-center z-20">
              <div className="w-32 h-1 bg-white/70 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tweak Hook Analysis & Settings Specs */}
      <div className="flex-1 space-y-5">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Settings App Hook Breakdown (Preferences.app)
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Examine how the tweak dynamically injects the iOS 18 Hero Card and modern table views.
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
                iOS 18 Injected Hero
              </button>
              <button
                onClick={() => setHookMode('ios16')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  hookMode === 'ios16' 
                    ? 'bg-neutral-800 text-white shadow' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Stock iOS 16 List
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-xs space-y-1.5">
              <div className="font-semibold text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                1. PSListController Table Header Injection
              </div>
              <p className="text-neutral-400 leading-relaxed">
                By hooking <code className="text-neutral-200">- (void)viewDidLoad</code> in <code className="text-neutral-200">PSListController</code>, the tweak inspects the specifier identifier. When opening &ldquo;General&rdquo;, it generates an <code className="text-blue-300">iOS18SettingsHeroCardView</code> containing an icon squircle, prominent bold title, and secondary label, setting it as <code className="text-neutral-200">self.table.tableHeaderView</code>.
              </p>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-xs space-y-1.5">
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                2. PSTableCell Modernized Continuous Corners
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Table cells are intercepted in <code className="text-neutral-200">layoutSubviews</code> to apply <code className="text-emerald-300">kCACornerCurveContinuous</code> with unified 7pt corner radius on category icons, eliminating sharp corners and aligning with iOS 18 squircle specs.
              </p>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-xs space-y-1.5">
              <div className="font-semibold text-purple-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                3. Material Kit Thin Visual Effect Blur
              </div>
              <p className="text-neutral-400 leading-relaxed">
                The hero card leverages <code className="text-purple-300">UIBlurEffectStyleSystemThinMaterial</code> with 0.5pt subtle 12% white alpha border, rendering crisp depth on both OLED dark mode and light mode.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
