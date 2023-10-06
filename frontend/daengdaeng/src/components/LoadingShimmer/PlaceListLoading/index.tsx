import styles from './index.module.scss';

const PlaceListLoading = () => {
  return (
    <div className={styles.placeList}>
      <div className={styles.placeListHeader}></div>
      <div className={styles.place}></div>
    </div>
  );
};

export default PlaceListLoading;
