import { commentSchema } from "@/types/form-schemas";
import { IPost } from "@/types/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Input } from "@nextui-org/react";
import { SendHorizontal } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, Form } from "./form";
import { z } from "zod";
import useApi from "@/hooks/useApi";
import { fetcher } from "@/lib/fetcher";
import { queryClient } from "../providers";

export function CommentBar(props: Pick<IPost, "user" | "id">) {
  const api = useApi();
  const comment = api.mutation({
    mutationFn: (content: string) =>
      fetcher({ method: "POST", url: `/comment/${props.id}`, data: content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const commentForm = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onComment = (data: z.infer<typeof commentSchema>) => {
    comment.mutate({ content: data.content });
    commentForm.reset({ content: "" });
  };

  return (
    <Form {...commentForm}>
      <form
        onSubmit={commentForm.handleSubmit(onComment)}
        className=" flex items-center space-x-4 relative w-full"
      >
        <Avatar
          as="button"
          className="transition-transform shrink-0"
          name={"jane doe"}
          size="sm"
          src={props.user.profileImage ? props.user.profileImage : ""}
        />
        <FormField
          control={commentForm.control}
          name="content"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormControl>
                <Input
                  size="md"
                  type="text"
                  className=" rounded-2xl bg-gray-100"
                  placeholder="Write your comment.."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={!commentForm.formState.isDirty}
          type="submit"
          className=" bg-transparent absolute right-0"
        >
          <SendHorizontal
            className={` ${
              !commentForm.formState.isDirty
                ? " text-gray-400 fill-gray-400 hover:cursor-not-allowed"
                : "text-blue-500 fill-blue-500 cursor-pointer"
            }   `}
          />
        </Button>
      </form>
    </Form>
  );
}
