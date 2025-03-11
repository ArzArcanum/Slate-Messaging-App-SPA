import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    void logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className="topbarButton" onClick={handleLogout}>
      <LogOut style={{ height: "1.25rem", width: "1.25rem" }} />
    </button>
  );
}
