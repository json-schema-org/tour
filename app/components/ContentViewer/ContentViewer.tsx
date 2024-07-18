import styles from "./ContentViewer.module.css";

export default function ContentViewer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
