import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PasswordInput } from "../ui/passwordInput";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../api/usersApi";
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string({ required_error: "Обязательное поле" })
    .max(150)
    .regex(/^[\w.@+-]+$/, {
      message: "Только латинские буквы, числа, и символы @/./+/-",
    }),
  first_name: z.string().max(150, { message: "Максимум 150 символов" }),
  last_name: z.string().max(150, { message: "Максимум 150 символов" }),
  password: z
    .string()
    .max(128, { message: "Максимум 128 символов" })
    .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
      message: "Минимум 8 символов, одна латинская заглавная буква и число",
    }),
  is_active: z.boolean(),
});

const UserForm = ({ type, user = {} }) => {
  const [updateUser, { isLoading: isUpdateLoading, isError: isUpdatingError }] =
    useUpdateUserMutation();
  const [createUser, { isLoading: isCreateLoading, isError: isCreatingError }] =
    useCreateUserMutation();

  const [isLoginExist, setIsLoginExist] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username ?? "",
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      password: "",
      is_active: user.is_active ?? true,
    },
  });

  const onSubmit = async (values) => {
    setIsLoginExist(false);
    if (type === "edit") {
      await updateUser({ id: user.id, ...values })
        .unwrap()
        .then(() => navigate("/users"))
        .catch((error) => {
          if (error.data.username.length > 0) {
            setIsLoginExist(true);
          }
        });
    }
    if (type === "create") {
      await createUser(values)
        .unwrap()
        .then(() => navigate("/users"))
        .catch((error) => {
          if (error.data.username.length > 0) {
            setIsLoginExist(true);
          }
        });
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-screen-md w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage>{isLoginExist && "Логин занят"}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Иван" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input placeholder="Иванов" {...field} />
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
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-start gap-3">
              <FormLabel>Активный пользователь</FormLabel>
              <FormControl>
                <Input
                  checked={field.value}
                  className="w-6 h-6"
                  type="checkbox"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <Button type="submit">
            {isUpdateLoading || isCreateLoading ? "Загрузка" : "Подтвердить"}
          </Button>
          <Button type="button" onClick={handleCancel}>
            Отмена
          </Button>
        </div>
        {(isCreatingError || isUpdatingError) && !isLoginExist && (
          <div>
            <p className="text-red-500">Произошла ошибка</p>
          </div>
        )}
      </form>
    </Form>
  );
};

export default UserForm;
