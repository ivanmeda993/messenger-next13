import React from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Message } from "../typings";
import { unstable_getServerSession } from "next-auth";
import { Providers } from "./providers";

async function HomePage() {
  //  server side rendering
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());
  const messages: Message[] = data.messages;
  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <main className="bg-white min-h-screen">
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
}

export default HomePage;
