import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/context/AuthContext";
import UserMenu from "./UserMenu";

const navigation = [
  { title: "Home", to: "/" },
  { title: "Menu", to: "/menu" },
  { title: "Login", to: "/login" },
];

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="border-b ">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <NavLink to="/" className="text-lg font-semibold">
          Twirll Cafe
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden md:flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-600">
                Logged In
              </span>
            </div>
          )}

          {user && <UserMenu />}

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md p-2 md:hidden">
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {navigation.map((item) => (
                <DropdownMenuItem key={item.to}>
                  <NavLink to={item.to}>{item.title}</NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );  
}