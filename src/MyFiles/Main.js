import { useEffect,React } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
//import Presentation from "layouts/pages/presentation";
import Home from "MyFiles/Home";
import MyWorks from "MyFiles/MyWorks";
import DefaultNavbar from "../examples/Navbars/DefaultNavbar";

// Material Kit 2 React routes
import routes from "routes";
export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <DefaultNavbar
                  brand="Sparrow Edutorii"
                  routes={routes}
                  action={{
                  type: "external",
                  route: "https://www.creative-tim.com/product/material-kit-react",
                  label: "free download",
                  color: "dark"
                  }}
                  bgColor1="dark"
                  sticky
              />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Home />} />
        <Route path="/myworks" element={<MyWorks />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
      </Routes>
    </ThemeProvider>
  );
}
