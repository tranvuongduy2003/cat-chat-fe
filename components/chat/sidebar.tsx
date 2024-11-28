"use client";

import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores";
import { LogOut, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ContactList } from "./contact-list";

export function Sidebar() {
  const router = useRouter();

  const { contacts, setActiveContact } = useChatStore((state) => state);

  useEffect(() => {
    setActiveContact(contacts[0]);
  }, [contacts, setActiveContact]);

  const handleLogout = async () => {
    router.push("/auth");
  };

  return (
    <div className="w-80 bg-white border-r flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chats</h2>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/profile")}
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Contact List */}
      <ContactList contacts={contacts} />

      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
}
