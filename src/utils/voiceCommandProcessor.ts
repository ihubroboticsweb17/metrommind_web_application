
import WebRTCGptService from './WebRTCGptService';

/**
 * Process a voice command and return an appropriate response
 */
export const processVoiceCommand = async (command: string): Promise<string> => {
  console.log('Processing voice command:', command);
  
  if (!command || command.trim() === '') {
    console.log('Empty command received');
    return "I didn't catch that. Could you please speak again?";
  }
  
  try {
    // Check if WebRTC GPT API is initialized
    if (!WebRTCGptService.isInitialized()) {
      console.log('WebRTC GPT not initialized, initializing with current key');
      const apiKey = WebRTCGptService.getApiKey();
      if (apiKey) {
        WebRTCGptService.initialize(apiKey);
      } else {
        console.warn('No API key available');
        return "I'm not properly configured. Please set up the assistant with a valid API key.";
      }
    }
    
    // Use WebRTC GPT for processing with instructions to sound natural
    console.log('Using WebRTC GPT for processing command');
    try {
      // Create a prompt that asks the model to respond in a natural, human-like way
      const enhancedCommand = {
        command: command,
        instructions: "Respond in a conversational, warm, and natural way. Use contractions (I'm, you're, can't), vary sentence length, and express empathy where appropriate. Avoid robotic or overly formal language."
      };
      
      const response = await WebRTCGptService.processVoiceCommand(command);
      console.log('GPT response received:', response);
      
      // Post-process response to sound more natural
      const naturalResponse = makeResponseMoreNatural(response);
      return naturalResponse;
    } catch (gptError) {
      console.error('Error using WebRTC GPT:', gptError);
      
      // If there's a specific error message from the API, return it
      if (gptError instanceof Error) {
        return `Sorry, I had a problem processing that: ${gptError.message}`;
      }
      
      throw gptError;
    }
  } catch (error) {
    console.error('Error processing voice command:', error);
    return "I'm sorry, I encountered an error while processing your request. Please try again or check your internet connection.";
  }
};

/**
 * Transform a response to sound more natural and human-like
 */
const makeResponseMoreNatural = (response: string): string => {
  // Replace formal phrases with more conversational ones
  let natural = response
    .replace(/I am unable to/g, "I can't")
    .replace(/I am not able to/g, "I can't")
    .replace(/I would recommend/g, "I'd recommend")
    .replace(/I would suggest/g, "I'd suggest")
    .replace(/It is/g, "It's")
    .replace(/that is/g, "that's")
    .replace(/You are/g, "You're")
    .replace(/I will/g, "I'll")
    .replace(/cannot/g, "can't")
    .replace(/I have/g, "I've")
    .replace(/you have/g, "you've")
    .replace(/they have/g, "they've")
    .replace(/we have/g, "we've")
    .replace(/do not/g, "don't");
  
  // Add some human-like filler words occasionally, but don't overdo it
  if (Math.random() > 0.7) {
    const fillers = ["Well, ", "So, ", "Hmm, ", "Let's see, ", "You know, "];
    const filler = fillers[Math.floor(Math.random() * fillers.length)];
    if (!natural.startsWith("I'm sorry") && !natural.startsWith("Sorry")) {
      natural = filler + natural.charAt(0).toLowerCase() + natural.slice(1);
    }
  }
  
  return natural;
};
