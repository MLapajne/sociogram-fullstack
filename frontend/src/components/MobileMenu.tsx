import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navbarLinks } from "./NavbarLinks";
import cn from "classnames";
import { useLocation, Link } from "react-router-dom";

export function MobileMenu() {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-5 flex px-2 space-y-1 flex-col">
          {navbarLinks.map((item) => (
            <Link
              to={item.href}
              key={item.id}
              className={cn(
                location.pathname === item.href
                  ? "bg-muted"
                  : "hover:bg-muted hover:bg-opacity-75",
                "group flex items-center px-2 py-2 font-medium rounded-md gap-x-1"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
