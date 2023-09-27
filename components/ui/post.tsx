import useUserStore from "@/stores/useUserStore";
import { IComment, IImage, ILike, IPost, IUser } from "@/types/interfaces";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { Flag, MoreVertical, Trash2 } from "lucide-react";
import React, { useRef } from "react";
import moment from "moment";
import { Button } from "@nextui-org/react";
import useApi from "@/hooks/useApi";
import { fetcher } from "@/lib/fetcher";
import { queryClient } from "../providers";
import { Image } from "@nextui-org/react";
import { AxiosError } from "axios";
import { CommentBar } from "./comment-bar";
import { PostIconBar } from "./post-icon-bar";
import { Spacer } from "@nextui-org/react";
import { Toaster } from "@/components/ui/toaster";

const Post = (props: IPost) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [popoverIsOpen, setPopoverIsOpen] = React.useState(false);
  const user = useUserStore((state) => state.user);

  const api = useApi();
  const post = api.mutation({
    mutationFn: (id: string) =>
      fetcher({ method: "DELETE", url: `/post/${id}` }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const like = api.mutation<string, AxiosError, { postId: string }>({
    mutationFn: (postId: string) =>
      fetcher({ method: "POST", url: "/like", data: postId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const timeAgo = moment
    .utc(props.createdAt)
    .local()
    .startOf("seconds")
    .fromNow();

  const deletePost = () => {
    post.mutate(props.id);
    onClose();
    setPopoverIsOpen(false);
  };

  const userHasLiked = props?.likes.find((p: ILike) => p.userId === user.id);

  return (
    <div className="m-4 bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-start">
        <User
          name={props.user.name}
          description={timeAgo}
          avatarProps={{
            src: props.user.profileImage ? props.user.profileImage : "",
          }}
        />

        <Popover
          isOpen={popoverIsOpen}
          onOpenChange={(open) => setPopoverIsOpen(open)}
          showArrow
          placement="bottom"
        >
          <PopoverTrigger className=" cursor-pointer">
            <MoreVertical />
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-1 ">
              {user.id === props.userId && (
                <div
                  onClick={onOpen}
                  className="flex justify-start items-center space-x-2 text-red-500 font-bold cursor-pointer hover:bg-gray-200 p-2 rounded-3xl transition-all"
                >
                  <Trash2 size={20} />
                  <p>Delete Post</p>
                </div>
              )}

              <div className="flex items-center space-x-2 text-red-500 font-bold cursor-pointer hover:bg-gray-200 p-2 rounded-3xl transition-all">
                <Flag size={20} />
                <p>Report</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-4 ">
        <div>{props.content}</div>
        <div
          className={` relative grid 
          ${props.images.length >= 2 && " grid-cols-2"}
          
            gap-2 mt-4 `}
        >
          {props.images.map((img) => {
            return <Image src={img.imageId} alt={img.imageId} />;
          })}
        </div>
        <PostIconBar
          mutate={like.mutate}
          userHasLiked={userHasLiked}
          id={props.id}
          _count={props._count}
          comments={props.comments}
          user={user}
        />
      </div>
      <Spacer y={4} />
      <CommentBar user={user} id={props.id} />
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader>Are you sure you want to delete this post?</ModalHeader>
          <ModalBody className=" grid grid-cols-2">
            <Button onPress={onClose} color="danger" variant="light">
              No
            </Button>
            <Button onPress={() => deletePost()} color="primary">
              Yes
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Post;
