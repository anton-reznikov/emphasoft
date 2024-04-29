import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { memo } from "react";

const UsersList = ({ users, isError }) => {
  return (
    <div className="w-full grid grid-flow-row gap-x-4 md:gap-x-6 gap-y-6">
      <div className="w-full hidden md:grid grid-cols-7 gap-x-2 rounded-xl p-5 font-bold  ">
        <p className="justify-self-start">Id</p>
        <p className="justify-self-start">Username</p>
        <p>Имя</p>
        <p>Фамилия</p>
        <p>Был онлайн</p>
        <p>Активный аккаунт</p>
        <p>Суперюзер</p>
      </div>
      {users && users.length > 0 ? (
        users.map((user) => <UsersListItem key={user.id} {...user} />)
      ) : isError ? (
        <p className="text-center text-3xl">Произошла ошибка</p>
      ) : (
        <p className="text-center text-3xl">Ничего не найдено</p>
      )}
    </div>
  );
};

const UsersListItem = memo(
  ({
    id,
    username,
    first_name,
    last_name,
    last_login,
    is_superuser,
    is_active,
  }) => {
    const wasOnline = new Date(last_login);

    return (
      <div className="w-full flex flex-col md:grid md:grid-cols-7 md:justify-between gap-x-2 justify-items-stretch rounded-xl shadow-md max-md:pt-10 p-5 hover:shadow-xl transition-all duration-300 relative  text-lg md:text-xl">
        <p
          data-label="ID"
          className="break-all justify-self-start max-md:userList__card"
        >
          {id}
        </p>
        <p
          data-label="Username"
          className="break-all justify-self-start max-md:userList__card"
        >
          {username}
        </p>
        <p data-label="Имя" className="break-all max-md:userList__card">
          {first_name.length > 0 ? first_name : "Нет"}
        </p>
        <p data-label="Фамилия" className="break-all max-md:userList__card">
          {last_name.length > 0 ? last_name : "Нет"}
        </p>
        <p data-label="Был онлайн" className="break-all max-md:userList__card">
          {last_login
            ? `${
                wasOnline.getDate().toString().length === 1
                  ? `0${wasOnline.getDate()}`
                  : `${wasOnline.getDate()}`
              }.${
                wasOnline.getMonth().toString().length === 1
                  ? `0${wasOnline.getMonth() + 1}`
                  : `${wasOnline.getMonth() + 1}`
              }.${wasOnline.getFullYear()}`
            : "Нет данных"}
        </p>
        <p
          className="break-all max-md:userList__card"
          data-label="Активный аккаунт"
        >
          {is_active ? "Да" : "Нет"}
        </p>
        <p
          className="break-all max-md:userList__card max-md:border-none"
          data-label="Суперюзер"
        >
          {is_superuser ? "Да" : "Нет"}
        </p>
        {!is_superuser ? (
          <div className="absolute top-0 right-0 md:top-4 md:right-4">
            <Link to={`${id}/edit`}>
              <Button className="bg-white text-slate-800 hover:bg-slate-800 hover:text-white active:bg-slate-900">
                <Pencil1Icon />
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
);

export default UsersList;
