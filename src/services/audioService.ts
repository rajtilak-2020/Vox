const DOT_DURATION = 80;
const DASH_DURATION = DOT_DURATION * 3;
const SYMBOL_GAP = DOT_DURATION;
const LETTER_GAP = DOT_DURATION * 3;
const WORD_GAP = DOT_DURATION * 7;
const FREQUENCY = 600;
const SAMPLE_RATE = 44100;

export interface MorseAudioData {
  audioBuffer: AudioBuffer;
  audioContext: AudioContext;
}

const createTone = (
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  startTime: number
): { buffer: AudioBuffer; duration: number } => {
  const sampleRate = audioContext.sampleRate;
  const numSamples = Math.floor((duration / 1000) * sampleRate);
  const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
  const channelData = buffer.getChannelData(0);

  const attackTime = 0.005;
  const releaseTime = 0.005;
  const attackSamples = Math.floor(attackTime * sampleRate);
  const releaseSamples = Math.floor(releaseTime * sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let amplitude = Math.sin(2 * Math.PI * frequency * t);

    if (i < attackSamples) {
      amplitude *= i / attackSamples;
    } else if (i > numSamples - releaseSamples) {
      amplitude *= (numSamples - i) / releaseSamples;
    }

    channelData[i] = amplitude * 0.3;
  }

  return { buffer, duration };
};

export const generateMorseAudio = async (
  morseCode: string
): Promise<MorseAudioData> => {
  const audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });

  let totalDuration = 0;
  const audioSegments: { buffer: AudioBuffer; startTime: number }[] = [];

  const symbols = morseCode.split('');

  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];

    if (symbol === '.') {
      const { buffer } = createTone(
        audioContext,
        FREQUENCY,
        DOT_DURATION,
        totalDuration
      );
      audioSegments.push({ buffer, startTime: totalDuration / 1000 });
      totalDuration += DOT_DURATION + SYMBOL_GAP;
    } else if (symbol === '-') {
      const { buffer } = createTone(
        audioContext,
        FREQUENCY,
        DASH_DURATION,
        totalDuration
      );
      audioSegments.push({ buffer, startTime: totalDuration / 1000 });
      totalDuration += DASH_DURATION + SYMBOL_GAP;
    } else if (symbol === ' ') {
      totalDuration += LETTER_GAP - SYMBOL_GAP;
    } else if (symbol === '/') {
      totalDuration += WORD_GAP - SYMBOL_GAP;
    }
  }

  const finalBuffer = audioContext.createBuffer(
    1,
    Math.ceil((totalDuration / 1000) * SAMPLE_RATE),
    SAMPLE_RATE
  );
  const finalChannelData = finalBuffer.getChannelData(0);

  audioSegments.forEach(({ buffer, startTime }) => {
    const sourceData = buffer.getChannelData(0);
    const startSample = Math.floor(startTime * SAMPLE_RATE);

    for (let i = 0; i < sourceData.length; i++) {
      if (startSample + i < finalChannelData.length) {
        finalChannelData[startSample + i] = sourceData[i];
      }
    }
  });

  return { audioBuffer: finalBuffer, audioContext };
};

export const playMorseAudio = (
  audioBuffer: AudioBuffer,
  audioContext: AudioContext
): AudioBufferSourceNode => {
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
  return source;
};

export const downloadMorseAudio = (
  audioBuffer: AudioBuffer,
  filename: string = 'morse-code.wav'
): void => {
  const wav = audioBufferToWav(audioBuffer);
  const blob = new Blob([wav], { type: 'audio/wav' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1;
  const bitDepth = 16;

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const data = interleave(buffer);
  const dataLength = data.length * bytesPerSample;
  const headerLength = 44;
  const totalLength = headerLength + dataLength;

  const arrayBuffer = new ArrayBuffer(totalLength);
  const view = new DataView(arrayBuffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, totalLength - 8, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataLength, true);

  floatTo16BitPCM(view, 44, data);

  return arrayBuffer;
};

const interleave = (buffer: AudioBuffer): Float32Array => {
  const numChannels = buffer.numberOfChannels;
  const length = buffer.length * numChannels;
  const result = new Float32Array(length);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < channelData.length; i++) {
      result[i * numChannels + channel] = channelData[i];
    }
  }

  return result;
};

const writeString = (view: DataView, offset: number, string: string): void => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

const floatTo16BitPCM = (
  view: DataView,
  offset: number,
  input: Float32Array
): void => {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
};
