import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";

const NoSession = () => {
  return (
    <Card className="text-3xl pt-32">
      <CardTitle className="text-3xl">
        You need an account to view this content.
      </CardTitle>
      <CardContent className=" text-center">
        <br />
        <Link className="text-blue-400" href="/">
          Log in
        </Link>{" "}
        or{" "}
        <Link className="text-blue-400" href="/signup">
          sign up
        </Link>
      </CardContent>
    </Card>
    // <Card>
    //   <CardTitle className="text-">
    //     Unauthorised
    //     <CardContent>
    //       {}
    //       You need an account to view this content. Either{" "}
    //       <Link href="/">Log in</Link> or <Link href="/signup">Sign up</Link>
    //     </CardContent>
    //   </CardTitle>
    // </Card>
  );
};
export default NoSession;
