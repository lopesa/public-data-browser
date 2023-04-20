import React from "react";
import styles from "styles/PDBButton.module.scss";

type PDBButtonProps = {
  children?: React.ReactNode;
  dataSubmitType?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

/**
 * have run into this forwardref issue a couple times now and
 * end up back at this page to solve
 * https://github.com/radix-ui/primitives/issues/953
 * this is when the parent of a React component is a Radix component
 * and uses asChild
 */

const PDBButton = React.forwardRef<HTMLButtonElement, PDBButtonProps>(
  (
    { children, dataSubmitType, onClick: passedOnClick, style }: PDBButtonProps,
    ref
  ) => {
    return (
      <button
        style={style}
        data-submit-type={dataSubmitType}
        className={styles.Button}
        onClick={passedOnClick && passedOnClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default PDBButton;
