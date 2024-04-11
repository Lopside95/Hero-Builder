import Navbar from "@/components/Navbar";
import BootsForm from "@/components/create/bootsForm";
import NumberField from "@/components/numberInput";
import TextField from "@/components/textInput";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Boots, bootsSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export interface TextFieldInterface {
  fieldName: string;
  fieldLabel: string;
}

const CreateBoots = () => {
  const form = useForm<Boots>({
    resolver: zodResolver(bootsSchema),
    defaultValues: {
      name: "",
      speed: 40,
      description: "",
      cost: 45,
      bonus: "",
      img: "",
    },
  });

  const createNewBoots = trpc.shop.createNewBoots.useMutation({
    onSuccess: async () => {
      alert(" reat");
    },
  });

  const onSubmit: SubmitHandler<Boots> = async (data: Boots) => {
    alert("clicked");
    await createNewBoots.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Navbar />
        <div className="bg-base-bg flex flex-col pl-80 justify-center align-middle w-full min-h-screen">
          <TextField fieldName="name" fieldLabel="Name" />
          <NumberField fieldName="speed" fieldLabel="Move Speed" />
          <NumberField fieldName="cost" fieldLabel="Cost" />
          <TextField fieldName="img" fieldLabel="Image" />
          <TextField fieldName="description" fieldLabel="description" />
          <TextField fieldName="bonus" fieldLabel="bonus" />
          <Button>Create</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateBoots;
