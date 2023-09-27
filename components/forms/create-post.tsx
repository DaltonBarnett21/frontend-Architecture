import useApi from "@/hooks/useApi";
import { fetcher } from "@/lib/fetcher";
import useUserStore from "@/stores/useUserStore";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
} from "@nextui-org/react";
import {
  BarChartHorizontal,
  Image as ImageIcon,
  SendHorizontal,
  Video,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { queryClient } from "../providers";
import { IPost } from "@/types/interfaces";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/types/form-schemas";
import { z } from "zod";
import { AxiosError } from "axios";
import { Image } from "@nextui-org/react";
import useGenerateFilePreview from "@/hooks/useGenerateFilePreview";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

const CreatePost = () => {
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();
  const api = useApi();
  const {
    setURLs: setImageURLs,
    URLs: imageURLs,
    setPreviews: setImagePreviews,
  } = useGenerateFilePreview();
  const {
    setURLs: setVideoURLs,
    URLs: videoURLs,
    setPreviews: setVideoPreviews,
  } = useGenerateFilePreview();

  const post = api.mutation<any, AxiosError, any>({
    mutationKey: ["posts"],
    mutationFn: (data: any) =>
      fetcher({
        method: "POST",
        url: "/post",
        data: data,
        contentType: "multipart/form-data",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast({
        description: "Your post was a success!",
        className: " bg-success-500 text-white",
      });
    },
  });

  const postForm = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      images: [],
    },
    mode: "all",
  });

  function onPost(data: z.infer<typeof postSchema>) {
    const formData = new FormData();
    for (let image of data.images) {
      formData.append("image", image);
    }

    formData.append("data", JSON.stringify(data.content));
    post.mutate(formData);
    postForm.reset();
    setImageURLs([]);
    setVideoURLs([]);
  }

  function deleteImage(img: string) {
    let deletedUrl = imageURLs.filter((image) => image !== img);
    setImageURLs(deletedUrl);
    postForm.reset({ images: [] });
  }

  function deleteVideo(video: string) {
    let deletedUrl = videoURLs.filter((video) => video !== video);
    setVideoURLs(deletedUrl);
  }

  return (
    <>
      <Form {...postForm}>
        <form
          onSubmit={postForm.handleSubmit(onPost)}
          className=" bg-white m-4 p-4 rounded-3xl mb-16 shadow-xl"
        >
          <div className=" flex items-center space-x-4">
            <Avatar
              as="button"
              className="transition-transform shrink-0"
              name={user.name}
              size="md"
              src={user.profileImage ? user.profileImage : ""}
            />
            <FormField
              control={postForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className=" rounded-3xl w-full"
                      placeholder="share something..."
                      autoComplete="off"
                      validationState={
                        postForm.formState.errors.content ? "invalid" : "valid"
                      }
                      errorMessage={postForm.formState.errors.content?.message}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={postForm.control}
              name="images"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input
                      type="file"
                      id="image"
                      multiple
                      className=" bg-red-500 hidden  "
                      onChange={(event) => {
                        //@ts-ignore
                        setImagePreviews([...event.target.files]);
                        return field.onChange(event.target.files);
                      }}
                      name={field.name}
                      //@ts-ignore
                      value={field.value.filename}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {imageURLs.length > 0 && (
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-5">
              {imageURLs.map((imageSrc, index) => {
                return (
                  <Card shadow="lg" key={index}>
                    <CardBody className="overflow-visible p-0 relative">
                      <Image
                        shadow="sm"
                        width="100%"
                        alt={imageSrc}
                        className="w-full object-cover h-[275px] rounded-xl"
                        src={imageSrc}
                      />
                      <XCircle
                        size={24}
                        className=" text-white absolute top-2 right-2 z-10 cursor-pointer"
                        onClick={() => deleteImage(imageSrc)}
                      />
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="mt-4 ml-14 flex justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="image"
                className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
              >
                <ImageIcon size={20} />
                <p>Image</p>
              </label>

              <div className="flex items-center space-x-1">
                <BarChartHorizontal size={20} />
                <p>Poll</p>
              </div>
            </div>
            <Button
              disabled={!postForm.formState.isDirty}
              type="submit"
              className=" bg-transparent disabled:cursor-not-allowed"
            >
              <SendHorizontal
                className={`${
                  postForm.formState.isDirty
                    ? " text-blue-500 fill-blue-500"
                    : " text-gray-300 fill-gray-300"
                }`}
              />
            </Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default CreatePost;
