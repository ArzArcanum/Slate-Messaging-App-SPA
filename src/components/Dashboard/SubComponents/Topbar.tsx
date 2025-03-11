import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../LogoutButton";
import LoginButton from "../../LoginButton";

export default function Topbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <header className="topbar">
      {/* PlaceHolder title? */}
      <div className="flex items-center">
        <h2 className="text-lg font-medium">Placeholder text</h2>
      </div>

      {/* Topbar buttons */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <LogoutButton />
            <div className="topbarButton">U</div>
          </>
        ) : (
          <>
            <LoginButton />
          </>
        )}
      </div>
    </header>
  );
}
