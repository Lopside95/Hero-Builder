/* eslint-disable @next/next/no-img-element */

import { Card } from "../ui/card";
import { Suspense } from "react";
import { HeroInterface } from "./gallery";
import Image from "next/image";

const GalleryCard = ({ details, boots, weapon }: HeroInterface) => {
  return (
    <Card className="flex text-xl flex-col items-center justify-center gap-10 p-16 w-full">
      {/* <section className="flex-flex-col align-middle "> */}
      <h1 className="self-center text-3xl">{details.name}</h1>
      <p>{details.story}</p>

      <article className="flex items-center w-full justify-center gap-20">
        {/* <img src={details.img} className="w-80  rounded-full" alt="" /> */}
        <Image
          src={details.img}
          className="w-80 rounded-full"
          alt=""
          width={300}
          height={300}
        />

        <div className="flex gap-3 flex-col">
          <h3>Damage: {details.damage}</h3>
          <h3>Move speed: {details.speed}</h3>
          <h3>{boots.name}</h3>
          <h3>{weapon.name}</h3>
        </div>
      </article>
      <article className="flex gap-10">
        <div className=" flex flex-col items-center gap-3 ">
          <Image
            src={boots.img}
            className="w-80 rounded-full"
            alt=""
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <Image
            src={weapon.img}
            className="w-80 rounded-full"
            alt=""
            width={300}
            height={300}
          />
        </div>
      </article>
      <div></div>
      {/* </section> */}
    </Card>
  );
};

export default GalleryCard;
