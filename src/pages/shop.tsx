import Navbar from "@/components/Navbar";
import BootsForm from "@/components/bootsForm";
import { Boots, bootsSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const Shop = () => {
  // const form = useForm<FinalHeroSchema>({
  //   resolver: zodResolver(finalHeroSchema),
  //   defaultValues: {
  //     // make a thing so that every time making new hero it randomises stuff?
  //     boots: {
  //       id: "",
  //       name: "",
  //       moveSpeed: 0,
  //       // bonus: "",
  //       description: "",
  //       cost: 0,
  //       url: "",
  //     },

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

  return (
    <FormProvider {...form}>
      <form>
        <Navbar />
        <div className="w-full min-h-screen bg-base-bg text-base-txtClr">
          <h1 className=" text-base-txtClr">Shop What</h1>
          <div>
            <BootsForm />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default Shop;
