// Web Audio API generator for SENA Hymn melody
class SenaHymnAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private currentNoteIndex = 0;
  private onNoteChange?: (index: number) => void;
  private onStateChange?: (isPlaying: boolean) => void;

  // The ceremonial melody notes (frequencies in Hz and durations in seconds)
  // Coro: "Estudiantes del SENA ¡adelante! / Por Colombia luchad con amor..."
  private melody = [
    { note: 'G4', freq: 392.00, dur: 0.35, stanza: 0 },
    { note: 'C5', freq: 523.25, dur: 0.5, stanza: 0 },
    { note: 'C5', freq: 523.25, dur: 0.35, stanza: 0 },
    { note: 'E5', freq: 659.25, dur: 0.45, stanza: 0 },
    { note: 'D5', freq: 587.33, dur: 0.4, stanza: 0 },
    { note: 'C5', freq: 523.25, dur: 0.8, stanza: 0 }, // Estudiantes del SENA ¡adelante!

    { note: 'B4', freq: 493.88, dur: 0.35, stanza: 0 },
    { note: 'C5', freq: 523.25, dur: 0.4, stanza: 0 },
    { note: 'D5', freq: 587.33, dur: 0.5, stanza: 0 },
    { note: 'G4', freq: 392.00, dur: 0.45, stanza: 0 },
    { note: 'F5', freq: 698.46, dur: 0.45, stanza: 0 },
    { note: 'E5', freq: 659.25, dur: 0.8, stanza: 0 }, // Por Colombia luchad con amor

    { note: 'G4', freq: 392.00, dur: 0.35, stanza: 0 },
    { note: 'C5', freq: 523.25, dur: 0.5, stanza: 0 },
    { note: 'E5', freq: 659.25, dur: 0.4, stanza: 0 },
    { note: 'G5', freq: 783.99, dur: 0.6, stanza: 0 },
    { note: 'F5', freq: 698.46, dur: 0.4, stanza: 0 },
    { note: 'E5', freq: 659.25, dur: 0.4, stanza: 0 },
    { note: 'D5', freq: 587.33, dur: 0.6, stanza: 0 }, // Con el ánimo noble y constante

    { note: 'C5', freq: 523.25, dur: 0.4, stanza: 0 },
    { note: 'D5', freq: 587.33, dur: 0.4, stanza: 0 },
    { note: 'E5', freq: 659.25, dur: 0.4, stanza: 0 },
    { note: 'D5', freq: 587.33, dur: 0.4, stanza: 0 },
    { note: 'C5', freq: 523.25, dur: 1.0, stanza: 0 }, // Al trabajo, la patria y el honor

    // Estrofa 1: "Hoy la patria nos grita sentida..."
    { note: 'E5', freq: 659.25, dur: 0.4, stanza: 1 },
    { note: 'E5', freq: 659.25, dur: 0.4, stanza: 1 },
    { note: 'D5', freq: 587.33, dur: 0.4, stanza: 1 },
    { note: 'C5', freq: 523.25, dur: 0.6, stanza: 1 },
    { note: 'G4', freq: 392.00, dur: 0.4, stanza: 1 },
    { note: 'A4', freq: 440.00, dur: 0.5, stanza: 1 },
    { note: 'B4', freq: 493.88, dur: 0.5, stanza: 1 },
    { note: 'C5', freq: 523.25, dur: 0.8, stanza: 1 }, // Hoy la patria nos grita sentida

    { note: 'D5', freq: 587.33, dur: 0.4, stanza: 1 },
    { note: 'E5', freq: 659.25, dur: 0.4, stanza: 1 },
    { note: 'F5', freq: 698.46, dur: 0.6, stanza: 1 },
    { note: 'E5', freq: 659.25, dur: 0.4, stanza: 1 },
    { note: 'D5', freq: 587.33, dur: 0.5, stanza: 1 },
    { note: 'C5', freq: 523.25, dur: 0.9, stanza: 1 }  // ¡Estudiantes del SENA, triunfad!
  ];

  public setCallbacks(
    onNoteChange: (index: number) => void,
    onStateChange: (isPlaying: boolean) => void
  ) {
    this.onNoteChange = onNoteChange;
    this.onStateChange = onStateChange;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.onStateChange?.(true);
    this.playNextNote();
  }

  private playNextNote() {
    if (!this.isPlaying || !this.ctx) return;

    if (this.currentNoteIndex >= this.melody.length) {
      this.stop();
      return;
    }

    const item = this.melody[this.currentNoteIndex];
    this.onNoteChange?.(this.currentNoteIndex);

    // Create harmonic brass-like voice
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(item.freq, this.ctx.currentTime);

    // Warm sub-harmonic overtone
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(item.freq * 2, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    const dur = item.dur;

    // Envelope
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + dur - 0.03);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + dur);
    osc2.stop(now + dur);

    this.timer = window.setTimeout(() => {
      this.currentNoteIndex++;
      this.playNextNote();
    }, dur * 1000);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.onStateChange?.(false);
  }

  public stop() {
    this.pause();
    this.currentNoteIndex = 0;
    this.onNoteChange?.(0);
  }

  public getCurrentStanza(): number {
    if (this.currentNoteIndex < this.melody.length) {
      return this.melody[this.currentNoteIndex].stanza;
    }
    return 0;
  }
}

export const senaHymnAudio = new SenaHymnAudio();
