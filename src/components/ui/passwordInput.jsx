import { forwardRef, useReducer } from "react";
import { Input } from "./input";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const PasswordInput = forwardRef(({ className, ...props }, ref) => {
  const [showPassword, toogleShowPassword] = useReducer((showPassword) => {
    return !showPassword;
  }, false);
  return (
    <Input
      suffix={
        showPassword ? (
          <EyeOpenIcon className="select-none" onClick={toogleShowPassword} />
        ) : (
          <EyeNoneIcon className="select-none" onClick={toogleShowPassword} />
        )
      }
      type={showPassword ? "text" : "password"}
      className={className}
      {...props}
      ref={ref}
    />
  );
});
PasswordInput.displayName = "Input";

export { PasswordInput };
