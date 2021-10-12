import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAdm } from '../../../actions/administrator';
import { setUsers } from '../../../reducers/admReducer';
import { EditItem } from './EditItem/EditItem';
import {Loader} from '../../Loader/Loader';
import styles from './EditDocs.module.scss';

export const EditDocs = () => {
    const users = useSelector(state => state.admReducer.users);
    const docs = useSelector(state => state.docsReducer.docs);
    const [selectedUser, setSelectedUser] = useState({});
    const [search, setSearch] = useState('');
    const {getUsers, getById, ready} = useAdm();
    const dispatch = useDispatch();
    const handleSearch = e => {
        setSearch(e.target.value);
        if(e.target.value.length)
            dispatch(getUsers(e.target.value));
        else
            setTimeout(() => {
                dispatch(setUsers([]));
            }, 500);
    }
    const userClick = user => {
        setSelectedUser(user);
        dispatch(getById(user._id));
    }
    if(selectedUser._id)
        return (
            <>
            <div className={styles.mainEdit__header} onClick={() => setSelectedUser({})}>
                <h1>Edit document (Documents)</h1>
                <h5>Click to return back</h5>
            </div>
            {ready ? 
                <div id="123" className={styles.mainEditDocs}>
                    <div className={styles.mainEdit__body}>
                        {docs.length > 0 
                        ? 
                        docs.map(doc => <EditItem key={doc._id} doc={doc} />)
                        :
                        <h2>Documents was not found.</h2>
                        }
                    </div>
                </div>
            :
            <div className={styles.mainEdit__loader}>
                <Loader />
            </div>
            }
            </>
        );
    return (
        <>
        <Link to="/" className={styles.mainEdit__header}>
            <h1>Edit document (Users)</h1>
            <h5>Click to return back</h5>
        </Link>
        <div className={styles.mainEdit}>
            <div className={styles.mainEdit__body}>
                <div className={styles.mainEdit__item}>
                    <input onChange={handleSearch} type="text" value={search} placeholder='Search...'/>
                </div>
                {users.length > 0 && <div className={styles.mainEdit__item}> 
                    <div className={styles.mainEdit__users}> 
                        {users?.map(user => {
                            return (
                                <div key={user._id} className={styles.mainEdit__user} onClick={() => userClick(user)}> 
                                    <span>{user.firstname + ' ' + user.lastname + ` (${user._id})`} </span>
                                </div>
                            );
                        })}
                    </div>
                </div>}
            </div>
        </div>
        </>
    );
}