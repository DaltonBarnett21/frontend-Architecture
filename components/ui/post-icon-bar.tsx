import { Heart, MessageCircle, MoreVertical, Send, Share } from "lucide-react";
import React from "react";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import CommentModal from "../modals/comment-modal";
import { IComment, ILike, IUser } from "@/types/interfaces";
import User from "./user";
import Comment from "./comment";
import { comment } from "postcss";
import ShareModal from "../modals/share-modal";

interface Props {
  mutate: any;
  userHasLiked: any;
  id: string;
  _count: {
    likes: number;
    comments: number;
    shares: number;
  };
  comments: IComment[];
  user: IUser;
}

export function PostIconBar(props: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center space-x-4">
        <div
          onClick={() =>
            props.mutate({
              postId: props.id,
            })
          }
          className={`flex items-center space-x-1 cursor-pointer `}
        >
          <Heart
            className={`${props.userHasLiked && " fill-red-500 text-red-500"}`}
            size={20}
          />
          <p>{props._count.likes}</p>
        </div>
        <Tooltip content="Click to view comments" className="">
          <button
            onClick={onOpen}
            className=" bg-transparent flex items-center space-x-1 cursor-pointer hover:text-blue-500 outline-none"
          >
            <MessageCircle size={20} />
            <p>{props._count.comments}</p>
          </button>
        </Tooltip>
        <div className="flex items-center space-x-1 ">
          <Share size={20} />
          <p>{props._count.shares}</p>
        </div>
      </div>
      <ShareModal postId={props.id} />
      <CommentModal
        user={props.user}
        id={props.id}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {props.comments.length === 0 && (
          <p className="text-center">No comments yet!</p>
        )}
        {props.comments.map((comment) => {
          return <Comment {...comment} />;
        })}
      </CommentModal>
    </div>
  );
}
