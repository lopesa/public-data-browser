import styles from "styles/PDBButton.module.scss";

type PDBButtonProps = {
  children?: React.ReactNode;
  dataSubmitType?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const PDBButton = (props: PDBButtonProps) => {
  const { children, dataSubmitType, onClick, style } = props;
  return (
    <button
      style={style}
      data-submit-type={dataSubmitType}
      className={styles.Button}
      onClick={(e) => {
        // e.preventDefault();
        onClick?.();
      }}
    >
      {children}
    </button>
  );
};

export default PDBButton;
