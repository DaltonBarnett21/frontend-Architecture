import { Skeleton } from "@nextui-org/react";
import React from "react";

const UserSkeleton = () => {
  return (
    <div className="max-w-[300px] flex w-full gap-3">
      <div>
        <Skeleton className="flex rounded-full w-10 h-10" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-[40%] rounded-lg" />
        <Skeleton className="h-3 w-[20%] rounded-lg" />
      </div>
    </div>
  );
};

export default UserSkeleton;
