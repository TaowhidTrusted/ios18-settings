import React, { useState } from 'react';
import { 
  FileCode, 
  Smartphone, 
  Settings, 
  Terminal, 
  Sliders, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  Info,
  CheckCircle2,
  ChevronRight,
  Code2,
  FolderTree,
  Cpu,
  Eye
} from 'lucide-react';
import ControlCenterSimulator from './components/ControlCenterSimulator';
import SettingsSimulator from './components/SettingsSimulator';
import TweakCodeViewer from './components/TweakCodeViewer';
import BuildGuideModal from './components/BuildGuideModal';
import GitHubRepoGuide from './components/GitHubRepoGuide';
import { TWEAK_FILES } from './data/tweakSourceCode';

export default function App() {
  const [activeTab, setActiveTab] = useState<'code' | 'github' | 'cc-sim' | 'settings-sim' | 'guide'>('github');
  const [showReferenceModal, setShowReferenceModal] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">
                  iOS 18 Morph
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                  Theos Rootless
                </span>
                <span className="hidden sm:inline px-2 py-0.5 text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
                  iOS 16.0–16.7.x
                </span>
              </div>
              <p className="text-xs text-neutral-400 truncate max-w-[280px] sm:max-w-none">
                Objective-C & Logos Hooking Suite for Control Center & Settings
              </p>
            </div>
          </div>

          {/* Quick Targets / Spec Info */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>arm64 / arm64e</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dopamine & palera1n</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-neutral-900">
          <button
            onClick={() => setActiveTab('github')}
            className={`py-3 px-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'github'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>GitHub & Sileo Repo Export</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Tweak Source Code (control, Makefile, Tweak.x)</span>
          </button>

          <button
            onClick={() => setActiveTab('cc-sim')}
            className={`py-3 px-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'cc-sim'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Control Center Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('settings-sim')}
            className={`py-3 px-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'settings-sim'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings App Hero Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Theos Rootless Build Guide</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'github' && <GitHubRepoGuide />}
        {activeTab === 'code' && <TweakCodeViewer />}
        {activeTab === 'cc-sim' && <ControlCenterSimulator />}
        {activeTab === 'settings-sim' && <SettingsSimulator />}
        {activeTab === 'guide' && <BuildGuideModal />}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950/80 py-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono">
            <span>iOS 18 Morph for iOS 16 Rootless</span>
            <span>•</span>
            <span className="text-neutral-400">ARC Compliant (-fobjc-arc)</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            Targeting Dopamine 2.x, palera1n, ElleKit & Cydia Substrate rootless architectures.
          </div>
        </div>
      </footer>
    </div>
  );
}
