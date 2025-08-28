// Dummy chat API that echoes back user messages after a short delay
export const sendMessage = async (text: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`You said: ${text}`);
    }, 500);
  });
};
