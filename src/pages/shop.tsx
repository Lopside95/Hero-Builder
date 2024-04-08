import Navbar from "@/components/Navbar";
import BootsForm from "@/components/bootsForm";
import { Button } from "@/components/ui/button";
import WeaponsForm from "@/components/weaponForm";
import { Boots, bootsSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Shop = () => {
  const { data: boots, isLoading } = trpc.shop.getAllBoots.useQuery();
  const form = useForm<Boots>({
    resolver: zodResolver(bootsSchema),
    defaultValues: {
      name: "",
      moveSpeed: 0,
      description: "",
      cost: 0,
      url: "",
    },
  });

  // console.log("boots", boots);

  const onSubmit = () => {};

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Navbar />
        <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
          <div className="flex">
            <BootsForm />
            <WeaponsForm />
          </div>
          <Button>Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};
export default Shop;
