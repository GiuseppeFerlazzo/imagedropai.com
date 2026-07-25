import React from "react";
import { auth0 } from "@/lib/auth0";
const Navbar = async () => {
  const session = await auth0.getSession();
  return (
    <div>
      <div>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Link</a>
              </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <a>Link 1</a>
                    </li>
                    <li>
                      {session ? (
                        <a href="/api/auth/logout">Logout</a>
                      ) : (
                        <a href="/api/auth/login">Login</a>
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
