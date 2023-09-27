import { Avatar } from "@nextui-org/react";
import moment from "moment";
import React from "react";

interface Props {
  img: string;
  createdAt: string;
  name: string;
}

const User = (props: Props) => {
  const timeAgo = moment
    .utc(props.createdAt)
    .local()
    .startOf("seconds")
    .fromNow();

  return (
    <div className="  flex-col items-center ">
      <div className="flex items-center space-x-2">
        <Avatar size="md" src={props.img} />
        <div>
          <p className=" text-sm">{props.name}</p>
          <p className=" text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
