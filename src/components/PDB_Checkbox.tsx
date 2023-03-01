import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { blackA, violet } from "@radix-ui/colors";
import styles from "styles/PDBCheckbox.module.scss";

const CheckboxRoot = styled(Checkbox.Root)`
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px ${blackA.blackA7};
  &:hover {
    background-color: ${violet.violet3};
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

const CheckboxIndicator = styled(Checkbox.Indicator)`
  color: var(--violet11);
`;

interface PDBCheckboxProps {
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

const PDBCheckbox = ({ onCheckedChange, label }: PDBCheckboxProps) => (
  <form>
    <div style={{ display: "flex", alignItems: "center" }}>
      <CheckboxRoot
        onCheckedChange={onCheckedChange}
        className={styles.CheckboxRoot}
        id="c1"
      >
        <CheckboxIndicator className={styles.CheckboxIndicator}>
          <CheckIcon />
        </CheckboxIndicator>
      </CheckboxRoot>
      <label className={styles.CheckboxLabel} htmlFor="c1">
        {label}
      </label>
    </div>
  </form>
);

export default PDBCheckbox;
