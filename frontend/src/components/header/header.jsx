import { useEffect, useRef, useContext } from "react";
import logo from "../../assets//images/logo.svg";
import { NavLink, Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import "../../App.css";
import { authContext } from "../../context/auth-context";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle("show_menu");
  };

  return (
    <>
      <header className="header flex  items-center h-[70px]" ref={headerRef}>
        <div className="container">
          <div className="flex items-center justify-between">
            {/* ===============logo=============== */}
            <div>
              <img src={logo} alt="logo" width={"120px"} />
            </div>
            {/* ==============menu================== */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu flex items-center gap-[2.7rem]">
                {navLinks.map((links, index) => (
                  <li key={index}>
                    <NavLink
                      to={links.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? `text-primaryColor text-[16px] leading-7 font-[600]`
                          : `text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor`
                      }
                    >
                      {links.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ==================rigth nav========================== */}
              
            <div className="flex items-center gap-4">
            <h3 className="font-semibold">{user?.name}</h3>
              {token && user ? (
                <div>
                  <Link to={`${role==='doctor' ? '/doctors/profile/me' : '/users/profile/me'  }`}>
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer hover:scale-125 transition-transform overflow-hidden flex relative">
                      <img
                        src={user?.photo}
                        alt=""
                        className="w-full rounded-full object-cover"
                      />
                    </figure>
                  </Link>
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[40px] flex items-center justify-center rounded-[50px] ">
                    Login
                  </button>
                </Link>
              )}

              <span className="md:hidden" onClick={toggleMenu}>
                <MdMenu className="w-6 h-6 cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
