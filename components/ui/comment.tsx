import React from "react";
import User from "./user";
import { IComment } from "@/types/interfaces";
import { Flag, MoreVertical, Trash2 } from "lucide-react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import useUserStore from "@/stores/useUserStore";
import useApi from "@/hooks/useApi";
import { fetcher } from "@/lib/fetcher";
import { queryClient } from "../providers";

const Comment = (props: IComment) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [popoverIsOpen, setPopoverIsOpen] = React.useState(false);
  const user = useUserStore((state) => state.user);
  const api = useApi();
  const comment = api.mutation({
    mutationFn: (id: string) =>
      fetcher({ method: "DELETE", url: `/comment/${id}` }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const deleteComment = () => {
    comment.mutate(props.id);
    onClose();
    setPopoverIsOpen(false);
  };

  return (
    <div className="flex justify-between">
      <div>
        <User
          img={props.user.profileImage ? props.user.profileImage : ""}
          createdAt={props.createdAt}
          name={props.user.name}
        />
        <p className=" ml-12 space-y-2 mb-2">{props.content}</p>
      </div>
      <Popover
        isOpen={popoverIsOpen}
        onOpenChange={(open) => setPopoverIsOpen(open)}
        showArrow
        placement="right"
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
                <p>Delete Comment</p>
              </div>
            )}

            <div className="flex items-center space-x-2 text-red-500 font-bold cursor-pointer hover:bg-gray-200 p-2 rounded-3xl transition-all">
              <Flag size={20} />
              <p>Report</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
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
            <Button onPress={() => deleteComment()} color="primary">
              Yes
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Comment;
