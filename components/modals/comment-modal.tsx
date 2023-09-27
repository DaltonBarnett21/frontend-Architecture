import { IUser } from "@/types/interfaces";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { CommentBar } from "../ui/comment-bar";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
  user: IUser;
  id: string;
}

const CommentModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Comments</ModalHeader>
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter className=" justify-between">
              <CommentBar user={props.user} id={props.id} />
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
