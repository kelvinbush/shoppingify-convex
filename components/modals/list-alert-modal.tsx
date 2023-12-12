"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/ui/icons";

interface ListAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const ListAlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: ListAlertModalProps) => {
  return (
    <Modal
      title="Are you sure that you want to cancel this list? 🤔"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading ? (
            <div className={"flex items-center justify-center"}>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Cancelling...
            </div>
          ) : (
            "Yes"
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default ListAlertModal;
