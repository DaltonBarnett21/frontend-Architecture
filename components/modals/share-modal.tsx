import useApi from "@/hooks/useApi";
import { fetcher } from "@/lib/fetcher";
import { IPost } from "@/types/interfaces";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { AxiosError } from "axios";
import { Send } from "lucide-react";
import React from "react";
import User from "../ui/user";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/types/form-schemas";
import { z } from "zod";

interface Props {
  postId: string;
}

const ShareModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const api = useApi();
  const post = api.query<IPost, AxiosError>({
    queryKey: [props.postId],
    queryFn: () => fetcher({ method: "GET", url: `/post/${props.postId}` }),
  });

  const handleShareOpen = () => {
    onOpen();
  };

  const onPost = (data: z.infer<typeof postSchema>) => {
    alert(data);
  };

  const postForm = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
    },
    mode: "all",
  });

  return (
    <>
      <Tooltip content="Share this post" className="">
        <button
          onClick={() => handleShareOpen()}
          className="space-x-4 flex cursor-pointer bg-transparent outline-none"
        >
          <Send size={20} />
        </button>
      </Tooltip>
      <Modal backdrop="blur" size="2xl" isOpen={isOpen} onClose={onClose}>
        <Form {...postForm}>
          <form onSubmit={postForm.handleSubmit(onPost)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Share this post
                  </ModalHeader>
                  <ModalBody>
                    <FormField
                      control={postForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              className=" rounded-3xl w-full "
                              placeholder="Say something about this post (optional)"
                              autoComplete="off"
                              validationState={
                                postForm.formState.errors.content
                                  ? "invalid"
                                  : "valid"
                              }
                              errorMessage={
                                postForm.formState.errors.content?.message
                              }
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className=" border border-gray-200 rounded-xl p-4 ">
                      <User
                        img={
                          post.data?.user.profileImage
                            ? post.data?.user.profileImage
                            : ""
                        }
                        createdAt={post.data?.createdAt.toString()!}
                        name={post.data?.user.name!}
                      />
                      <p className="py-2"> {post.data?.content}</p>
                      <div
                        className={` relative grid 
                    ${post.data?.images.length! >= 2 && " grid-cols-2"}
          
                     gap-2 mt-4 `}
                      >
                        {post.data!.images.map((img) => {
                          return <Image src={img.imageId} alt={img.imageId} />;
                        })}
                      </div>
                      <Image />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      Share
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default ShareModal;
