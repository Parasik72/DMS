import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from '../../actions/user';
import styles from './Authorization.module.scss'

export const Login = () => {
    const {login} = useUser();
    const dispatch = useDispatch();
    const [body, setBody] = useState({
        email: '',
        password: ''
    });
    const handleChange = e => {
        setBody({
            ...body, 
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = () => {
        dispatch(login(body));
    }
    const [showPassword, setShowpassword] = useState(false);
    return (
        <div className={styles.Authorization}>
        <div className={styles.Authorization__block}>
            <h2>Logging into a DMS account</h2>
            <div className={styles.Authorization__item}>
                <div className={styles.Authorization__inputOne}>
                    <input name="email" className={styles.Authorization__inputOne} value={body.email} onChange={handleChange}  type="email" placeholder="Email" required={true} />
                </div>
            </div>
            <div className={styles.Authorization__item}>
                <div className={styles.Authorization__inputOne}>
                    <input name="password" className={styles.Authorization__inputOne} value={body.password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Password" required={true} />
                </div>
            </div>
            <div className={styles.Authorization__checkBox}>
                <label><input value={showPassword} onChange={e =>setShowpassword(!showPassword)}  type="checkbox" /><h3>Show password</h3></label>
            </div>
            <div className={styles.Authorization__item}>
                <button className={styles.Authorization__btn} onClick={handleSubmit}>Enter</button>
            </div>
        </div>
    </div>
    );
}