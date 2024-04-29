import UsersList from "../../components/UsersList/UsersList";

import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { PlusIcon } from "@radix-ui/react-icons";
import FilterUsers from "../../components/FilterUsers/FilterUsers";
import { useCallback, useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../api/usersApi";
import SortUsers from "../../components/SortUsers/SortUsers";
import Spinner from "../../components/ui/spinner";

const UsersPage = () => {
  const [sortValue, setSortValue] = useState("");

  const [inputValue, setInputValue] = useState("");

  const [filterValue, setFilterValue] = useState(inputValue);

  const handleSetInputValue = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleSetSortType = useCallback((e) => {
    setSortValue(e);
  }, []);

  useEffect(() => {
    const debouncedFilter = setTimeout(() => {
      setFilterValue(inputValue);
    }, 300);
    return () => clearTimeout(debouncedFilter);
  }, [inputValue]);

  const {
    data: users,
    isError,
    isLoading,
  } = useGetAllUsersQuery(undefined, {
    selectFromResult: ({ data, isError, isLoading }) => {
      return {
        data: data
          ?.filter((user) =>
            user.username
              .trim()
              .toLowerCase()
              .includes(filterValue.trim().toLowerCase())
          )
          .sort((a, b) =>
            sortValue === "HighToLow"
              ? a.id < b.id
                ? 1
                : -1
              : a.id < b.id
              ? -1
              : 1
          ),
        isError,
        isLoading,
      };
    },
  });

  return (
    <div className="container">
      <section className="py-8 flex items-center flex-col gap-8 md:gap-10">
        <h2 className="text-center text-2xl md:text-4xl">
          Список пользователей
        </h2>
        <div className="w-full flex flex-col items-center md:flex-row md:justify-between gap-6 md:gap-14">
          <Link to="create">
            <Button className="hover:bg-slate-300 hover:text-black bg-slate-800 flex gap-2">
              <PlusIcon /> Создать
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <FilterUsers
              value={inputValue}
              handleSetInputValue={handleSetInputValue}
            />
            <SortUsers handleSetSortType={handleSetSortType} />
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <UsersList isError={isError} users={users} />
        )}
      </section>
    </div>
  );
};

export default UsersPage;
