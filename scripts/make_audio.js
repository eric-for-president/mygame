const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const audioDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const wavPath = path.join(audioDir, 'madan-bhandari-speech.wav');

// Use powershell via child process with single-quoted script file or encoded command
const psScript = `
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SetOutputToWaveFile('${wavPath.replace(/\\/g, '\\\\')}')
$synth.Speak('Yadi Raja Birendralai raajneeti garne rahar chha bhane, shreepech fukaalera khulaamanchama chunaab ladna aaoon! Historic speech by Comrade Madan Bhandari, Khulamanch 2047 BS.')
$synth.Dispose()
`;

const psPath = path.join(__dirname, 'gen_speech.ps1');
fs.writeFileSync(psPath, psScript, 'utf8');

try {
  execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { stdio: 'inherit' });
  console.log('Successfully generated:', wavPath);
} catch (e) {
  console.error('Error generating audio:', e);
} finally {
  if (fs.existsSync(psPath)) fs.unlinkSync(psPath);
}
