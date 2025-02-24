import ProductList from "../components/ProductList";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import '../styles/style.css';
import Navigation from "../components/Navigation";

const Marketplace = () => {

    const { logout } = useLogout();
        
          const handleClick = () => {
            logout();
          };

    return (
        <div className="mp">
            <Navigation />
            <h1>Marketplace</h1>
            <div><ProductList /></div>
        </div>
    );
};

export default Marketplace;
