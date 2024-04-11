/* eslint-disable @next/next/no-img-element */

import { Card } from "../ui/card";
import { Suspense } from "react";
import { HeroInterface } from "./gallery";

const GalleryCard = ({ details, boots, weapon }: HeroInterface) => {
  return (
    <Card className="flex text-xl flex-col items-center justify-center gap-5 p-16 w-full">
      <article className="flex items-center w-full justify-center gap-20">
        <img src={details.img} className="w-80  rounded-full" alt="" />
        <div className="flex gap-3 flex-col">
          <h3>{details.name}</h3>
          <h3>Damage: {details.damage}</h3>
          <h3>Move speed: {details.speed}</h3>
          <h3>{boots.name}</h3>
          <h3>{weapon.name}</h3>
        </div>
      </article>
      <p>{details.story}</p>
      <article className="flex gap-10">
        <div className=" flex flex-col items-center gap-3 ">
          <img src={boots.img} className="w-80 rounded-full" alt="" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <img src={weapon.img} className="w-80 rounded-full" alt="" />
        </div>
      </article>
    </Card>
  );
};

export default GalleryCard;
