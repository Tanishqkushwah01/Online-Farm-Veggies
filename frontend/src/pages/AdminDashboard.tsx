import Header from "../components/layouts/Admin/Header";
import Sidebar from "../components/layouts/Admin/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <Sidebar />

      <div className="ml-67.5 min-h-screen">
        <Header username="Tanishq Kushwah" />

        <main className="p-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard Content
          </h1>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;