import { cn } from "../../lib/utils";
import { forwardRef } from "react";

const Input = forwardRef(({ suffix, className, type, ...props }, ref) => {
  return (
    <div className={`${suffix ? "flex gap-2 items-center" : null}`}>
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {suffix}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
