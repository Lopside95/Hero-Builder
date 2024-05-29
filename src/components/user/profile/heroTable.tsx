import { trpc } from "@/utils/trpc";
import { Avatar, AvatarImage } from "../../ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

const HeroTable = () => {
  const { data: heroes } = trpc.user.getHeroesByUser.useQuery();

  const heroArr = heroes ? heroes : [];

  return (
    <div className="max-h-[300px] overflow-auto">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-base-bg text-xl">
            <TableHead>Name</TableHead>
            <TableHead>Damage</TableHead>
            <TableHead>Movespeed</TableHead>
            {/* <TableHead>Avatar</TableHead>
            <TableHead>Weapon</TableHead>
            <TableHead>Boots</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody className="text-xl ">
          {/* Orders heroes from latest to oldest */}
          {heroArr
            ?.slice(0)
            .reverse()
            .map((hero) => {
              return (
                <TableRow className="hover:bg-base-bg" key={hero.id}>
                  <TableCell>{hero.details.name}</TableCell>
                  <TableCell className="pl-7">{hero.details.damage}</TableCell>
                  <TableCell className="pl-9">{hero.details.speed}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={hero.details.img} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={hero.weapon.img} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={hero.boots.img} />
                    </Avatar>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default HeroTable;
