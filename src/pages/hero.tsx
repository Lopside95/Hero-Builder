import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hero, heroSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const HeroPage = () => {
  const form = useForm<Hero>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      name: "",
      damage: "",
      speed: "",
      img: "",
      bootsImg: "",
      weaponImg: "",
    },
  });

  const { data: heroes, isLoading, isError } = trpc.getAllHeroes.useQuery();

  //all the routers go through 'api'

  const heroesArray = heroes;

  console.log("heroesArray", heroesArray);
  const newHero = trpc.createNewHero.useMutation({
    onSuccess: () => {
      console.log(JSON.parse(JSON.stringify(newHero)));
    },
  });

  const onSubmit: SubmitHandler<Hero> = (data: Hero) => {
    console.log(data);

    newHero.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-black w-full min-h-screen">
            <p className="text-white">
              {heroesArray ? heroesArray[0].name : "no hero"}
            </p>
            <Input {...form.register("name")} placeholder="name" />
            <Input {...form.register("damage")} placeholder="dmg" />
            <Input {...form.register("speed")} placeholder="speed" />
            <Input {...form.register("img")} />
            <Input {...form.register("bootsImg")} placeholder="bootsIMg" />
            <Input {...form.register("weaponImg")} placeholder="wpnImg" />
            <Button>Submit</Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default HeroPage;

// export async function getStaticProps() {
//     try {
//       const client = await clientPromise;
//       const db = client.db("hero_fighter");

//       const boots = await db
//         .collection("boots")
//         .find({})
//         .sort({ id: 1 })
//         .toArray();

//       const weapons = await db
//         .collection("weapons")
//         .find({})
//         .sort({ id: 1 })
//         .toArray();

//       const heroPics = await db
//         .collection("heroPics")
//         .find({})
//         .sort({ id: 1 })
//         .toArray();

//       return {
//         props: {
//           boots: JSON.parse(JSON.stringify(boots)),
//           weapons: JSON.parse(JSON.stringify(weapons)),
//           heroPics: JSON.parse(JSON.stringify(heroPics)),
//         },
//       };
//     } catch (e) {
//       console.error(e);
//     }
//   }
