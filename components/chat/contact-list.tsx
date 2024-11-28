"use client";

import { Contact } from "@/models/contact.model";
import { useChatStore } from "@/stores";
import { ContactItem } from "./contact-item";

export interface IContactListProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: IContactListProps) {
  const { activeContact, setActiveContact, markContactAsRead } = useChatStore(
    (state) => state
  );

  const handleContactClick = (contact: Contact) => {
    if (contact) {
      setActiveContact(contact);
      markContactAsRead(contact.id);
    } else {
      setActiveContact(null);
    }
  };

  return (
    <div className="flex-grow overflow-y-auto">
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isActive={activeContact?.id === contact.id}
            onClick={() => handleContactClick(contact)}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
