import { signIn, signOut, useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemNoCheck,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/router";

const ProfileSelect = () => {
  const router = useRouter();

  return (
    <div>
      <Select>
        <SelectTrigger className="border-none text-md">
          <SelectValue placeholder="Profile" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Profile</SelectLabel>
            <SelectItemNoCheck
              onClick={() => router.push("/profile")}
              value="gallery"
            >
              Your heroes
            </SelectItemNoCheck>
            {/* <SelectItemNoCheck value="account">Your account</SelectItemNoCheck> */}
            {/* <SelectItemNoCheck onClick={() => signOut()} value="signout">
              Sign out
            </SelectItemNoCheck> */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProfileSelect;
