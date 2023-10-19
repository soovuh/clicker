import styles from '../../styles/components/home page/BigButton.module.scss';

const BigButton = ({ setCounter }) => {
  const handleClick = () => {
    setCounter(prevState => ++prevState);
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
