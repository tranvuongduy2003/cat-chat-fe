export type User = {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  status: EUserStatus;
  lastLoginAt: Date;
  settings: UserSettings;
  createdDate: Date;
  lastModifiedDate: Date;
};

type UserSettings = {
  privacyMode: boolean;
  notificationsEnabled: boolean;
  darkMode: boolean;
  language: string;
};

enum EUserStatus {
  OFFLINE,
  ONLINE,
}
