import Navbar from "../Navbar/Navbar";
import MobileNavbar from "../MobileNavbar/MobileNavbar,";

const Header = () => {
  return (
    <header className="w-full h-full bg-slate-900 flex items-center justify-center">
      <div className="container">
        <div className="hidden md:flex">
          <Navbar />
        </div>
        <MobileNavbar />
      </div>
    </header>
  );
};

export default Header;
