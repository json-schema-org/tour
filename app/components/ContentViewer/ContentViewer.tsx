import styles from "./ContentViewer.module.css";
import Feedback from "../Feedback";
export default function ContentViewer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        {children} <Feedback />
      </div>
    </div>
  );
}
