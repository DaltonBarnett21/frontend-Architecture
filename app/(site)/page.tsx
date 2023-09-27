"use client";
import CreatePost from "@/components/forms/create-post";
import PostSkeleton from "@/components/loading-skeletons/post-skeleton";
import Post from "@/components/ui/post";

import useApi from "@/hooks/useApi";
import { fetcher } from "@/lib/fetcher";
import useUserStore from "@/stores/useUserStore";
import { IPost, IUser } from "@/types/interfaces";
import { CircularProgress } from "@nextui-org/react";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const api = useApi();
  const router = useRouter();
  const removeToken = useUserStore((state) => state.removeToken);
  const updateUser = useUserStore((state) => state.updateUser);

  const user = api.query<IUser, AxiosError>({
    queryKey: ["user"],
    queryFn: () => fetcher({ method: "GET", url: "/user/current" }),
    onSuccess: (res: IUser) => {
      updateUser({ user: res });
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        removeToken();
        router.push("/login");
      }
    },
  });

  const posts = api.query<IPost[], AxiosError>({
    queryKey: ["posts"],
    queryFn: async () => await fetcher({ method: "GET", url: "/post" }),
  });

  return (
    <main className="p-6">
      <CreatePost />
      {user.isLoading ||
        (posts.isLoading &&
          Array(5)
            .fill(5)
            .map((_, i) => <PostSkeleton />))}

      {posts.data
        ?.sort(
          (a: IPost, b: IPost) =>
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        )
        .map((post: IPost) => {
          return <Post {...post} />;
        })}
    </main>
  );
}
