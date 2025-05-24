
// WebRTC GPT API service for voice interactions
class WebRTCGptService {
  private static API_KEY: string = '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';
  private static API_URL: string = 'https://api.openai.com/v1/chat/completions';
  private static MODEL: string = 'gpt-4o-mini';
  private static isInitializedFlag: boolean = false;

  // Initialize with API key
  static initialize(apiKey: string): void {
    if (!apiKey || apiKey.trim() === '') {
      console.error('WebRTC GPT API key is empty or invalid');
      return;
    }
    
    this.API_KEY = apiKey;
    this.isInitializedFlag = true;
    console.log('WebRTC GPT API initialized with key:', apiKey.substring(0, 10) + '...');
    localStorage.setItem('webrtcGptApiKey', apiKey);
  }

  // Get API key from localStorage or return default API key
  static getApiKey(): string {
    const storedKey = localStorage.getItem('webrtcGptApiKey');
    // Prioritize the default key to ensure we're using the latest
    const apiKey = this.API_KEY || storedKey;
    
    if (!apiKey || apiKey.trim() === '') {
      console.warn('No WebRTC GPT API key found in storage or default');
      return '';
    }
    
    return apiKey;
  }

  // Check if API key is set
  static isInitialized(): boolean {
    return this.isInitializedFlag || !!this.getApiKey();
  }

  // Process voice command with GPT
  static async processVoiceCommand(command: string): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey || apiKey.trim() === '') {
      console.error('WebRTC GPT API key not set or invalid');
      return "I couldn't process your request because the API key is not set properly.";
    }

    try {
      console.log(`Sending command to WebRTC GPT API: ${command}`);
      
      // Detailed logging of API request
      console.log('Making request to OpenAI API with model:', this.MODEL);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.MODEL,
          messages: [
            {
              role: "system",
              content: "You are a helpful voice assistant for a mental health application called MetroMind. Provide warm, conversational, and supportive responses about therapy, medication, appointments, and mental wellbeing. Use contractions like 'I'll', 'you're', and 'can't' to sound natural. Vary your sentence length and structure. Occasionally start with casual phrases like 'Well,' or 'You know,' to sound more human. Express empathy and use friendly, reassuring language. Keep responses under 3-4 sentences for clarity."
            },
            {
              role: "user",
              content: command
            }
          ],
          temperature: 0.8, // Slightly higher temperature for more natural, varied responses
          max_tokens: 150,
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `WebRTC GPT API error: ${response.status} ${response.statusText}`;
        
        try {
          const errorText = await response.text();
          console.error('WebRTC GPT API error response:', errorText);
          
          let errorData;
          try {
            errorData = JSON.parse(errorText);
            console.error('Parsed error data:', errorData);
            if (errorData.error && errorData.error.message) {
              errorMessage = `API error: ${errorData.error.message}`;
            }
          } catch (e) {
            console.error('Could not parse error response as JSON');
          }
        } catch (e) {
          console.error('Could not read error response');
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('GPT response received:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API');
      }
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error processing voice command:', error);
      return "I'm sorry, I encountered an error while processing your request. Please try again in a moment.";
    }
  }
}

export default WebRTCGptService;
