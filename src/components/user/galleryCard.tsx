import { Card } from "../ui/card";
import { HeroInterface } from "./gallery";
import Image from "next/image";

const GalleryCard = ({ details, boots, weapon }: HeroInterface) => {
  return (
    <Card className="flex text-xl flex-col items-center justify-center gap-10 p-16 w-full">
      <section className="flex -ml-10 items-center w-full gap-10 justify-center">
        <article className="flex flex-col w-2/3 gap-10 ">
          <h1 className=" text-center text-5xl">{details.name}</h1>
          <p className="w-full">{details.story}</p>
        </article>
        <ul className="flex gap-3 flex-col">
          <li>Damage: {details.damage}</li>
          <li>Move speed: {details.speed}</li>
          <li>{boots.name}</li>
          <li>{weapon.name}</li>
        </ul>
      </section>
      <article className="flex gap-10">
        <Image
          src={details.img}
          className="w-80 -ml-5 rounded-md"
          alt=""
          width={300}
          height={300}
        />
        <Image
          src={boots.img}
          className="w-80 rounded-md"
          alt=""
          width={300}
          height={300}
        />
        <Image
          src={weapon.img}
          className="w-80 rounded-md"
          alt=""
          width={300}
          height={300}
        />
      </article>
    </Card>
  );
};

export default GalleryCard;
