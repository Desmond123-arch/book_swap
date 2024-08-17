import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function useLogout() {
    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('email');
        sessionStorage.removeItem('isLoggedIn');
        
        navigate('/login');
    };

    return logout;
}
