import { useState } from 'react';
import { PopupEditDocs } from '../PopupEditDocs/PopupEditDocs';
import styles from './EditItem.module.scss';

export const EditItem = ({doc}) => {
    const [popupDisplay, setPopupDisplay] = useState(false);
    const handleClick = () => {
        setPopupDisplay(true);
    }
    return (
        <>
            <div className={styles.mainItem} onClick={() => handleClick()}>
                <div className={styles.mainItem__title}><h3>Title:</h3><span>{doc.title}</span></div>
                <div className={styles.mainItem__type}><h3>Type: </h3><span>{doc.type}</span></div>
                <div className={styles.mainItem__owner}><h3>Owner: </h3><span>{doc.owner.firstname + ' ' + doc.owner.lastname}</span></div>
                <div className={styles.mainItem__uploadedBy}><h3>Uploaded by: </h3><span>{doc.uploadedBy.firstname + ' ' + doc.uploadedBy.lastname}</span></div>
            </div>
            {popupDisplay && <PopupEditDocs doc={doc} setPopupDisplay={setPopupDisplay}/>}
        </>
    );
}