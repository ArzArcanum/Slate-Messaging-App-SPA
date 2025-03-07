import { useAuth0 } from "@auth0/auth0-react";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    void loginWithRedirect();
  };

  return (
    <button className="topbarButton" onClick={handleLogin}>
      <LogIn size={20} />
    </button>
  );
}
