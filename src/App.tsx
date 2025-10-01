import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "@/components/ui/button";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme-Provider";
import WeatherDashboard from "./pages/Weather_dashboard";
import CityPage from "./pages/city_page";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>
          <Route>
            <Route path="/" element = {<WeatherDashboard/>}/>
            <Route path="/city/:cityName" element = {<CityPage/>}/>
          </Route>
        </Routes>
      </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
