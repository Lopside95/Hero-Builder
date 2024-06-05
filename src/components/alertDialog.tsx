import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContentNoX,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface AlertInfo {
  title?: string;
  message?: string;
  closeMsg?: string;
  isOpen?: boolean;
  closeClick: Function;
}
// This is  no longer in use (but could be useful in future).
// Before adding the option to store heroes locally, it pointed out to users that they needed and account to save heroes
// and/or that they weren't logged in
const AlertDialog = ({
  title,
  message,
  closeMsg,
  isOpen,
  closeClick,
}: AlertInfo) => {
  return (
    <Dialog defaultOpen={isOpen}>
      <DialogContentNoX className="flex flex-col items-center border-none w-80 ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-base-txtClr">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              <div onClick={() => closeClick()}>{closeMsg}</div>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContentNoX>
    </Dialog>
  );
};
export default AlertDialog;
