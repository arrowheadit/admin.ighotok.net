export type notifications = {
  id: number;
  name: string;
  channel: string;
  subject: string;
  body: string;
  status: "active" | "inactive";
};
export type createNotifications = {
  name: string;
  channel: string;
  subject: string;
  body: string;
  status: "active" | "inactive";
};

export type updateNotifications = {
  id: number;
  name: string;
  channel: string;
  subject: string;
  body: string;
  status: "active" | "inactive";
};