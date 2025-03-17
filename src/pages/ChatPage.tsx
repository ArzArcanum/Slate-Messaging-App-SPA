import { useAuth0 } from "@auth0/auth0-react";
import ChatBox from "../components/ChatBox";
import { Navigate } from "react-router-dom";

export default function ChatPage() {
  const { isLoading, isAuthenticated } = useAuth0();
  return (
    <>
      {!isLoading && isAuthenticated ? <ChatBox /> : <Navigate to="/login" />}
    </>
  );
}
