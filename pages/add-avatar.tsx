import styles from '../styles/Home.module.css'
import Uploader from '../components/Uploader/Uploader';

export default function AddAvatar() {
    return (
        <div>
            <div className={styles.container}>
                <Uploader />
            </div>
        </div>
    );
}