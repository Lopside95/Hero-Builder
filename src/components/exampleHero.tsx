import { ExampleHeroSchema, exampleHeroSchema } from "@/types/hero";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Navbar from "./Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { trpc } from "@/utils/trpc";

const CreateExample = () => {
  const form = useForm<ExampleHeroSchema>({
    resolver: zodResolver(exampleHeroSchema),
    defaultValues: {
      name: "",
      damage: "",
      speed: "",
      bootsImg: "",
      weaponImg: "",
      img: "",
    },
  });

  const utils = trpc.useUtils();

  const createNewExample = trpc.hero.newExampleHero.useMutation({
    onSuccess: async () => {
      alert("created");
      await utils.hero.invalidate();
    },
  });

  const onSubmit: SubmitHandler<ExampleHeroSchema> = async (
    data: ExampleHeroSchema
  ) => {
    await createNewExample.mutateAsync(data);

    console.log("data", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Navbar />
        <div className="w-full pt-20 flex flex-col  items-center justify-center  min-h-screen bg-base-bg text-base-txtClr">
          <div className="w-80 text-base-bg ">
            <Input {...form.register("name")} placeholder="name" />
            <Input {...form.register("damage")} placeholder="damage" />
            <Input {...form.register("speed")} placeholder="speed" />
            <Input {...form.register("bootsImg")} placeholder="bootsImg" />
            <Input {...form.register("weaponImg")} placeholder="weaponImg" />
            <Input {...form.register("img")} placeholder="img" />
          </div>
          <Button>Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateExample;
// console.log("boots", boots);
