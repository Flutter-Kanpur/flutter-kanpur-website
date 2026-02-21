"use client";
import { useEffect, useState } from "react";
import { Home, Users, Search, User } from "lucide-react";
import "./styles.css";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const [activePath, setActivePath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => {
      setActivePath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const handleClick = (path) => {
    window.history.pushState({}, "", path);
    setActivePath(path);
  };

  const isActive = (path) => {
    if (path === "/community") {
      return (
        activePath.startsWith("/community") ||
        activePath.startsWith("/ask-question") ||
        activePath.startsWith("/discussions") ||
        activePath.startsWith("/contribute")
      );
    }
    return activePath === path;
  };

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.path)}
              className={`nav-item ${active ? "active" : ""}`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
              {active && <div className="active-line" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
