"use client";
import styles from "./page.module.css";
import JsonIcon from "@/public/icons/json-schema-blue.png";

export default function Home() {
	return (
		<div className={styles.main}>
			<div className={styles.wrapper}>
				<div className={styles.iconAndTitle}>
					<img
						alt="logo"
						src={JsonIcon.src}
						style={{ width: "64px", height: "64px" }}
					/>
					<div className={styles.title}>
						<div>Tour of</div>
						<div>JSON</div>
						<div>Schema</div>
					</div>
				</div>
				<div className={styles.subtitleWrapper}>
					<div className={styles.subtitle}>
						Learn JSON Schema by Examples.
					</div>
					Work in progress.
				</div>
			</div>
		</div>
	);
}
