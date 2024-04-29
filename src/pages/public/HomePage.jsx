import { Button } from "../../components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const authToken = useSelector((state) => state.auth.authToken);
  return (
    <div className="container">
      <section className="py-8 flex items-center flex-col gap-14 md:gap-24">
        <h2 className="text-center text-2xl md:text-4xl">
          {authToken ? "Вы вошли в систему" : "Требуется войти в систему"}
        </h2>

        <Button className=" py-8 text-3xl font-light bg-slate-800 hover:bg-slate-900">
          <Link to={authToken ? "/users" : "/login"} className="w-full">
            Продолжить
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
