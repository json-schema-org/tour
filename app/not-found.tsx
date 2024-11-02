import styles from "./styles/404.module.css";
import cx from "classnames";
import { interFont } from "./styles/fonts";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={cx(styles.title, interFont.className)}>
          404 Not Found!
        </h1>
        <p className={styles.message}>
          The page you are looking for does not exist!
        </p>
      </div>
      <Link href={"/"}>
        <Button variant={"default"} borderRadius={"8px"}>
          BACK TO HOME
        </Button>
      </Link>
    </div>
  );
}
