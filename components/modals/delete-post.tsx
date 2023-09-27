import useApi from "@/hooks/useApi";
import { fetcher } from "@/lib/fetcher";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { queryClient } from "../providers";
import { IPost } from "@/types/interfaces";

const DeletePost = (props: IPost) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const api = useApi();
  const post = api.mutation({
    mutationKey: ["posts"],
    mutationFn: (id: string) =>
      fetcher({ method: "DELETE", url: `/post/${id}` }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const deletePost = () => {
    post.mutate(props.id);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        <ModalHeader>Are you sure you want to delete this post?</ModalHeader>
        <ModalBody className=" grid grid-cols-2">
          <Button className=" bg-red-500 text-white font-bold">No</Button>
          <Button
            onPress={() => deletePost()}
            className=" bg-green-500 text-white font-bold"
          >
            Yes
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeletePost;
