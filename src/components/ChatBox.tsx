import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { fetchMessages, sendMessage } from "../services/messagingService";
import { useAuth0 } from "@auth0/auth0-react";
import Message from "../interfaces/message";

interface ChildProps {
  message: Message;
  isFirstMessage: boolean;
  isOwnMessage: boolean;
}

export function MessageContainer({
  message,
  isFirstMessage,
  isOwnMessage,
}: ChildProps) {
  return (
    <div
      key={message.id}
      className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}
    >
      {/* Show username only if it's a different user and not your own message */}
      {isFirstMessage && !isOwnMessage && (
        <div className="text-sm font-semibold text-blue-500 mt-2 mb-0.5">
          {message.user.username}
        </div>
      )}

      <div
        className={`
          max-w-[70%] p-1 rounded-b-lg
          ${
            isOwnMessage
              ? "bg-blue-500 text-white rounded-l-lg"
              : "bg-gray-200 text-black rounded-r-lg"
          }
          `}
      >
        {message.content}
      </div>
    </div>
  );
}

export default function ChatBox() {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();
  const [messages, setMessages] = useState<Message[]>([]); // Empty intial state of type Message[]
  const [newMessageContent, setNewMessageContent] = useState<string>("");

  const getIdToken = async () => {
    const claims = await getIdTokenClaims();
    if (claims) {
      return claims.__raw;
    } else {
      return "Error";
    }
  };

  const loadMessages = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const data = await fetchMessages(accessToken);
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
        const accessToken = await getAccessTokenSilently();
        const idToken = await getIdToken();
        await sendMessage(newMessageContent, accessToken, idToken);
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
      {!isLoading && isAuthenticated && user && (
        <div className="chatbox-container">
          <div className="chatbox-messages">
            {messages.map((message, index) => {
              const prevMessage = index > 0 ? messages[index - 1] : null;
              const isFirstMessage = message.user.id !== prevMessage?.user.id;
              const isOwnMessage = message.user.id === user!.sub;

              return (
                <MessageContainer
                  message={message}
                  isFirstMessage={isFirstMessage}
                  isOwnMessage={isOwnMessage}
                />
              );
            })}
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
      )}
    </>
  );
}
