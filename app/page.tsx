import { MainChat } from "@/components/chat/main-chat";
import { Sidebar } from "@/components/chat/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <MainChat />
    </div>
  );
}
