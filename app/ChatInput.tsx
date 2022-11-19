"use client";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMsg";
import { unstable_getServerSession } from "next-auth";

interface IProps {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
}
function ChatInput({ session }: IProps) {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMsg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const msgToSend = input;
    setInput("");
    const id = uuid();

    const msg: Message = {
      id,
      message: msgToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
      // email: "test@gmail.com",
    };

    const uploadMsgToUpstash = async () => {
      const data = await fetch("/api/sendMsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
      });
      const { message } = await data.json();
      return [...messages!, message];
    };

    await mutate(uploadMsgToUpstash, {
      optimisticData: [...messages!, msg],
      rollbackOnError: true,
    });
  };
  console.log(session);
  return (
    <form
      onSubmit={(e) => addMsg(e)}
      className="fixed bottom-0 left-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100 bg-white"
    >
      <input
        disabled={!session}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2"
      />
      <button
        disabled={!input}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
