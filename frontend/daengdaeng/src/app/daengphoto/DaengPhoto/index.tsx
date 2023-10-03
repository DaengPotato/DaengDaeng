import styles from './index.module.scss';
import PhotoCamera from './PhotoCamera';
import PhotoPage from './PhotoPage';

const DaengPhoto = async () => {
  return (
    <div>
      <div>{<PhotoCamera />}</div>
      <div className={styles.container}>
        <div className={styles.photoList}>
          {[...Array(10).keys()].map((num) => (
            <div key={num} className={styles.photo}>
              {num + 1}
            </div>
          ))}
        </div>
        <div className={styles.pagebutton}>
          <PhotoPage />
        </div>
      </div>
    </div>
  );
};
export default DaengPhoto;
