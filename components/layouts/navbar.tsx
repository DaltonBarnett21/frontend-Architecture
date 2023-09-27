import React from "react";
import Image from "next/image";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Bell, Mail, Search } from "lucide-react";
import useUserStore from "@/stores/useUserStore";

const Navbar = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className=" p-4 shadow-md">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <Image
            src="/Vector.png"
            alt="logo"
            width={100}
            height={100}
            className=" cursor-pointer"
          />
          <Input
            type="text"
            placeholder="search..."
            labelPlacement="outside"
            startContent={<Search />}
          />
        </div>
        <div className=" space-x-6 flex  items-center">
          <Badge
            className=" cursor-pointer bg-red-500 text-white"
            content={"10"}
            shape="circle"
          >
            <Mail size={24} className=" cursor-pointer" />
          </Badge>
          <Badge
            className=" cursor-pointer bg-red-500 text-white"
            content={"10"}
            shape="circle"
          >
            <Bell size={24} className=" cursor-pointer" />
          </Badge>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                name={user.name}
                size="md"
                src={user.profileImage ? user.profileImage : ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="team_settings">View my profile</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
