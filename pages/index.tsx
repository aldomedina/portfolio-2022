import classNames from "classnames";
import Head from "next/head";
import FaceScene from "../components/FaceScene";
import { ibm } from "../styles/fonts";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aldo Medina - Portfolio</title>
        <meta
          name="description"
          content="Portfolio Aldo Medina, Front-end developer and designer based in Lisbon"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classNames(styles.main, ibm.className)}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1 className={styles.h1}>ALDO </h1>
          </div>
          <div className={styles.bio}>
            <p>
              Designer and Front-end developer, currently focusing in web-based
              3d graphics and web3 development.
            </p>
          </div>
        </div>
        <FaceScene />
        <a
          className={styles.link}
          href="https://www.instagram.com/aldo.dev.des/"
        >
          → IG
        </a>
      </main>
    </>
  );
}
