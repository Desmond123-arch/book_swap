import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function useLogout() {
    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');
        sessionStorage.removeItem('isLoggedIn');
        
        navigate('/login');
    };

    return logout;
}
