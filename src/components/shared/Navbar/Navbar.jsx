import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { handleLogout } from "../../../slices/authSlice";
import { NavLink } from "react-router-dom";
import { Button } from "../../ui/button";
const Navbar = ({ setOpen }) => {
  const authToken = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const authUsername = useSelector((state) => state.auth.username);

  const onCloseMobileMenu = () => {
    if (!isDesktop) {
      setOpen(false);
    }
  };
  const onLogout = () => {
    dispatch(handleLogout());
    onCloseMobileMenu();
  };

  const linksData = [
    {
      id: 1,
      linkTo: "/",
      text: "Главная",
    },
    {
      id: 2,
      linkTo: authToken ? "/users" : "/login",
      text: authToken ? "Пользователи" : "Вход",
    },
  ];
  return (
    <nav className="flex w-full flex-col md:flex-row justify-between items-center gap-y-9">
      <ul className="flex flex-col md:flex-row gap-x-8 list-none items-center ">
        {linksData.map((link) => (
          <li key={link.id}>
            <NavLink
              onClick={onCloseMobileMenu}
              className={({ isActive }) =>
                `text-black md:text-white text-lg ${
                  isActive ? `underline underline-offset-4` : ""
                }`
              }
              to={link.linkTo}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
      {authToken && (
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div>
            <p className="text-black md:text-white">{authUsername}</p>
          </div>
          <Button
            className="text-white md:hover:text-black text-lg bg-slate-800  hover:bg-slate-300 active:bg-slate-400"
            onClick={onLogout}
          >
            Выйти
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
