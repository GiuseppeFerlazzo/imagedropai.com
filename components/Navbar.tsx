import { CiLogin, CiLogout } from "react-icons/ci";

import { auth0 } from "@/lib/auth0";
const Navbar = async () => {
  const session = await auth0.getSession();
  return (
    <div>
      <div>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl">
              Image Drop AI
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <details className="mr-10">
                  <summary>
                    {session ? (
                      <div>
                        <CiLogout />
                      </div>
                    ) : (
                      <div>
                        <CiLogin />
                      </div>
                    )}
                  </summary>
                  <ul className="bg-base-100 rounded-t-none">
                    <li>
                      <a href="/profile">Profile</a>
                    </li>
                    <li>
                      {session ? (
                        <a href="/auth/logout">Logout</a>
                      ) : (
                        <a href="/auth/login">Login</a>
                      )}
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
