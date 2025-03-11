import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../LogoutButton";
import LoginButton from "../../LoginButton";

export default function Topbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <header className="topbar">
        <div className="flex items-center">
          <h2 className="text-lg font-medium">Placeholder text</h2>
        </div>
      </header>
    );
  }

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
            <div className="topbarButton" style={{ padding: "0.125rem" }}>
              {user && (
                <img
                  src={user.picture}
                  alt="User profile"
                  style={{ height: "2rem", width: "2rem" }}
                  className="rounded-full"
                />
              )}
            </div>
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
