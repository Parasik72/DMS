import styles from './MainItem.module.scss';

export const MainItem = ({name, id}) => {
    return (
        <div className={styles.mainItem}>
            <h1>{name}</h1>
            {id && <div>
                <h3>{'(' + id + ')'}</h3>
            </div>}
            
        </div>
    );
}