import { useCallback, useState } from "react";
import { useHttp } from "../hooks/http.hooks";
import { logoutUser, setUser } from "../reducers/userReducer";

export const useUser = () => {
    const [ready, setReady] = useState(false);
    const tokenLS = 'token';
    const {request} = useHttp();
    const registration = (body) => {
        return async dispatch => {
            try {
                const data = await request('/api/auth/registration', 'POST', body);
                if(data instanceof Error)
                    throw data;
                dispatch(setUser(data.user));
                localStorage.setItem(tokenLS, data.token);
            } catch (error) {
                alert(error.message);
            }
        }
    }

    const login = (body) => {
        return async dispatch => {
            try {
                const data = await request('/api/auth/login', 'POST', body);
                if(data instanceof Error)
                    throw data;
                dispatch(setUser(data.user));
                localStorage.setItem(tokenLS, data.token);
            } catch (error) {
                alert(error.message);
            }
        }
    }

    const auth = useCallback(() => {
        return async dispatch => {
            try {
                setReady(false);
                const data = await request('/api/auth/', 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(data instanceof Error)
                    throw data;
                dispatch(setUser(data.user));
                localStorage.setItem(tokenLS, data.token);
            } catch (error){
                localStorage.removeItem('token');
            } finally{
                setReady(true);
            }
        }
    }, [request]);

    const logout = () => {
        return async dispatch => {
            try {
                dispatch(logoutUser());
                localStorage.removeItem('token');
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
    }


    return {registration, login, auth, logout, ready};
}