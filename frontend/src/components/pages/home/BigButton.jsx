import styles from '../../../styles/components/pages/home/BigButton.module.scss';

const BigButton = ({ updateClicks }) => {
  const handleClick = () => {
    updateClicks(prevState => ({ ...prevState, clicks: ++prevState.clicks }));
  };

  return (
    <span className={styles.base}>
      <button className={styles.pushable} onClick={handleClick}>
        <span className={styles.shadow}></span>
        <span className={styles.edge}></span>
        <span className={styles.front}>Push me</span>
      </button>
    </span>
  );
};

export default BigButton;
