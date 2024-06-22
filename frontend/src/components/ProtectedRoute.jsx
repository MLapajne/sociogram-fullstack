import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import  {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import {useState, useEffect} from 'react';


function ProtectedRoute({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);


    useEffect(() => {
        auth().catch(() => setIsAuthenticated(false));
    }, []);
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh/', {refresh: refreshToken});
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
        }
           

    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp;
        const now = Date.now() / 1000;
        if (now >= tokenExp) {
            await refreshToken();
        } else {
            setIsAuthenticated(true);
        }
    }
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
    /*
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return <Navigate to="/login" />;
    }

    const {exp} = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            return <Navigate to="/login" />;
        }

        api.post('/refresh', {refresh: refreshToken})
            .then((response) => {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            })
            .catch(() => {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                return <Navigate to="/login" />;
            });
    }

    return element;
    */

}

export default ProtectedRoute;