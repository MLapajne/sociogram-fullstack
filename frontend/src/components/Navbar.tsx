import React from "react";
import { Link } from "react-router-dom";
import { UserNav } from "./UserNav";
import { HelpDialog } from "./HelpDialog";

export default function Navbar() {
  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="flex items-center md:col-span-3 space-x-2">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-14" />
        </Link>
        <Link to="/">
          <h1 className="hidden md:block text-2xl font-bold text-primary">
            Sociogram 5.5
          </h1>
        </Link>
      </div>

      <div className="flex  items-center gap-x-2 ms-auto md:col-span-9">
        <UserNav />
        <HelpDialog />
      </div>
    </nav>
  );
}
