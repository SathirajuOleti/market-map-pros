import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { storage } from "./lib/storage";

// Initialize theme before paint
const theme = storage.getTheme();
document.documentElement.classList.toggle("dark", theme === "dark");

createRoot(document.getElementById("root")!).render(<App />);
