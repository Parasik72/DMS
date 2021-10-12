import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from '../../actions/user';
import styles from './Authorization.module.scss'

export const Registration = () => {
    const {registration} = useUser();
    const dispatch = useDispatch();
    const [body, setBody] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentIDSeries: '',
        faculty: '',
        group: ''
    });
    const [showPassword, setShowpassword] = useState(false);
    const handleChange = e => {
        setBody({
            ...body, 
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = () => {
        if(body.password !== body.confirmPassword){
            alert("'Password' and 'Confirm password' must be equal.");
            return;
        }
        dispatch(registration(body));
    }
    return (
        <div className={styles.Authorization}>
            <div className={styles.Authorization__block}>
                <h2>DMS account creation</h2>
                <div className={styles.Authorization__item}>
                    <input name="firstname" value={body.firstname} onChange={handleChange} type="text" placeholder="First name" required={true} />
                    <input name="lastname" value={body.lastname} onChange={handleChange} type="text" placeholder="Last name" required={true} />
                </div>
                <div className={styles.Authorization__item}>
                    <div className={styles.Authorization__inputOne}>
                        <input name="email" className={styles.Authorization__inputOne} value={body.email} onChange={handleChange}  type="email" placeholder="Email" required={true} />
                        <h5>You can use letters of the Latin alphabet, numbers and dots.</h5>
                    </div>
                </div>
                <div className={styles.Authorization__item}>
                    <div className={styles.Authorization__inputOne}>
                        <input name="studentIDSeries" className={styles.Authorization__inputOne} value={body.studentIDSeries} onChange={handleChange}  type="text" placeholder="Student ID Series" required={true} />
                        <h5>Student ID series must be eight characters long and include only numbers of the Latin alphabet.</h5>
                    </div>
                </div>
                <div className={styles.Authorization__item}>
                    <div className={styles.Authorization__inputOne}>
                        <input name="faculty" className={styles.Authorization__inputOne} value={body.faculty} onChange={handleChange}  type="text" placeholder="Faculty" required={true} />
                        <h5>Faculty must be at least three characters long and include letters or numbers.</h5>
                    </div>
                </div>
                <div className={styles.Authorization__item}>
                    <div className={styles.Authorization__inputOne}>
                        <input name="group" className={styles.Authorization__inputOne} value={body.group} onChange={handleChange}  type="text" placeholder="Group" required={true} />
                        <h5>Group must be at least three characters long and include letters, numbers or special characters.</h5>
                    </div>
                </div>
                <div className={styles.Authorization__inputOne}>
                    <div className={styles.Authorization__item}>
                        <input name="password" value={body.password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Password" required={true} />
                        <input name="confirmPassword" value={body.confirmPassword} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Confirm password" required={true} />
                    </div>
                    <h5>Password must be at least eight characters long and include letters, numbers or special characters.</h5>
                </div>
                <div className={styles.Authorization__checkBox}>
                    <label><input value={showPassword} onChange={e =>setShowpassword(!showPassword)}  type="checkbox" /><h3>Show password</h3></label>
                </div>
                <div className={styles.Authorization__item}>
                    <button className={styles.Authorization__btn} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}