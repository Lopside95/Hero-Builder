import { cn } from "@/lib/utils";
import React from "react";

function ShopSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-base-bg", className)}
      {...props}
    />
  );
}

export { ShopSkeleton };
