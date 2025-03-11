import axios from "axios";
interface Message {
  id: number;
  userId: string;
  content: string;
}
// Create an axios instance for reuse
const api = axios.create({
  baseURL: "https://localhost:7073",
  headers: {
    "Content-Type": "application/json",
  },
});

// Placeholder implementation until WebSocket integration is complete
export const sendMessage = async (message: Message) => {
  // console.log("Sending message...")
  try {
    await api.post("/messages", message);
    return;
    // Should I Return the API response?
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Re-throws the error to allow handling it in the calling component
  }
};

export const fetchMessages = async () => {
  console.log("Fetching messages...")
  try {
    const response = await api.get("/messages");
    return response.data as Message[]; // Return API response
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Re-throws the error to allow handling it in the calling component
  }
};
