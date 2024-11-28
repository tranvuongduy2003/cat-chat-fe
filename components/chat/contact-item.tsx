import { Contact } from "@/models/contact.model";
import { Check, CheckCheck } from "lucide-react";
import React from "react";
import { OnlineDot } from "./online-dot";

export interface IContactItemProps {
  contact: Contact;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export function ContactItem({ contact, isActive, onClick }: IContactItemProps) {
  return (
    <div
      key={contact.id}
      className={`p-4 hover:bg-gray-100 cursor-pointer flex items-center ${
        isActive ? "bg-gray-200" : ""
      } transition-colors duration-200`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white relative">
        <OnlineDot className="absolute bottom-0.5 right-0.5" />
        {contact.name.charAt(0)}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{contact.name}</span>
          <div className="flex items-center space-x-2">
            {contact.unreadCount && contact.unreadCount > 0 ? (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {contact.unreadCount}
              </span>
            ) : (
              <></>
            )}
            {contact.unreadCount && contact.unreadCount > 0 ? (
              <Check className="h-4 w-4 text-gray-400" />
            ) : (
              <CheckCheck className="h-4 w-4 text-green-500" />
            )}
          </div>
        </div>
        <p
          className={`text-sm truncate ${
            contact.unreadCount && contact.unreadCount > 0
              ? "font-bold text-black"
              : "text-gray-500"
          }`}
        >
          {contact.lastMessage}
        </p>
      </div>
    </div>
  );
}
