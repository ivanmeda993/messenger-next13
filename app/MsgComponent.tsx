import React from "react";
import { Message } from "../typings";
import Image from "next/image";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
interface IMsgProps {
  message: Message;
}
function MsgComponent({ message }: IMsgProps) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit items-center ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={20}
          src={message.profilePic}
          alt={message.username}
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-2 py-1 rounded-lg w-fit text-white ${
              isUser ? " bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p className="text-sm">{message.message}</p>
          </div>
          <Moment
            className={`text-[0.55rem] italic px-2 text-gray-400 ${
              isUser && "text-right"
            }`}
            fromNow
          >
            {message.created_at}
          </Moment>
        </div>
      </div>
    </div>
  );
}

export default MsgComponent;
