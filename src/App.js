import "./App.css";
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientsDetails from "./components/ClientsDetails";
import ClientForm from "./pages/ClientForm";
import UpdateClient from "./pages/UpdateClient";
import AdvancedTable from "./components/AdvancedTable";
import ClientPage from "./pages/ClientPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<MainLayout />} />
          <Route path="/client" exact element={<ClientsDetails />} />
          <Route path="/clienttest" exact element={<ClientPage />} />
          <Route path="/Clientform" exact element={<ClientForm />} />
          <Route path="/updateClient/:id" exact element={<UpdateClient />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
