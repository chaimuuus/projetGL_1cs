import { Outlet } from "react-router-dom";



const Layout = () => {
  return (
    <div>
        <Outlet />
      {/*<Navbar />
      <Outlet />
      <Footer />*/}
    </div>
  );
};

export default Layout;
