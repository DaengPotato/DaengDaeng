import styles from './index.module.scss';

const PetCheckLoading = () => {
  return (
    <div className={styles.petCheck}>
      <div className={styles.pet}></div>
      <div className={styles.pet}></div>
      <div className={styles.pet}></div>
    </div>
  );
};

export default PetCheckLoading;
