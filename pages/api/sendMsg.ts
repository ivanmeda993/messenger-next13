// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";
import client from "../../redis";
import { serverPusher } from "../../pusher";

type Data = {
  message: Message;
};
type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  console.log("req.body", req.body);
  if (req.method !== "POST") {
    res.status(405).json({ body: "Method Not Allowed" });
    return;
  }
  const { message } = req.body;

  const newMessage = {
    ...message,
    created_at: Date.now(),
  };

  await client.hset("messages", message.id, JSON.stringify(newMessage));
  serverPusher.trigger("messages", "new-message", newMessage);
  console.log("newMessage", newMessage);
  res.status(200).json({ message: newMessage });
}
