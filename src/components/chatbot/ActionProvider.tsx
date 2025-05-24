class ActionProvider {
    createChatBotMessage: any;
    setState: any;
  
    constructor(createChatBotMessage: any, setStateFunc: any) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleHello = () => {
      const message = this.createChatBotMessage("Hi there! How can I assist you?");
      this.updateChatbotState(message);
    };
  
    handleDefault = () => {
      const message = this.createChatBotMessage("Sorry, I didn't understand that.");
      this.updateChatbotState(message);
    };
  
    updateChatbotState = (message: any) => {
      this.setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  }
  
  export default ActionProvider;
  