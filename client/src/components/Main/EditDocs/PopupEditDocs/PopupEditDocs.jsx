import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAdm } from '../../../../actions/administrator';
import { useDocs } from '../../../../actions/docs';
import styles from './PopupEditDocs.module.scss';

export const PopupEditDocs = ({doc, setPopupDisplay}) => {
    const dispatch = useDispatch();
    const {editDoc, deleteDoc} = useAdm();
    const {download} = useDocs();
    const [body, setBody] = useState({
        title: doc.title,
        type: doc.type,
        owner: doc.owner,
        fileId: doc._id,
        file: {
            name: doc.fileName
        }
    });
    const handleChange = e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        });
    }
    const hidePopup = () => {
        const popup = document.getElementById('mainPopup');
        popup.style.transition = "0.2s";
        window.requestAnimationFrame(() => popup.style.opacity = 0);
        setTimeout(() => {
            setPopupDisplay(false);
        }, 200);
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
    const handleEdit = async () => {
        dispatch(editDoc(body, hidePopup));
    }
    const handleDownload = e => {
        e.preventDefault();
        e.stopPropagation();
        download(doc);
    }
    const handleDelete = e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteDoc(doc._id));
    }
    const typeHandle = (type, id) => {
        setBody({...body,type});
        let temp = document.body.getElementsByClassName(styles.typeActive);
        if(temp.length)
            temp[0].classList.remove(styles.typeActive);
        document.getElementById(id)?.classList.add(styles.typeActive);
    }
    useEffect(() => {
        if(body.type === 'Operative')
            document.getElementById(styles.Operative).classList.add(styles.typeActive);
        else
            document.getElementById(styles.Reference).classList.add(styles.typeActive);
    }, [body.type]);
    return (
        <div id="mainPopup" className={styles.mainPopup} onMouseDown={hidePopup}>
            <div className={styles.mainPopup__body} onMouseDown={e => {e.stopPropagation()}}>
                <div className={styles.mainPopup__item}>
                    <h3>Title: <input name="title" onChange={handleChange} type="text" value={body.title} /></h3>
                </div>
                <div className={styles.mainPopup__item}>
                    <h3>Type:</h3>
                    <div id={styles.Operative} className={styles.mainPopup__type} onClick={(e) => typeHandle('Operative', e.target.id)}> 
                        <span>Operative</span>
                    </div>
                    <div id={styles.Reference} className={styles.mainPopup__type} onClick={e => typeHandle('Reference', e.target.id)}> 
                        <span>Reference</span>
                    </div>
                </div>
                <div className={styles.mainPopup__item}>
                    <h3>Owner: <input className={styles.mainPopup__disabled} name="type" disabled type="text" value={doc.owner?.firstname + " " + doc.owner?.lastname} /></h3>
                </div>
                <div className={styles.mainPopup__item}>
                    <h3>Uploaded by: <input className={styles.mainPopup__disabled} name="type" disabled type="text" value={doc.uploadedBy?.firstname + " " + doc.uploadedBy?.lastname} /></h3>
                </div>
                <div className={styles.mainPopup__item}>
                        <div className={styles.mainPopup__fileUpload}>
                            <h2>Document: </h2>
                            <div className={styles.mainPopup__flex}>
                                <label htmlFor="file">Upload document</label>
                                <input onChange={handleUploadFile} name="file" type="file" id="file"></input>
                                <h3>Name: {body.file.name ? checkName(body.file.name) : 'none'}</h3>
                            </div>
                        </div>
                    </div>
                <div className={styles.mainPopup__item}>
                    <div className={styles.mainPopup__btns}>
                        <button onClick={() => handleEdit()}>Edit document</button>
                        <button onClick={handleDownload}>Download</button>
                        <button className={styles.mainPopup__deleteBtn} onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}