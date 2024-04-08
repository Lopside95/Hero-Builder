import { ExampleHeroSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";

const DisplayExample = () => {
  const { data: example, isLoading } = trpc.hero.getExample.useQuery();

  const egArr: ExampleHeroSchema[] =
    example !== undefined && example?.length > 0 ? example : [];

  console.log("egArr", egArr);

  return (
    <div className="bg-gray-700 w-1/2">
      <h1>{egArr.length > 0 ? egArr[0].name : ""}</h1>
    </div>
  );
};

export default DisplayExample;
