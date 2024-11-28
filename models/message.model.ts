export type Message = {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
};
