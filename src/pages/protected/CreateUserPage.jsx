import UserForm from "../../components/UserForm/UserForm";

const CreateUserPage = () => {
  return (
    <div className="container">
      <section className="py-8 flex items-center flex-col gap-14 md:gap-24">
        <h2 className="text-center text-2xl md:text-4xl">
          Создать пользователя
        </h2>
        <UserForm type="create" />
      </section>
    </div>
  );
};

export default CreateUserPage;
