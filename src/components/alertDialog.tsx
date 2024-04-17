import { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface AlertInfo {
  title?: string;
  message?: string;
  closeMsg?: string;
  isOpen?: boolean;
  closeClick: Function;
}

const AlertDialog = ({
  title,
  message,
  closeMsg,
  isOpen,
  closeClick,
}: AlertInfo) => {
  return (
    <Dialog defaultOpen={isOpen}>
      {/* <DialogTrigger></DialogTrigger> */}
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              <div onClick={() => closeClick()}>{closeMsg}</div>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AlertDialog;
