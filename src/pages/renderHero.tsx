import { trpc } from "@/utils/trpc";
import { prisma } from "./api/db";
import { TRPCError } from "@trpc/server";
import { useEffect, useState } from "react";
import { Hero } from "@/types/hero";

export default function RenderHero() {
  const [theHeroes, setTheHeroes] = useState<Hero[]>();
  //   const allHeroes = trpc.getAllHeroes.useQuery()

  const { data: hero } = trpc.getAllHeroes.useQuery();

  useEffect(() => {
    setTheHeroes(hero);
  }, [hero]);

  const printHeroes = async () => {
    // const final = await trpc.getAllHeroes.useQuery({name: "James"})
    try {
      const allHeroes = await prisma.hero.findMany();
      setTheHeroes(allHeroes);
      return allHeroes;
    } catch (error) {
      if (error instanceof TRPCError) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="bg-black w-full min-h-screen">
        {/* <img
          src={hero?.length > 1 ? hero[0].bootsImg : ""}
          className="w-10 h-10"
          alt=""
        /> */}
      </div>
      <button onClick={() => printHeroes()}>get</button>
      <button onClick={() => console.log(hero)}>Log</button>
      {/* <button onClick={() => console.log('first', first)}>Log</button> */}
    </div>
  );
}
