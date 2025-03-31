
export type emailData = {
    sender?: string;
    subject?: string;
    text?: string;
    html?: string;
}
export enum bodyFields {
  sender = "sender",
  subject = "subject",
  text = "text",
  html = "html"
}
