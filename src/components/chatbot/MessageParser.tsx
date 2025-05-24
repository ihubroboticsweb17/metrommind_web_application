class MessageParser {
    actionProvider: any;
  
    constructor(actionProvider: any) {
      this.actionProvider = actionProvider;
    }
  
    parse(message: string) {
      const lowerCaseMessage = message.toLowerCase();
      
      if (lowerCaseMessage.includes("hello")) {
        this.actionProvider.handleHello();
      } else {
        this.actionProvider.handleDefault();
      }
    }
  }
  
  export default MessageParser;
  