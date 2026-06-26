// Procedural Web Audio API Tanpura Drone Synthesizer
// Generates continuous meditative drones in Sa-Pa-Sa configuration

class TanpuraSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: any = null;
  private masterGain: GainNode | null = null;

  start() {
    if (this.isPlaying) return;
    
    // Create AudioContext safely
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime); // keep volume soft
    this.masterGain.connect(this.ctx.destination);
    
    this.isPlaying = true;
    
    // Frequencies for Tanpura strings in C scale (Sa-Pa-Sa-Sa)
    // 1. Pa (G3): 196.00 Hz
    // 2. Sa (C4): 261.63 Hz
    // 3. Sa (C4): 261.63 Hz
    // 4. Sa (C3): 130.81 Hz
    const notes = [196.00, 261.63, 261.63, 130.81];
    let noteIndex = 0;

    const pluckString = (freq: number) => {
      if (!this.ctx || !this.masterGain) return;
      
      const now = this.ctx.currentTime;
      
      // 1. Fundamental Oscillator
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      
      // Soft warm triangle wave
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      
      // Add slight frequency modulation for string vibration realism
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(4.5, now); // 4.5Hz vibration
      lfoGain.gain.setValueAtTime(freq * 0.003, now); // very subtle
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      
      // 2. Overtone (Second Harmonic) for rich string shimmer
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2, now);
      
      // 3. Setup Envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.35, now + 0.6); // slow attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 3.8); // long decay
      
      overtoneGain.gain.setValueAtTime(0, now);
      overtoneGain.gain.linearRampToValueAtTime(0.08, now + 0.3);
      overtoneGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      
      // Connect nodes
      osc.connect(gainNode);
      overtone.connect(overtoneGain);
      
      gainNode.connect(this.masterGain);
      overtoneGain.connect(this.masterGain);
      
      // Start/Stop
      osc.start(now);
      overtone.start(now);
      
      osc.stop(now + 4.0);
      overtone.stop(now + 4.0);
    };

    // Strum sequentially every 1.2 seconds
    this.intervalId = setInterval(() => {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      pluckString(notes[noteIndex]);
      noteIndex = (noteIndex + 1) % notes.length;
    }, 1200);
  }

  stop() {
    if (!this.isPlaying) return;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      // Fade out master volume smoothly
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0, now + 0.5);
      
      setTimeout(() => {
        if (this.ctx) {
          this.ctx.close();
          this.ctx = null;
        }
      }, 600);
    }
    
    this.isPlaying = false;
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

export const audioSynth = new TanpuraSynth();
export default audioSynth;
