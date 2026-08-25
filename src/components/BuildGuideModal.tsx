import React, { useState } from 'react';
import { 
  Terminal, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  FolderGit2, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Smartphone, 
  AlertCircle,
  HelpCircle,
  Code2
} from 'lucide-react';

import React, { useState } from 'react';
import { 
  Terminal, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  FolderGit2, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Smartphone, 
  AlertCircle,
  HelpCircle,
  Code2,
  Download,
  Share2,
  PackageCheck,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { TWEAK_FILES } from '../data/tweakSourceCode';

export default function BuildGuideModal() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeMethod, setActiveMethod] = useState<'device' | 'pc' | 'direct-deb'>('device');

  const handleCopyCmd = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleDownloadAllZip = () => {
    const fullProjectManifest = Object.values(TWEAK_FILES)
      .map(
        (f) =>
          `# ========================================================\n# FILE: ${f.path}\n# ========================================================\n${f.content}\n\n`
      )
      .join('\n');

    const blob = new Blob([fullProjectManifest], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'iOS18Morph_Source_Bundle.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              How to Install iOS 18 Morph on Your iPhone
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Step-by-step installation instructions for <strong>jailbroken iPhones running iOS 16.0 through 16.7.x</strong> (Dopamine 2.x, palera1n, or XinaA15). Follow the guide below using either direct on-device compiling (NewTerm/Filza) or your Mac/PC (Theos).
            </p>
          </div>
        </div>
      </div>

      {/* Prerequisites Checklist */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Device Requirements & Prerequisites
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Jailbroken iPhone</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">iOS 16.0–16.7.10 (Dopamine or palera1n)</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">ElleKit / Substrate</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">Installed via Sileo / Zebra for rootless hooking</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Package Manager</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">Sileo, Zebra, or Filza File Manager</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Architecture</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">arm64 (A11 & older) or arm64e (A12+)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Method Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">Select Your Preferred Installation Method:</h4>
          <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
            <button
              onClick={() => setActiveMethod('device')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeMethod === 'device' ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Option 1: Direct on iPhone (NewTerm)
            </button>
            <button
              onClick={() => setActiveMethod('pc')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeMethod === 'pc' ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Option 2: From Mac / PC (Theos)
            </button>
            <button
              onClick={() => setActiveMethod('direct-deb')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeMethod === 'direct-deb' ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Option 3: Filza / Sileo .deb
            </button>
          </div>
        </div>

        {/* Method 1: On-Device Compilation */}
        {activeMethod === 'device' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              <Terminal className="w-4 h-4" />
              Method 1: Direct On-Device Installation via NewTerm 3 / Filza
            </div>

            <ol className="space-y-3 text-xs text-neutral-300">
              <li className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>1. Install Build Tools on iPhone from Sileo</span>
                  <span className="text-[10px] font-mono text-neutral-500">Sileo / Zebra</span>
                </div>
                <p className="text-neutral-400">
                  Open Sileo and install: <strong>Theos</strong> (from Procursus/Chariz), <strong>NewTerm 3</strong> (Terminal app), and <strong>Filza File Manager 64-bit</strong>.
                </p>
              </li>

              <li className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>2. Create Project Folder in /var/mobile/ or /var/jb/</span>
                  <span className="text-[10px] font-mono text-neutral-500">NewTerm Terminal</span>
                </div>
                <p className="text-neutral-400">Open NewTerm and run the following command to create the workspace:</p>
                <div className="p-2.5 bg-neutral-900 rounded-lg font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>mkdir -p ~/iOS18Morph && cd ~/iOS18Morph</code>
                  <button onClick={() => handleCopyCmd('mkdir -p ~/iOS18Morph && cd ~/iOS18Morph')} className="p-1 hover:text-white">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </li>

              <li className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>3. Place the Source Files</span>
                  <span className="text-[10px] font-mono text-neutral-500">Filza or Nano</span>
                </div>
                <p className="text-neutral-400">
                  Create <code className="text-neutral-200">control</code>, <code className="text-neutral-200">Makefile</code>, <code className="text-neutral-200">Tweak.h</code>, <code className="text-neutral-200">Tweak.x</code>, and <code className="text-neutral-200">iOS18Morph.plist</code> using Filza text editor or copy them from the <strong>Tweak Source Code</strong> tab.
                </p>
              </li>

              <li className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>4. Build and Install in NewTerm</span>
                  <span className="text-[10px] font-mono text-neutral-500">Compile & Respring</span>
                </div>
                <div className="p-2.5 bg-neutral-900 rounded-lg font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>make package install FINALPACKAGE=1 THEOS_PACKAGE_SCHEME=rootless</code>
                  <button onClick={() => handleCopyCmd('make package install FINALPACKAGE=1 THEOS_PACKAGE_SCHEME=rootless')} className="p-1 hover:text-white">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Theos will compile the arm64/arm64e dylib, place it in <code className="text-neutral-300">/var/jb/Library/MobileSubstrate/DynamicLibraries/</code>, and trigger a respring!
                </p>
              </li>
            </ol>
          </div>
        )}

        {/* Method 2: Mac / PC Theos */}
        {activeMethod === 'pc' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              <Cpu className="w-4 h-4" />
              Method 2: Compile on Mac / Linux PC & Install via SSH / AirDrop
            </div>

            <ol className="space-y-3 text-xs text-neutral-300">
              <li className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <div className="font-bold text-white">1. Clone / Create the Tweak Folder on your Computer</div>
                <p className="text-neutral-400">On your Mac or Linux machine with Theos installed:</p>
                <div className="p-2.5 bg-neutral-900 rounded-lg font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>mkdir -p ~/iOS18Morph && cd ~/iOS18Morph</code>
                  <button onClick={() => handleCopyCmd('mkdir -p ~/iOS18Morph && cd ~/iOS18Morph')} className="p-1 hover:text-white">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Place <code className="text-neutral-200">control</code>, <code className="text-neutral-200">Makefile</code>, <code className="text-neutral-200">Tweak.h</code>, <code className="text-neutral-200">Tweak.x</code>, and <code className="text-neutral-200">iOS18Morph.plist</code> in the folder.
                </p>
              </li>

              <li className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <div className="font-bold text-white">2. Compile the Rootless Debian Package</div>
                <div className="p-2.5 bg-neutral-900 rounded-lg font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>make package FINALPACKAGE=1</code>
                  <button onClick={() => handleCopyCmd('make package FINALPACKAGE=1')} className="p-1 hover:text-white">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Output package is saved in <code className="text-neutral-300">./packages/com.jailbreak.ios18morph_1.0.0_iphoneos-arm64.deb</code>.
                </p>
              </li>

              <li className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <div className="font-bold text-white">3. Deploy to Device over Wi-Fi SSH</div>
                <div className="p-2.5 bg-neutral-900 rounded-lg font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>make do THEOS_DEVICE_IP=YOUR_IP THEOS_DEVICE_PORT=2222</code>
                  <button onClick={() => handleCopyCmd('make do THEOS_DEVICE_IP=192.168.1.100 THEOS_DEVICE_PORT=2222')} className="p-1 hover:text-white">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Replace <code className="text-neutral-300">YOUR_IP</code> with your iPhone&apos;s Wi-Fi IP address (check in Settings &gt; Wi-Fi).
                </p>
              </li>
            </ol>
          </div>
        )}

        {/* Method 3: Filza .deb Installation */}
        {activeMethod === 'direct-deb' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              <PackageCheck className="w-4 h-4" />
              Method 3: Direct Installation with Filza or Sileo
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5">
                <div className="font-bold text-white">1. Transfer .deb to iPhone</div>
                <p className="text-neutral-400">
                  Send the compiled <code className="text-neutral-200">.deb</code> file to your iPhone using <strong>AirDrop</strong>, <strong>iCloud Drive</strong>, or <strong>Local HTTP Server</strong>.
                </p>
              </div>

              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5">
                <div className="font-bold text-white">2. Open in Filza File Manager</div>
                <p className="text-neutral-400">
                  Tap the <code className="text-neutral-200">.deb</code> file in Filza &gt; tap <strong>Install</strong> in the top right &gt; Filza will run <code className="text-neutral-200">dpkg -i</code>.
                </p>
              </div>

              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5">
                <div className="font-bold text-white">3. Respring SpringBoard</div>
                <p className="text-neutral-400">
                  Once Filza displays <strong className="text-emerald-400">Bash Return Code: 0</strong>, tap <strong>Action &gt; Respring</strong> or run <code className="text-neutral-200">sbreload</code>. Pull down Control Center to experience the iOS 18 circular platters!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Installation Respring & Troubleshooting */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-blue-400" />
          Respringing & Verification Commands
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-neutral-500">Soft Respring (Recommended)</div>
              <div className="text-emerald-400 font-semibold mt-0.5">sbreload</div>
            </div>
            <button onClick={() => handleCopyCmd('sbreload')} className="p-1.5 rounded-lg bg-neutral-800 hover:text-white">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-neutral-500">Force Restart SpringBoard</div>
              <div className="text-emerald-400 font-semibold mt-0.5">killall -9 SpringBoard Preferences</div>
            </div>
            <button onClick={() => handleCopyCmd('killall -9 SpringBoard Preferences')} className="p-1.5 rounded-lg bg-neutral-800 hover:text-white">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

