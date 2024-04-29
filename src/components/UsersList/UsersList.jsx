import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { memo } from "react";

const UsersList = ({ users, isError }) => {
  return (
    <div className="w-full users-list gap-x-4 md:gap-x-6 gap-y-6">
      {users && users.length > 0 ? (
        users.map((user) => <UsersListCard key={user.id} {...user} />)
      ) : isError ? (
        <p className="text-center text-3xl">Произошла ошибка</p>
      ) : (
        <p className="text-center text-3xl">Ничего не найдено</p>
      )}
    </div>
  );
};

const UsersListCard = memo(
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
      <div className="flex flex-col gap-y-2 justify-items-start rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 relative max-w-[300px]">
        <p className="break-words">Id: {id}</p>
        <p className="break-words">Username: {username}</p>
        <p className="break-words">
          Имя: {first_name.length > 0 ? first_name : "Отсутствует"}
        </p>
        <p className="break-words">
          Фамилия: {last_name.length > 0 ? last_name : "Отсутствует"}
        </p>
        <p>
          Был онлайн:{" "}
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
        <p>Действующий аккаунт: {is_active ? "Да" : "Нет"}</p>
        <p>Суперюзер: {is_superuser ? "Да" : "Нет"}</p>
        {!is_superuser ? (
          <div className="absolute top-4 right-4">
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
