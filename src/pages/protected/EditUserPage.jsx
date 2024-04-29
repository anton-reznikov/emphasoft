import { useGetUserQuery } from "../../api/usersApi";
import UserForm from "../../components/UserForm/UserForm";

import Spinner from "../../components/ui/spinner";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
  const { userId } = useParams();

  const { data: user, isLoading } = useGetUserQuery(userId, {
    skip: !userId,
  });

  return (
    <div className="container">
      <section className="py-8 flex items-center flex-col gap-14 md:gap-24">
        <h2 className="text-center text-xl md:text-3xl">
          Редактировать пользователя
        </h2>
        {isLoading ? <Spinner /> : <UserForm type="edit" user={user} />}
      </section>
    </div>
  );
};

export default EditUserPage;
