import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUsers } from '../../reducers/admReducer';
import styles from './Main.module.scss';
import { MainItem } from './MainItem/MainItem';

export const Main = () => {
    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const items = [
        {
            name: "Get documents", 
            to: "/getDocs",
            role: 'USER'
        },
        {
            name: "Upload documents",
            to: "/uploadDocs",
            role: 'ADMIN'
        },
        {
            name: "Edit documents",
            to: "/editDocs",
            role: 'ADMIN'
        }
    ];
    useEffect(() => {
        dispatch(setUsers([]));
    }, [dispatch]);
    return (
        <div className={styles.main}>
            <div className={styles.main__body}>
                {items?.map((item, index) => {
                    let bflag = false;
                    user.roles.forEach(element2 => {
                        if(element2 === item.role)
                            bflag = true;
                    });
                    if(!bflag)
                        return (<div key={index}></div>);
                    return ( <Link key={index} to={item.to} className={styles.main__item}><MainItem name={item.name}/></Link>);
                })}
            </div>
        </div>
    );
}