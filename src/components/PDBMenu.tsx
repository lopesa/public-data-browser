import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import styles from "styles/PDBMenu.module.scss";
import { Link } from "react-router-dom";
import { selectToken } from "app/User.slice";
import { useAppSelector } from "app/hooks";

const PDBMenu = () => {
  const token = useAppSelector(selectToken);
  return (
    <NavigationMenu.Root className={styles.NavigationMenuRoot}>
      <NavigationMenu.List className={styles.NavigationMenuList}>
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild className={styles.NavigationMenuLink}>
            <Link to="/about">About</Link>
          </NavigationMenu.Link>
          {/* <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
            About <CaretDownIcon className={styles.CaretDown} aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={styles.NavigationMenuContent}>
            
          </NavigationMenu.Content> */}
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            asChild
            className={`${styles.NavigationMenuLink} ${
              token ? styles.loggedIn : ""
            }`}
          >
            <Link to="/bookmarks">Bookmarks</Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <div className={styles.ViewportPosition}>
        <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
      </div>
    </NavigationMenu.Root>
  );
};

export default PDBMenu;
