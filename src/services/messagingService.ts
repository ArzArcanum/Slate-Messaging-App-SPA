import axios from "axios";
import MessageDTO from "../interfaces/message";

// Create an axios instance for reuse
const api = axios.create({
  baseURL: "https://localhost:7073",
  headers: {
    "Content-Type": "application/json",
  },
});

// Placeholder implementation until WebSocket integration is complete
export const sendMessage = async (messageDTO: MessageDTO, token: string) => {
  // console.log("Sending message...")
  try {
    await api.post("/messages", messageDTO, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
    // Should I Return the API response?
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Re-throws the error to allow handling it in the calling component
  }
};

export const fetchMessages = async (token: string) => {
  // console.log("Fetching messages...");
  try {
    const response = await api.get("/messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as MessageDTO[]; // Return API response
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Re-throws the error to allow handling it in the calling component
  }
};
