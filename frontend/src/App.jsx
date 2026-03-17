import "./App.css";

import LoginPage from "./pages/LoginPage";
import SearchParkingPage from "./pages/SearchParkingPage";
import ParkingResultsPage from "./pages/ParkingResultsPage";
import GuestAccessPage from "./pages/GuestAccessPage";
import GuestParkingPage from "./pages/GuestParkingPage";
import DashboardPage from "./pages/DashboardPage";
import ParkingTypePage from "./pages/ParkingTypePage";
import NavigationPage from "./pages/NavigationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManageParkingSpotsPage from "./pages/ManageParkingSpotsPage";
import RegistrationSuggestionPage from "./pages/RegistrationSuggestionPage";

function App() {
  return (
    <div className="app">
      <h1>GPS Parking Spot App</h1>

      <LoginPage />
      <SearchParkingPage />
      <ParkingResultsPage />
      <GuestAccessPage />
      <GuestParkingPage />
      <DashboardPage />
      <ParkingTypePage />
      <NavigationPage />
      <AdminDashboardPage />
      <ManageParkingSpotsPage />
      <RegistrationSuggestionPage />
    </div>
  );
}

export default App;