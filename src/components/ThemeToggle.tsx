import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => storage.getTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    storage.setTheme(theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};
