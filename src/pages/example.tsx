import Navbar from "@/components/Navbar";
import DisplayExample from "@/components/displayExample";
import CreateExample from "@/components/exampleHero";

const Example = () => {
  return (
    <div className="w-full pt-20 flex flex-col  items-center justify-center  min-h-screen bg-base-bg text-base-txtClr">
      <Navbar />
      <CreateExample />
      <DisplayExample />
    </div>
  );
};

export default Example;
