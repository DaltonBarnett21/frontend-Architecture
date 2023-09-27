import React from "react";
import UserSkeleton from "./user-skeleton";
import { Skeleton } from "@nextui-org/react";

const PostSkeleton = () => {
  return (
    <div className="m-4 bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-start">
        <UserSkeleton />
      </div>
      <div className="mt-4">
        <div className=" space-y-2">
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
        </div>
      </div>
      <div className="mt-8 flex items-center space-x-4"></div>
    </div>
  );
};

export default PostSkeleton;
