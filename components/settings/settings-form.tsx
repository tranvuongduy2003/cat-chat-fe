"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Globe, Moon, Shield, Sun } from "lucide-react";
import { useState } from "react";

export function SettingsForm() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleSaveSettings = () => {
    // Settings save logic
    console.log("Settings saved", {
      notifications,
      darkMode,
      privacyMode,
      language,
    });
  };
  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Bell className="h-5 w-5 text-gray-600" />
          <Label>Notifications</Label>
        </div>
        <Switch checked={notifications} onCheckedChange={setNotifications} />
      </div>

      {/* Dark Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {darkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <Label>Dark Mode</Label>
        </div>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </div>

      {/* Privacy Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Shield className="h-5 w-5 text-gray-600" />
          <Label>Privacy Mode</Label>
        </div>
        <Switch checked={privacyMode} onCheckedChange={setPrivacyMode} />
      </div>

      {/* Language */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Globe className="h-5 w-5 text-gray-600" />
          <Label>Language</Label>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-1"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <Button onClick={handleSaveSettings} className="w-full mt-4">
        Save Settings
      </Button>
    </div>
  );
}
