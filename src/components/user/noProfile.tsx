import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import Link from "next/link";
const NoProfile = ({}) => {
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
  );
};

export default NoProfile;