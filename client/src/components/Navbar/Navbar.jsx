import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../actions/user';
import { clearDocs } from '../../reducers/docsReducer';
import styles from './Navbar.module.scss'

export const Navbar = ({ready}) => {
    const {logout} = useUser();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.userReducer.isAuth);
    const handleLogout = e => {
        e.preventDefault();
        dispatch(clearDocs());
        dispatch(logout());
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__wrapper}>
                <NavLink to="/" className={styles.navbar__logo}>
                    <h1>DMS</h1>
                </NavLink>
                {ready && <div className={styles.navbar__items}>
                    {!isAuth && <NavLink to="/login">Sign in</NavLink>}
                    {!isAuth && <NavLink to="/registration">Sign up</NavLink>}
                    {isAuth && <a onClick={handleLogout} href="/">Logout</a>}
                </div>}
            </div>
        </div>
    );
}