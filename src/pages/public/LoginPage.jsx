import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="container">
      <section className="py-8 flex items-center flex-col gap-12 md:gap-24">
        <h2 className="text-center text-2xl md:text-4xl">Вход</h2>
        <LoginForm />
      </section>
    </div>
  );
};

export default LoginPage;
