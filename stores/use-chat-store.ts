import { Contact } from "@/models/contact.model";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  activeContact: Contact | null;
  contacts: Contact[];
};

type Action = {
  setActiveContact: (updatedActiveContact: Contact | null) => void;
  markContactAsRead: (contactId: string) => void;
};

export const useChatStore = create(
  immer<State & Action>((set) => ({
    activeContact: null,
    contacts: [
      {
        id: "1",
        name: "John Doe",
        lastMessage: "Hey, can we discuss the project timeline?",
        unreadCount: 2,
        isRead: false,
      },
      {
        id: "2",
        name: "Jane Smith",
        lastMessage: "The report is ready for review.",
        unreadCount: 1,
        isRead: false,
      },
      {
        id: "3",
        name: "Alice Johnson",
        lastMessage: "Confirmed for the team meeting at 2 PM.",
        unreadCount: 0,
        isRead: true,
      },
      {
        id: "4",
        name: "Bob Williams",
        lastMessage: "Need your input on the new marketing strategy.",
        unreadCount: 3,
        isRead: false,
      },
      {
        id: "5",
        name: "Emma Brown",
        lastMessage: "Lunch at the new Italian restaurant?",
        unreadCount: 1,
        isRead: false,
      },
      {
        id: "6",
        name: "Michael Chen",
        lastMessage: "Can you help me with the database query?",
        unreadCount: 4,
        isRead: false,
      },
      {
        id: "7",
        name: "Sarah Rodriguez",
        lastMessage: "Great job on the presentation!",
        unreadCount: 0,
        isRead: true,
      },
      {
        id: "8",
        name: "David Kim",
        lastMessage: "Sending over the contract draft.",
        unreadCount: 2,
        isRead: false,
      },
      {
        id: "9",
        name: "Emily Watson",
        lastMessage: "Reminder: Client meeting tomorrow.",
        unreadCount: 1,
        isRead: false,
      },
      {
        id: "10",
        name: "Alex Nguyen",
        lastMessage: "Finished the design mockups.",
        unreadCount: 0,
        isRead: true,
      },
      {
        id: "11",
        name: "Rachel Park",
        lastMessage: "Can we reschedule our call?",
        unreadCount: 3,
        isRead: false,
      },
      {
        id: "12",
        name: "Tom Garcia",
        lastMessage: "Budget proposal looks good.",
        unreadCount: 0,
        isRead: true,
      },
      {
        id: "13",
        name: "Lisa Zhang",
        lastMessage: "Need your approval on the expenses.",
        unreadCount: 2,
        isRead: false,
      },
      {
        id: "14",
        name: "Carlos Martinez",
        lastMessage: "Updated the project timeline.",
        unreadCount: 1,
        isRead: false,
      },
      {
        id: "15",
        name: "Olivia Taylor",
        lastMessage: "Thanks for the quick response!",
        unreadCount: 0,
        isRead: true,
      },
    ],
    setActiveContact: (updatedActiveContact: Contact | null) =>
      set((state) => {
        state.activeContact = updatedActiveContact;
      }),
    markContactAsRead: (contactId: string) =>
      set((state) => {
        const foundContact = state.contacts.find(
          (contact) => contact.id === contactId
        );
        if (
          !foundContact ||
          !foundContact.unreadCount ||
          foundContact.unreadCount === 0
        ) {
          return state;
        }
        const updatedContact: Contact = {
          ...foundContact,
          unreadCount: 0,
        };
        state.contacts = [
          updatedContact,
          ...state.contacts.filter(
            (contact) => contact.id !== updatedContact.id
          ),
        ];
      }),
  }))
);
