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
    <div className="max-h-[350px] overflow-auto">
      {/* <div>
        <h1 className="text-2xl">
          {heroArr.length > 1
            ? heroArr.length + " heroes"
            : heroArr.length === 1
            ? "1 hero"
            : "No heroes"}
        </h1>
      </div> */}
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-base-bg text-xl">
            <TableHead>Name</TableHead>
            <TableHead>Damage</TableHead>
            <TableHead>Movespeed</TableHead>
            <TableHead>Weapon</TableHead>
            <TableHead>Boots</TableHead>
            <TableHead>Avatar</TableHead>
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
                      <AvatarImage src={hero.weapon.img} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={hero.boots.img} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={hero.details.img} />
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
