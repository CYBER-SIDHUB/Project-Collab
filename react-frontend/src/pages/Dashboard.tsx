import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
