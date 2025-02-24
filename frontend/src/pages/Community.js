import { useEffect } from "react";
import { useStatusContext } from "../hooks/useStatusContext";
import '../styles/style.css';

//components
import StatusDetails from '../components/StatusDetails'
import StatForm from "../components/StatForm";
import { useLogout } from '../hooks/useLogout';
import Navigation from "../components/Navigation";

const Community = () => {

  const { logout } = useLogout();
          
            const handleClick = () => {
              logout();
            };

  const {status, dispatch} = useStatusContext()

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch('/api/status');
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_STATUS', payload: json})
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="community">
      <Navigation />
      <div className="community1">

        {status && status.map((item) => (
          <StatusDetails key={item._id} status={item} />
        ))}
      </div>
      <StatForm />
    </div>
  );
};

export default Community;
