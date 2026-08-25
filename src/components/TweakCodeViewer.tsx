import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  Terminal, 
  FileText, 
  Settings, 
  Sliders, 
  Search,
  ExternalLink,
  FolderTree,
  Sparkles
} from 'lucide-react';
import { TWEAK_FILES } from '../data/tweakSourceCode';

export default function TweakCodeViewer() {
  const [selectedFileKey, setSelectedFileKey] = useState<string>('tweakSource');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const currentFile = TWEAK_FILES[selectedFileKey] || TWEAK_FILES.tweakSource;

  const handleCopy = (content: string, key: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleDownloadFile = (file: typeof currentFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllZip = () => {
    // Generate a downloadable shell bundle / multi-file text download
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
    link.download = 'iOS18Morph_Tweak_Source_Bundle.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Line numbering
  const lines = currentFile.content.split('\n');

  return (
    <div className="space-y-4">
      {/* File Navigation & Actions Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {Object.entries(TWEAK_FILES).map(([key, file]) => {
            const isActive = selectedFileKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedFileKey(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-neutral-950/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                {key === 'tweakSource' && <FileCode className="w-3.5 h-3.5" />}
                {key === 'tweakHeader' && <FileCode className="w-3.5 h-3.5 text-blue-300" />}
                {key === 'makefile' && <Terminal className="w-3.5 h-3.5 text-amber-400" />}
                {key === 'control' && <FileText className="w-3.5 h-3.5 text-emerald-400" />}
                {key === 'plist' && <Settings className="w-3.5 h-3.5 text-purple-400" />}
                {key === 'postinst' && <Terminal className="w-3.5 h-3.5 text-rose-400" />}
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy(currentFile.content, currentFile.name)}
            className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
          >
            {copiedKey === currentFile.name ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy {currentFile.name}</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleDownloadFile(currentFile)}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-700"
            title="Download this file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handleDownloadAllZip}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow"
            title="Download all tweak files"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Bundle</span>
          </button>
        </div>
      </div>

      {/* File Description Header */}
      <div className="bg-neutral-900/70 border border-neutral-800 px-4 py-3 rounded-xl flex items-center justify-between text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="font-mono text-blue-400 font-semibold">{currentFile.path}</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">{currentFile.description}</span>
        </div>
        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          {lines.length} lines
        </span>
      </div>

      {/* Code Display Canvas */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Editor Top Bar */}
        <div className="px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="ml-2 text-xs font-mono text-neutral-400">
              Theos Rootless Toolchain • {currentFile.name}
            </span>
          </div>

          <div className="text-[11px] font-mono text-neutral-500">
            Target: iOS 16.0–16.7.x (arm64/arm64e)
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 font-mono text-xs overflow-x-auto max-h-[640px] leading-relaxed select-text">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                // Syntax highlighting keywords simulation for Logos / ObjC
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('#') || line.trim().startsWith('/*') || line.trim().startsWith('*');
                const isLogosDirective = line.includes('%hook') || line.includes('%end') || line.includes('%orig') || line.includes('%ctor') || line.includes('%init') || line.includes('%group');
                const isInterface = line.includes('@interface') || line.includes('@implementation') || line.includes('@property') || line.includes('@end');

                return (
                  <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                    <td className="text-neutral-600 text-right pr-4 select-none w-10 text-[11px] align-top font-mono">
                      {lineNum}
                    </td>
                    <td className="text-neutral-200 whitespace-pre">
                      {isComment ? (
                        <span className="text-neutral-500 italic">{line}</span>
                      ) : isLogosDirective ? (
                        <span className="text-amber-400 font-semibold">{line}</span>
                      ) : isInterface ? (
                        <span className="text-purple-300 font-semibold">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
