import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { fetchMessages, sendMessage } from "../services/messagingService";
import { useAuth0 } from "@auth0/auth0-react";
import Message from "../interfaces/message";

function MessageContainer({
  message,
  isFirstMessage,
  isOwnMessage,
}: {
  message: Message;
  isFirstMessage: boolean;
  isOwnMessage: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}
    >
      {/* Show username only if it's a different user and not your own message */}
      {isFirstMessage && !isOwnMessage && (
        <div className="chatbox-message-username">{message.user.username}</div>
      )}

      <div
        className={`
          chatbox-message
          ${isOwnMessage ? "chatbox-message-own" : "chatbox-message-other"}
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = useState<string>("");

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
    // If user exists and input field is not blank/whitespace
    if (user && newMessageContent.trim()) {
      try {
        const accessToken = await getAccessTokenSilently();
        const claims = await getIdTokenClaims();
        if (!claims) {
          throw new Error("Failed to get ID token claims");
        }
        const idToken = claims.__raw;
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
              const isFirstMessage =
                !prevMessage || message.user.id !== prevMessage.user.id;
              const isOwnMessage = message.user.id === user!.sub;

              return (
                <MessageContainer
                  key={message.id}
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
