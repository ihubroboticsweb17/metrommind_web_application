
// ElevenLabs API service for text-to-speech
class ElevenLabsService {
  private static API_KEY: string = '';
  private static API_URL: string = 'https://api.elevenlabs.io/v1/text-to-speech';
  private static VOICE_ID: string = 'EXAVITQu4vr4xnSDxMaL'; // Sarah voice ID (default)
  private static MODEL_ID: string = 'eleven_multilingual_v2';

  // Available voice options
  static readonly AVAILABLE_VOICES = [
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah' },
    { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris' },
    { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam' },
    { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte' },
    { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily' },
  ];

  // Initialize with API key
  static initialize(apiKey: string): void {
    if (!apiKey || apiKey.trim() === '') {
      console.error('ElevenLabs API key is empty or invalid');
      return;
    }
    
    this.API_KEY = apiKey;
    console.log('ElevenLabs API initialized');
    localStorage.setItem('elevenLabsApiKey', apiKey);
  }

  // Get API key from localStorage or return empty string
  static getApiKey(): string {
    return localStorage.getItem('elevenLabsApiKey') || this.API_KEY;
  }

  // Set a different voice ID
  static setVoiceId(voiceId: string): void {
    this.VOICE_ID = voiceId;
    localStorage.setItem('elevenLabsVoiceId', voiceId);
    console.log(`Voice set to ID: ${voiceId}`);
  }

  // Get the current voice ID
  static getVoiceId(): string {
    return localStorage.getItem('elevenLabsVoiceId') || this.VOICE_ID;
  }

  // Get all available voices
  static getAvailableVoices() {
    return this.AVAILABLE_VOICES;
  }

  // Check if API key is set
  static isInitialized(): boolean {
    const apiKey = this.getApiKey();
    return !!apiKey && apiKey.trim() !== '';
  }

  // Convert text to speech using ElevenLabs API
  static async textToSpeech(text: string): Promise<ArrayBuffer | null> {
    const apiKey = this.getApiKey();
    const voiceId = this.getVoiceId();
    
    if (!apiKey || apiKey.trim() === '') {
      console.error('ElevenLabs API key not set or invalid');
      return null;
    }

    try {
      console.log(`Sending text to ElevenLabs API with voice ID: ${voiceId}`);
      
      const response = await fetch(`${this.API_URL}/${voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: this.MODEL_ID,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        let errorMessage = `ElevenLabs API error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.error('ElevenLabs API error details:', errorData);
          if (errorData.detail && errorData.detail.message) {
            errorMessage = `ElevenLabs API error: ${errorData.detail.message}`;
          }
        } catch (e) {
          console.error('Could not parse error response as JSON');
        }
        throw new Error(errorMessage);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error converting text to speech:', error);
      return null;
    }
  }
}

export default ElevenLabsService;
