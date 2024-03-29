import { Hero, heroSchema } from "@/types/hero";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const HeroPage = () => {
  const form = useForm<Hero>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      name: "",
      damage: 0,
      speed: 0,
      img: "",
      bootsImg: "",
      weaponImg: "",
    },
  });
};

export default HeroPage;
