// src/config.js

// Vite requires the VITE_ prefix to expose variables to your code
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const API_BASE_URL = backendUrl || "URL_NOT_FOUND";

export const logEnv = () => {
  if (API_BASE_URL === "URL_NOT_FOUND") {
    console.error("❌ ERROR: VITE_BACKEND_URL is not defined in your .env file!");
    alert("Environment Variable Missing! Check your .env file naming.");
  } else {
    console.log("%c[Agri-Safe AI] System Initialized", "color: green; font-weight: bold;");
    console.log(`%c[Backend] Connected to: ${API_BASE_URL}`, "color: blue;");
  }
};