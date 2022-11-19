"use client";
import useSWR from "swr";
import fetcher from "../utils/fetchMsg";
import { Message } from "../typings";
import MsgComponent from "./MsgComponent";
import { useEffect } from "react";
import { clientPusher } from "../pusher";

interface IMessageListProps {
  initialMessages: Message[];
}

function MessageList({ initialMessages }: IMessageListProps) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((msg) => msg.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [...messages!, data],
          rollbackOnError: true,
        });
      }
    });
    //  scroll to last message
    const msgList = document.getElementById("msg-list");
    msgList?.lastElementChild?.scrollIntoView();

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);
  // @ts-ignore
  return (
    <div
      id="msg-list"
      className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto"
    >
      {(messages || initialMessages).map((msg) => (
        <MsgComponent message={msg} key={msg.id} />
      ))}
    </div>
  );
}

export default MessageList;
