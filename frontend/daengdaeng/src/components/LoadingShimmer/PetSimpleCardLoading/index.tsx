import styles from './index.module.scss';

const PetSimpleCardLoading = () => {
  return (
    <div className={styles.petSimpleCardLoading}>
      <div className={styles.title}></div>
      <div className={styles.petCardContainer}>
        <div className={styles.petCard}></div>
        <div className={styles.petCard}></div>
      </div>
      <div className={styles.petCardContainer}>
        <div className={styles.petCard}></div>
        <div className={styles.petCard}></div>
      </div>
    </div>
  );
};

export default PetSimpleCardLoading;
