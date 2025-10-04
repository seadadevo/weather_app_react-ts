import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "@/components/ui/button";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme-Provider";
import WeatherDashboard from "./pages/Weather_dashboard";
import CityPage from "./pages/city_page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route>
                <Route path="/" element={<WeatherDashboard />} />
                <Route path="/city/:cityName" element={<CityPage />} />
              </Route>
            </Routes>
          </Layout>
        </ThemeProvider>
      </Router>
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
