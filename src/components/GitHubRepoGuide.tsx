import React, { useState } from 'react';
import { 
  FolderGit2, 
  Github, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  Share2, 
  Smartphone, 
  CheckCircle2,
  ExternalLink,
  Code2,
  FileCode,
  Package
} from 'lucide-react';
import { TWEAK_FILES } from '../data/tweakSourceCode';

export default function GitHubRepoGuide() {
  const [username, setUsername] = useState('yourusername');
  const [repoName, setRepoName] = useState('ios18morph-repo');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sileoUrl = `https://${username}.github.io/${repoName}/`;

  const githubActionWorkflow = `name: Build Rootless Tweak & Deploy Sileo APT Repo

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: macos-14
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Install Theos and iOS 16 SDK
        run: |
          git clone --recursive https://github.com/theos/theos.git $HOME/theos
          echo "THEOS=$HOME/theos" >> $GITHUB_ENV
          curl -LO https://github.com/theos/sdks/archive/master.zip
          unzip -q master.zip
          mv sdks-master/iPhoneOS16.5.sdk $HOME/theos/sdks/ || true

      - name: Compile Rootless .deb
        run: |
          export THEOS=$HOME/theos
          export THEOS_PACKAGE_SCHEME=rootless
          make clean
          make package FINALPACKAGE=1

      - name: Generate APT Repository Structure (Sileo)
        run: |
          mkdir -p repo/debs
          cp packages/*.deb repo/debs/
          cd repo
          
          # Generate Packages index
          dpkg-scanpackages -m debs /dev/null > Packages
          gzip -c9 Packages > Packages.gz
          bzip2 -c9 Packages > Packages.bz2
          
          # Create Release file
          cat << 'EOF' > Release
          Origin: iOS 18 Morph Repo
          Label: iOS 18 Morph
          Suite: stable
          Version: 1.0
          Codename: iphoneos-arm64
          Architectures: iphoneos-arm64
          Components: main
          Description: iOS 18 Morph Rootless Tweak Repository for Sileo
          EOF

      - name: Deploy to GitHub Pages (Sileo Repo)
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./repo
          publish_branch: gh-pages
`;

  const downloadAllFilesScript = `#!/bin/bash
# iOS 18 Morph - Quick GitHub Repo Initializer Script
mkdir -p .github/workflows
mkdir -p repo

echo "Creating control..."
cat << 'EOF' > control
${TWEAK_FILES.control.content}
EOF

echo "Creating Makefile..."
cat << 'EOF' > Makefile
${TWEAK_FILES.makefile.content}
EOF

echo "Creating Tweak.h..."
cat << 'EOF' > Tweak.h
${TWEAK_FILES.tweakHeader.content}
EOF

echo "Creating Tweak.x..."
cat << 'EOF' > Tweak.x
${TWEAK_FILES.tweakSource.content}
EOF

echo "Creating iOS18Morph.plist..."
cat << 'EOF' > iOS18Morph.plist
${TWEAK_FILES.plist.content}
EOF

echo "Creating GitHub Actions Workflow (.github/workflows/build.yml)..."
cat << 'EOF' > .github/workflows/build.yml
${githubActionWorkflow}
EOF

echo "Done! Initializing git repository..."
git init
git add .
git commit -m "Initial commit: iOS 18 Morph Rootless Theos tweak"
echo "Ready to push to GitHub!"
`;

  const handleDownloadSetupScript = () => {
    const blob = new Blob([downloadAllFilesScript], { type: 'text/x-sh;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'setup_github_repo.sh';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-blue-950/40 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 shrink-0">
            <FolderGit2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                Host on GitHub & Install via Sileo APT Repo
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                Automated Sileo Source
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Push this source code to a free GitHub repository. Our included <strong>GitHub Actions workflow</strong> automatically compiles the rootless <code className="text-neutral-200">.deb</code> and publishes an APT repository URL that you add straight to <strong>Sileo</strong> or <strong>Zebra</strong> on your iPhone.
            </p>
          </div>
        </div>
      </div>

      {/* Sileo Repo URL Generator */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          1. Configure Your Sileo Repository URL
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-mono text-neutral-400 block mb-1">Your GitHub Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value.trim() || 'yourusername')}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500"
              placeholder="e.g. taowhidgaming"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-neutral-400 block mb-1">Repository Name</label>
            <input 
              type="text" 
              value={repoName}
              onChange={(e) => setRepoName(e.target.value.trim() || 'ios18morph')}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500"
              placeholder="e.g. ios18morph-repo"
            />
          </div>
        </div>

        {/* Generated Sileo URL Box */}
        <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium text-neutral-400">Your Sileo & Zebra Source URL:</div>
            <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5 select-all">
              {sileoUrl}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleCopy(sileoUrl, 'sileoUrl')}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
            >
              {copiedKey === 'sileoUrl' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy URL</span>
                </>
              )}
            </button>

            <a
              href={`sileo://source/${sileoUrl}`}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow"
              title="Open directly in Sileo on iPhone"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Add to Sileo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Step-by-Step Push to GitHub Instructions */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Github className="w-4 h-4 text-white" />
          2. Step-by-Step GitHub Setup Guide
        </h3>

        <div className="space-y-3 text-xs text-neutral-300">
          {/* Step A */}
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
            <div className="font-bold text-white flex items-center justify-between">
              <span className="text-blue-400">Step A: Create New GitHub Repository</span>
              <span className="text-[11px] font-mono text-neutral-500">github.com/new</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Go to <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">github.com/new</a> and create a new <strong>Public</strong> repository named <code className="text-neutral-200 font-mono">{repoName}</code>.
            </p>
          </div>

          {/* Step B */}
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
            <div className="font-bold text-white flex items-center justify-between">
              <span className="text-amber-400">Step B: Download Repository Files or Run Auto-Script</span>
              <span className="text-[11px] font-mono text-neutral-500">Terminal</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              You can download our 1-click shell setup script that writes all 6 source files and git commits them automatically:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleDownloadSetupScript}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5 transition-colors shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download setup_github_repo.sh</span>
              </button>
            </div>
            <p className="text-neutral-400 text-[11px] pt-1">
              Or run the following commands in your terminal:
            </p>
            <div className="p-2.5 bg-neutral-900 rounded-lg font-mono text-[11px] text-emerald-400 flex items-center justify-between overflow-x-auto">
              <code>git remote add origin https://github.com/{username}/{repoName}.git && git branch -M main && git push -u origin main</code>
              <button 
                onClick={() => handleCopy(`git remote add origin https://github.com/${username}/${repoName}.git && git branch -M main && git push -u origin main`, 'gitpush')} 
                className="p-1 hover:text-white shrink-0 ml-2"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step C */}
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
            <div className="font-bold text-white flex items-center justify-between">
              <span className="text-emerald-400">Step C: Enable GitHub Pages</span>
              <span className="text-[11px] font-mono text-neutral-500">Settings &gt; Pages</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Once the GitHub Action runs, go to your repository on GitHub &gt; <strong>Settings</strong> &gt; <strong>Pages</strong> &gt; Set <strong>Source</strong> to <em>Deploy from a branch</em> &gt; select <strong className="text-white">gh-pages</strong> branch &gt; click <strong>Save</strong>.
            </p>
          </div>

          {/* Step D */}
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
            <div className="font-bold text-white flex items-center justify-between">
              <span className="text-purple-400">Step D: Add Source into Sileo & Install Tweak</span>
              <span className="text-[11px] font-mono text-neutral-500">Sileo on iPhone</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              1. Open <strong>Sileo</strong> on your jailbroken iPhone.<br/>
              2. Go to the <strong>Sources</strong> tab &gt; tap the <strong>+</strong> button in top-right.<br/>
              3. Enter <code className="text-emerald-400 font-mono">{sileoUrl}</code> and tap <strong>Add Source</strong>.<br/>
              4. Open the added repo, select <strong>iOS 18 Morph</strong>, and tap <strong>Get &gt; Confirm</strong> to install!
            </p>
          </div>
        </div>
      </div>

      {/* GitHub Actions CI File Preview */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-semibold text-white font-mono">
              .github/workflows/build.yml (Automated CI/CD)
            </h4>
          </div>
          <button
            onClick={() => handleCopy(githubActionWorkflow, 'workflow')}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5"
          >
            {copiedKey === 'workflow' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Workflow</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl font-mono text-xs text-neutral-300 max-h-72 overflow-y-auto leading-relaxed select-text">
          <pre>{githubActionWorkflow}</pre>
        </div>
      </div>
    </div>
  );
}
