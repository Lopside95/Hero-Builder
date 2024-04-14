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

const ProfileSelect = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="border-none text-md">
          <SelectValue placeholder="Profile" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Profile</SelectLabel>
            <SelectItemNoCheck value="gallery">Your heroes</SelectItemNoCheck>
            <SelectItemNoCheck value="signout">Sign out</SelectItemNoCheck>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProfileSelect;
