import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDocs } from '../../../actions/docs';
import { DocsItem } from '../DocsItem/DocsItem';
import {Loader} from '../../Loader/Loader';
import { Link } from 'react-router-dom';
import styles from './GetDocs.module.scss'

export const GetDocs = () => {
    const docs = useSelector(state => state.docsReducer.docs);
    const {getDocs, ready} = useDocs();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getDocs());
    }, [dispatch, getDocs]);
    return (
        <>
        <Link to="/" className={styles.main__header}>
            <h1>Documents</h1>
            <h5>Click to return back</h5>
        </Link>
        {ready ?
        <div className={styles.main}>
            <div className={styles.main__body}>
                {docs.length > 0 
                ?
                docs?.map(item => {
                    return <DocsItem key={item._id} doc={item}/>
                })
                :
                <h2>Documents was not found.</h2>
                }
            </div>
        </div>
        :
        <div className={styles.main__loader}>
            <Loader />
        </div>}
        </>
    );
}