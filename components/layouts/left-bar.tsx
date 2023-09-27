import React from "react";
import { Avatar } from "@nextui-org/react";
import useUserStore from "@/stores/useUserStore";

import { Button } from "@nextui-org/react";

import Image from "next/image";
import coverImg from "../../public/post.jpg";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const LeftBar = ({ ...props }) => {
  const user = useUserStore((state) => state.user);

  return (
    <div {...props}>
      <div className="p-6 bg-gray-100">
        <div className="p-8 relative bg-white shadow-xl rounded-3xl">
          <Image
            alt="coverimage"
            src={coverImg}
            width={500}
            height={400}
            className=" rounded-3xl"
          />
          <Avatar
            as="button"
            className="transition-transform absolute top-64 left-48 border-2 border-white"
            name={user.name}
            size="lg"
            src={user.profileImage ? user.profileImage : ""}
          />
          <p className="flex justify-center mt-6 text-lg font-semibold">
            {user.name}
          </p>
          <p className="flex justify-center  text-gray-400 font-semibold">
            {user.username}
          </p>
          <div className=" grid grid-cols-3 mt-6">
            <div className="text-center">
              <p className=" font-semibold text-2xl">21</p>
              <p>Posts</p>
            </div>
            <div className="text-center">
              <p className=" font-semibold text-2xl">0</p>
              <p>Followers</p>
            </div>
            <div className="text-center">
              <p className=" font-semibold text-2xl">10</p>
              <p>Following</p>
            </div>
          </div>
          <Button className="w-full bg-blue-500 font-bold text-white mt-8">
            My Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
