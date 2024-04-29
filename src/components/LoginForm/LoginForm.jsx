import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/passwordInput";
import { useDispatch, useSelector } from "react-redux";
import { toLogin } from "../../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const authLoadingStatus = useSelector(
    (state) => state.auth.authLoadingStatus
  );
  const dispatch = useDispatch();

  const location = useLocation();

  const [wrongCreds, setWrongCreds] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (values) => {
    setWrongCreds(false);
    const response = await dispatch(toLogin(values));
    if (response.payload) {
      const origin = location.state?.from?.pathname || "/users";
      navigate(origin);
    } else if (response.error.message === "Failed to fetch") {
      form.setError("root.serverErrors", {
        message: "Ошибка соединения",
      });
    } else {
      setWrongCreds(true);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-2">
          <Button type="submit">
            {authLoadingStatus === "loading"
              ? "Загрузка"
              : authLoadingStatus === "error"
              ? "Ошибка"
              : "Вход"}
          </Button>
          {errors?.root?.serverErrors.message ? (
            <p className="text-red-500">Ошибка соединения</p>
          ) : wrongCreds ? (
            <p className="text-red-500">Неверный логин или пароль</p>
          ) : null}
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
