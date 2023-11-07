import styles from '../../../styles/components/pages/home/BigButton.module.scss';

const BigButton = ({ children, onClick }) => {
  const handleClick = () => {
    onClick(prevState => ({ ...prevState, clicks: ++prevState.clicks }));
  };

  return (
    <span className={styles.base}>
      <button className={styles.pushable} onClick={handleClick}>
        <span className={styles.shadow}></span>
        <span className={styles.edge}></span>
        <span className={styles.front}>{children}</span>
      </button>
    </span>
  );
};

export default BigButton;
