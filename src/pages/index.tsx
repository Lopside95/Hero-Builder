import { trpc } from "@/utils/trpc";
import Link from "next/link";
import LoginForm from "@/pages/api/loginForm";
import { User } from "@/types/user";

const Home = () => {
  const { data: user } = trpc.user.getUserById.useQuery();

  const quickUser = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      console.log("New user created");
    },
  });

  // Use for testing when deleting account
  const handleQuick = () => {
    const quickData: User = {
      userName: "Lopside",
      email: "james@email.com",
      password: "Pass1*",
      repeatPassword: "Pass1*",
      pic: "",
    };

    try {
      quickUser.mutateAsync(quickData);
    } catch (error) {
      console.error("Quick user error", error);
    }
  };

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
      <div className="w-3/4 flex flex-col items-center gap-10 pt-20 ">
        <section className="flex flex-col items-center justify-center">
          <p className="text-6xl items-center text-base-txtClr">
            {user ? `Welcome ${user.userName}` : `Welcome to the hero builder`}
          </p>
          <span className="text-3xl w-3/4 text-center py-10 text-base-txtClr">
            Buy items, give your hero a backstory and save them to your gallery
          </span>
          <article className="flex gap-10 items-center">
            <span className="flex flex-col w-2/3 text-xl gap-3">
              <span className="flex gap-1 self-center">
                <Link className="text-blue-400" href="/signup">
                  Sign up
                </Link>
                or{" "}
                <Link
                  className={`text-green-300 underline-offset-4 ${
                    user ? "cursor-default" : "cursor-pointer"
                  } `}
                  href={user ? "" : "/localCreate"} // stops users from being able to go to localheroes if they are signed in
                  //TODO: Implement protected routes
                >
                  continue
                </Link>
                without an account
              </span>
              <span className="flex">
                {" "}
                Creating an account will save your heroes in the{" "}
                <p className="text-blue-300 pl-1"> database</p>.
              </span>
              <span className="flex">
                {" "}
                Continuing without an account will save them in{" "}
                <p className="text-green-300 pl-1"> local storage</p>.
              </span>
              <p>
                {" "}
                You can delete your account as well as locally stored heroes.
              </p>
            </span>
            <LoginForm />
          </article>
          <div className="pt-10">
            {/* <Button onClick={() => handleQuick()}>Quick Signup</Button> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
