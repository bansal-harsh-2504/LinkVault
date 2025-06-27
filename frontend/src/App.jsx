import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AddLink from "./pages/AddLink";
import EditLink from "./pages/EditLink";
import Folders from "./pages/Folders";
import AddFolder from "./pages/AddFolder";
import EditFolder from "./pages/EditFolder";
import FolderDetail from "./pages/FolderDetail";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="/folders/:id" element={<FolderDetail />} />
          <Route path="/add-folder" element={<AddFolder />} />
          <Route path="/add-folder/:id" element={<AddFolder />} />
          <Route path="/edit-folder" element={<EditFolder />} />
          <Route path="/edit-folder/:id" element={<EditFolder />} />
          <Route path="/add-link" element={<AddLink />} />
          <Route path="/add-link/:id" element={<AddLink />} />
          <Route path="/edit-link" element={<EditLink />} />
          <Route path="/edit-link/:id" element={<EditLink />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
