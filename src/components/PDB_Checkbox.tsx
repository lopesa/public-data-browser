import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import styles from "styles/PDBCheckbox.module.scss";

interface PDBCheckboxProps {
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

const PDBCheckbox = ({ onCheckedChange, label }: PDBCheckboxProps) => (
  <form>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox.Root
        onCheckedChange={onCheckedChange}
        className={styles.CheckboxRoot}
        id="c1"
      >
        <Checkbox.Indicator className={styles.CheckboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className={styles.CheckboxLabel} htmlFor="c1">
        {label}
      </label>
    </div>
  </form>
);

export default PDBCheckbox;
