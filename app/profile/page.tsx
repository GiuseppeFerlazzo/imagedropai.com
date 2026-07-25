import React from "react";
import { auth0 } from "@/lib/auth0";
const Profile = async () => {
  const session = await auth0.getSession();

  return (
    <div>
      <div>
        <p>Logged in as {session?.user.email}</p>

        {/* Display user info (name, email, etc.) */}
        <h1>User Profile</h1>
        <pre>{JSON.stringify(session?.user, null, 2)}</pre>

        {/* Ends the session and redirects to Auth0 to log out */}
        <a href="/auth/logout">Logout</a>
      </div>
    </div>
  );
};

export default Profile;
