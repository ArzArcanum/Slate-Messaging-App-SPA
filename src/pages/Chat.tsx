import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { fetchMessages, sendMessage } from "../services/messagingService";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import Message from "../interfaces/message";

export default function Chat() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [messages, setMessages] = useState<Message[]>([]); // Empty intial state of type Message[]
  const [newMessageContent, setNewMessageContent] = useState<string>("");

  const loadMessages = async () => {
    try {
      const token = await getAccessTokenSilently();
      const data = await fetchMessages(token);
      if (data !== null) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  useEffect(() => {
    void loadMessages();
  }, []);

  // Placeholder implementation until WebSocket integration is complete
  const handleSendMessage = async () => {
    // console.log("handlingSendMessage...");
    // If user exists and input field is not blank/whitespace
    if (user && newMessageContent.trim()) {
      // console.log(user);
      try {
        const token = await getAccessTokenSilently();
        await sendMessage(newMessageContent, token);
        void loadMessages();
        setNewMessageContent(""); // Clear the input after sending
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  // To-do: Implement sticky scroll feature

  return (
    <>
      {!isLoading && isAuthenticated && user ? (
        <div className="chatbox-container">
          <div className="chatbox-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.user.id === user.sub ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[70%] p-3 rounded-b-lg
                    ${
                      message.user.id === user.sub
                        ? "bg-blue-500 text-white rounded-l-lg"
                        : "bg-gray-200 text-black rounded-r-lg"
                    }
                  `}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="chatbox-input">
            <input
              type="text"
              value={newMessageContent}
              onChange={(e) => setNewMessageContent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void handleSendMessage()}
              placeholder="Type a message..."
              className="flex-grow p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => void handleSendMessage()}
              className="bg-[#506D7C] p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow">
          <LoginButton />
        </div>
      )}
    </>
  );
}
