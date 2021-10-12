import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAdm } from '../../../actions/administrator';
import { Link } from 'react-router-dom';
import styles from './UploadDocs.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../../reducers/admReducer';

export const UploadDocs = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.admReducer.users);
    const history = useHistory();
    const {getUsers, uploadDoc} = useAdm();
    const [serchUsers, setSerchUsers] = useState('');
    const [body, setBody] = useState({
        title: '',
        type: '',
        owner: '',
        file: {}
    });
    const handleChange = e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        });
    }
    const handleSearch = async e => {
        setSerchUsers(e.target.value);
        if(e.target.value.length){
            dispatch(getUsers(e.target.value));
        }else
            dispatch(setUsers([]));
    }
    const handleUploadFile = e => {
        const file = [...e.target.files];
        if(file.length)
            setBody({
                ...body,
                file: file[0]
            });
    }
    const checkName = name => {
        if(name.length >= 20){
            const left = name.slice(0, 8), right = name.slice(-8);
            return left + '...' + right;
        }
        return name;
    }
    const clickOnwer = id => {
        setBody({
            ...body,
            owner: id
        });
    }
    const handleUpload = async () => {
        const bRes = await uploadDoc(body);
        if(bRes){
            alert('Document was uploaded!');
            history.push('/');
        }
    }
    const typeHandle = (type, id) => {
        setBody({...body,type});
        let temp = document.body.getElementsByClassName(styles.typeActive);
        if(temp.length)
            temp[0].classList.remove(styles.typeActive);
        document.getElementById(id).classList.add(styles.typeActive);
    }
    return (
        <>
        <Link to="/" className={styles.mainUpload__header}>
            <h1>Upload document</h1>
            <h5>Click to return back</h5>
        </Link>
        <div className={styles.mainUpload}>
            <div className={styles.mainUpload__body}>
                <div className={styles.mainUpload__size}>
                    <div className={styles.mainUpload__item}>
                        <h2>Title: <input onChange={handleChange} value={body.title} name="title" placeholder="Title..." type="text"></input></h2>
                    </div>
                    <div className={styles.mainUpload__item}>
                        <h2>Type:</h2>
                        <div id={styles.Operative} className={styles.mainUpload__type} onClick={(e) => typeHandle('Operative', e.target.id)}> 
                            <span>Operative</span>
                        </div>
                        <div id={styles.Reference} className={styles.mainUpload__type} onClick={e => typeHandle('Reference', e.target.id)}> 
                            <span>Reference</span>
                        </div>
                    </div>
                    <div className={styles.mainUpload__item}>
                        <h2>Find owner: <input onChange={handleSearch} value={serchUsers} name="owner" placeholder="Search..." type="text"></input></h2>
                        {users && serchUsers.length > 0 && <div className={styles.mainUpload__users}>
                            {users.map(user => {
                                return (
                                    <div key={user._id} className={styles.mainUpload__user} onClick={() => clickOnwer(user._id)}> 
                                        <span>{user.firstname + ' ' + user.lastname + ` (${user._id})`} </span>
                                    </div>
                                );
                            })}
                        </div>}
                    </div>
                    <div className={styles.mainUpload__item}>
                        <h2>Selected owner: <input className={styles.mainUpload__disabled} disabled onChange={handleSearch} value={body.owner} name="owner" placeholder="Select owner..." type="text"></input></h2>
                    </div>
                    <div className={styles.mainUpload__item}>
                        <div className={styles.mainUpload__fileUpload}>
                            <h2>Document: </h2>
                            <div className={styles.mainUpload__flex}>
                                <label htmlFor="file">Upload document</label>
                                <input onChange={handleUploadFile} name="file" type="file" id="file"></input>
                                <h3>Name: {body.file.name ? checkName(body.file.name) : 'none'}</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainUpload__item}>
                        <div className={styles.mainUpload__uploadBtn}>
                            <button onClick={() => handleUpload()}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}