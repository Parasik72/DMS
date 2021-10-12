import { useDocs } from '../../../../actions/docs';
import styles from './PopupDocsItem.module.scss';

export const PopupDocsItem = ({doc, setPopupDisplay}) => {
    const {download} = useDocs();
    const hidePopup = () => {
        const popup = document.getElementById('mainPopup');
        popup.style.transition = "0.2s";
        window.requestAnimationFrame(() => popup.style.opacity = 0);
        setTimeout(() => {
            setPopupDisplay(false);
        }, 200);
    }
    const handleDownload = e => {
        e.preventDefault();
        e.stopPropagation();
        download(doc);
    }
    return (
        <div id="mainPopup" className={styles.mainPopup} onMouseDown={hidePopup}>
            <div className={styles.mainPopup__body} onMouseDown={e => {e.preventDefault(); e.stopPropagation()}}>
                <div className={styles.mainPopup__item}>
                    <h1>{doc.title}</h1>
                </div>
                <div className={styles.mainPopup__item}>
                    <h3>Type: {doc.type}</h3>
                </div>
                <div className={styles.mainPopup__item}>
                    <h3>Owner: {doc.owner?.firstname + " " + doc.owner?.lastname}</h3>
                </div>
                <div className={styles.mainPopup__item}>
                    <h3>Uploaded by: {doc.uploadedBy?.firstname + " " + doc.uploadedBy?.lastname}</h3>
                </div>
                <div className={styles.mainPopup__item}>
                    <button onClick={handleDownload}>Download document</button>
                </div>
            </div>
        </div>
    );
}