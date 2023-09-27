import { PassThrough } from 'stream';
import styles from './index.module.scss';
import PhotoCamera from './PhotoCamera';

const DaengPhoto = async () => {
  const handleClickCreaePhoto = () => {
   
  };

  return (
    <div>
      <div>
        <PhotoCamera onClick={handleClickCreaePhoto} />
      </div>
      <div className={styles.container}>
        <div className={styles.photoList}>
          {[...Array(10).keys()].map((num) => (
            <div key={num} className={styles.photo}>
              {num + 1}
            </div>
          ))}
        </div>
        <div className={styles.pagebutton}></div>
      </div>
    </div>
  );
};
export default DaengPhoto;
