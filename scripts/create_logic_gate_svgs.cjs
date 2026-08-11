const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'logic-gates');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Clean, high-tech SVG logic gate diagrams WITHOUT giving away the gate name
const svgs = {
  'and-gate.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%" style="background:#0b0f19;">
    <defs>
      <linearGradient id="andGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00f2fe" />
        <stop offset="100%" stop-color="#4facfe" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="600" height="320" fill="#0b0f19" />
    <path d="M 0 40 L 600 40 M 0 80 L 600 80 M 0 120 L 600 120 M 0 160 L 600 160 M 0 200 L 600 200 M 0 240 L 600 240 M 0 280 L 600 280" stroke="#1e293b" stroke-width="1" />
    <path d="M 100 0 L 100 320 M 200 0 L 200 320 M 300 0 L 300 320 M 400 0 L 400 320 M 500 0 L 500 320" stroke="#1e293b" stroke-width="1" />
    
    <!-- Inputs -->
    <line x1="80" y1="110" x2="220" y2="110" stroke="#00f2fe" stroke-width="5" filter="url(#glow)" />
    <text x="55" y="117" font-family="sans-serif" font-size="24" font-weight="bold" fill="#38bdf8">A</text>
    
    <line x1="80" y1="210" x2="220" y2="210" stroke="#00f2fe" stroke-width="5" filter="url(#glow)" />
    <text x="55" y="217" font-family="sans-serif" font-size="24" font-weight="bold" fill="#38bdf8">B</text>

    <!-- AND Gate Symbol Body -->
    <path d="M 220,80 L 300,80 A 80,80 0 0,1 300,240 L 220,240 Z" fill="#0f172a" stroke="url(#andGlow)" stroke-width="6" filter="url(#glow)" />
    
    <!-- Output -->
    <line x1="380" y1="160" x2="500" y2="160" stroke="#00f2fe" stroke-width="5" filter="url(#glow)" />
    <text x="525" y="167" font-family="sans-serif" font-size="24" font-weight="bold" fill="#38bdf8">Y</text>
  </svg>`,

  'or-gate.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%" style="background:#0b0f19;">
    <defs>
      <linearGradient id="orGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#a855f7" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="600" height="320" fill="#0b0f19" />
    <path d="M 0 40 L 600 40 M 0 80 L 600 80 M 0 120 L 600 120 M 0 160 L 600 160 M 0 200 L 600 200 M 0 240 L 600 240 M 0 280 L 600 280" stroke="#1e293b" stroke-width="1" />
    <path d="M 100 0 L 100 320 M 200 0 L 200 320 M 300 0 L 300 320 M 400 0 L 400 320 M 500 0 L 500 320" stroke="#1e293b" stroke-width="1" />
    
    <!-- Inputs -->
    <line x1="80" y1="110" x2="245" y2="110" stroke="#c084fc" stroke-width="5" filter="url(#glow)" />
    <text x="55" y="117" font-family="sans-serif" font-size="24" font-weight="bold" fill="#e9d5ff">A</text>
    
    <line x1="80" y1="210" x2="245" y2="210" stroke="#c084fc" stroke-width="5" filter="url(#glow)" />
    <text x="55" y="217" font-family="sans-serif" font-size="24" font-weight="bold" fill="#e9d5ff">B</text>

    <!-- OR Gate Symbol Body -->
    <path d="M 200,80 Q 250,160 200,240 Q 310,240 380,160 Q 310,80 200,80 Z" fill="#0f172a" stroke="url(#orGlow)" stroke-width="6" filter="url(#glow)" />
    
    <!-- Output -->
    <line x1="380" y1="160" x2="500" y2="160" stroke="#c084fc" stroke-width="5" filter="url(#glow)" />
    <text x="525" y="167" font-family="sans-serif" font-size="24" font-weight="bold" fill="#e9d5ff">Y</text>
  </svg>`,

  'not-gate.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%" style="background:#0b0f19;">
    <defs>
      <linearGradient id="notGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f43f5e" />
        <stop offset="100%" stop-color="#fb7185" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="600" height="320" fill="#0b0f19" />
    <path d="M 0 40 L 600 40 M 0 80 L 600 80 M 0 120 L 600 120 M 0 160 L 600 160 M 0 200 L 600 200 M 0 240 L 600 240 M 0 280 L 600 280" stroke="#1e293b" stroke-width="1" />
    
    <!-- Input -->
    <line x1="100" y1="160" x2="220" y2="160" stroke="#f43f5e" stroke-width="5" filter="url(#glow)" />
    <text x="70" y="167" font-family="sans-serif" font-size="24" font-weight="bold" fill="#fca5a5">A</text>

    <!-- NOT Triangle -->
    <polygon points="220,80 350,160 220,240" fill="#0f172a" stroke="url(#notGlow)" stroke-width="6" filter="url(#glow)" />
    <!-- Bubble -->
    <circle cx="362" cy="160" r="12" fill="#0f172a" stroke="#f43f5e" stroke-width="5" filter="url(#glow)" />

    <!-- Output -->
    <line x1="374" y1="160" x2="490" y2="160" stroke="#f43f5e" stroke-width="5" filter="url(#glow)" />
    <text x="515" y="167" font-family="sans-serif" font-size="24" font-weight="bold" fill="#fca5a5">Y</text>
  </svg>`,

  'nand-gate.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%" style="background:#0b0f19;">
    <defs>
      <linearGradient id="nandGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#34d399" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="600" height="320" fill="#0b0f19" />
    <path d="M 0 40 L 600 40 M 0 80 L 600 80 M 0 120 L 600 120 M 0 160 L 600 160 M 0 200 L 600 200 M 0 240 L 600 240 M 0 280 L 600 280" stroke="#1e293b" stroke-width="1" />
    
    <line x1="80" y1="110" x2="220" y2="110" stroke="#10b981" stroke-width="5" filter="url(#glow)" />
    <text x="55" y="117" font-family="sans-serif" font-size="24" font-weight="bold" fill="#a7f3d0">A</text>
    
    <line x1="80" y1="210" x2="220" y2="210" stroke="#10b981" stroke-width="5" filter="url(#glow)" />
    <text x="55" y="217" font-family="sans-serif" font-size="24" font-weight="bold" fill="#a7f3d0">B</text>

    <path d="M 220,80 L 300,80 A 80,80 0 0,1 300,240 L 220,240 Z" fill="#0f172a" stroke="url(#nandGlow)" stroke-width="6" filter="url(#glow)" />
    <circle cx="392" cy="160" r="12" fill="#0f172a" stroke="#10b981" stroke-width="5" filter="url(#glow)" />

    <line x1="404" y1="160" x2="490" y2="160" stroke="#10b981" stroke-width="5" filter="url(#glow)" />
    <text x="515" y="167" font-family="sans-serif" font-size="24" font-weight="bold" fill="#a7f3d0">Y</text>
  </svg>`,

  'nor-gate.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%" style="background:#0b0f19;">
    <defs>
      <linearGradient id="norGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#fbbf24" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="600" height="320" fill="#0b0f19" />
    <path d="M 0 40 L 600 40 M 0 80 L 600 80 M 0 120 L 600 120 M 0 160 L 600 160 M 0 200 L 600 200 M 0 240 L 600 240 M 0 280 L 600 280" stroke="#1e293b" stroke-width="1" />
    
    <line x1="80" y1="110" x2="245" y2="110" stroke="#f59e0b" stroke-width="5" filter="url(#glow)" />
    <text x="55" y="117" font-family="sans-serif" font-size="24" font-weight="bold" fill="#fde68a">A</text>
    
    <line x1="80" y1="210" x2="245" y2="210" stroke="#f59e0b" stroke-width="5" filter="url(#glow)" />
    <text x="55" y="217" font-family="sans-serif" font-size="24" font-weight="bold" fill="#fde68a">B</text>

    <path d="M 200,80 Q 250,160 200,240 Q 310,240 380,160 Q 310,80 200,80 Z" fill="#0f172a" stroke="url(#norGlow)" stroke-width="6" filter="url(#glow)" />
    <circle cx="392" cy="160" r="12" fill="#0f172a" stroke="#f59e0b" stroke-width="5" filter="url(#glow)" />

    <line x1="404" y1="160" x2="490" y2="160" stroke="#f59e0b" stroke-width="5" filter="url(#glow)" />
    <text x="515" y="167" font-family="sans-serif" font-size="24" font-weight="bold" fill="#fde68a">Y</text>
  </svg>`,

  'xor-gate.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%" style="background:#0b0f19;">
    <defs>
      <linearGradient id="xorGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#06b6d4" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="600" height="320" fill="#0b0f19" />
    <path d="M 0 40 L 600 40 M 0 80 L 600 80 M 0 120 L 600 120 M 0 160 L 600 160 M 0 200 L 600 200 M 0 240 L 600 240 M 0 280 L 600 280" stroke="#1e293b" stroke-width="1" />
    
    <line x1="70" y1="110" x2="225" y2="110" stroke="#06b6d4" stroke-width="5" filter="url(#glow)" />
    <text x="45" y="117" font-family="sans-serif" font-size="24" font-weight="bold" fill="#bae6fd">A</text>
    
    <line x1="70" y1="210" x2="225" y2="210" stroke="#06b6d4" stroke-width="5" filter="url(#glow)" />
    <text x="45" y="217" font-family="sans-serif" font-size="24" font-weight="bold" fill="#bae6fd">B</text>

    <path d="M 180,80 Q 230,160 180,240" fill="none" stroke="url(#xorGlow)" stroke-width="6" filter="url(#glow)" />
    <path d="M 200,80 Q 250,160 200,240 Q 310,240 380,160 Q 310,80 200,80 Z" fill="#0f172a" stroke="url(#xorGlow)" stroke-width="6" filter="url(#glow)" />

    <line x1="380" y1="160" x2="490" y2="160" stroke="#06b6d4" stroke-width="5" filter="url(#glow)" />
    <text x="515" y="167" font-family="sans-serif" font-size="24" font-weight="bold" fill="#bae6fd">Y</text>
  </svg>`,

  'xnor-gate.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%" style="background:#0b0f19;">
    <defs>
      <linearGradient id="xnorGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#818cf8" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="600" height="320" fill="#0b0f19" />
    <path d="M 0 40 L 600 40 M 0 80 L 600 80 M 0 120 L 600 120 M 0 160 L 600 160 M 0 200 L 600 200 M 0 240 L 600 240 M 0 280 L 600 280" stroke="#1e293b" stroke-width="1" />
    
    <line x1="70" y1="110" x2="225" y2="110" stroke="#6366f1" stroke-width="5" filter="url(#glow)" />
    <text x="45" y="117" font-family="sans-serif" font-size="24" font-weight="bold" fill="#c7d2fe">A</text>
    
    <line x1="70" y1="210" x2="225" y2="210" stroke="#6366f1" stroke-width="5" filter="url(#glow)" />
    <text x="45" y="217" font-family="sans-serif" font-size="24" font-weight="bold" fill="#c7d2fe">B</text>

    <path d="M 180,80 Q 230,160 180,240" fill="none" stroke="url(#xnorGlow)" stroke-width="6" filter="url(#glow)" />
    <path d="M 200,80 Q 250,160 200,240 Q 310,240 380,160 Q 310,80 200,80 Z" fill="#0f172a" stroke="url(#xnorGlow)" stroke-width="6" filter="url(#glow)" />
    <circle cx="392" cy="160" r="12" fill="#0f172a" stroke="#6366f1" stroke-width="5" filter="url(#glow)" />

    <line x1="404" y1="160" x2="490" y2="160" stroke="#6366f1" stroke-width="5" filter="url(#glow)" />
    <text x="515" y="167" font-family="sans-serif" font-size="24" font-weight="bold" fill="#c7d2fe">Y</text>
  </svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content.trim(), 'utf8');
  console.log('Regenerated clean SVG:', filename);
}
