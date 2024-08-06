import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LanguageDataContext } from "@/context/LanguageDataContext";

export function UserNav() {
  const { languageData, setLanguageData } = useContext(LanguageDataContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center pr-4 py-2 font-semibold rounded-md gap-x-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-globe"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <h1 className="hidden md:block font-bold text-primary">Language</h1>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-10" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              className="font-semibold"
              onClick={() => setLanguageData("sl")}
              to="#"
            >
              Slovenski
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="font-semibold"
              onClick={() => setLanguageData("hr")}
              to="#"
            >
              Hrvatski
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="font-semibold"
              onClick={() => setLanguageData("en")}
              to="#"
            >
              English
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="font-semibold"
              onClick={() => setLanguageData("de")}
              to="#"
            >
              Deutsch
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
