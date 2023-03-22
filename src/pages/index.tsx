import Head from 'next/head';
import { Lato } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';
import { FC } from 'react';

const lato = Lato({ subsets: ['latin'], weight: '400' });

interface HomeProps {
  first: number;
  second: number;
}

export const Home: FC<HomeProps> = ({ first, second }) => {
  const firstPokemon = trpc.getPokemonById.useQuery({ id: first });

  if (!firstPokemon.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Which Pokemon is Most Round</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className={`${styles.main} ${lato.className}`}>
        <h1>Which Pokemon is Most Round?</h1>
        <div className={styles.voting_section}>
          <div className={styles.vote_container}>{firstPokemon.data?.name}</div>
          <div className={styles.vote_tag}>Vs</div>
          <div className={styles.vote_container}>{second}</div>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const [first, second] = await getOptionsForVote();

  return {
    props: {
      first,
      second,
    },
  };
}

export default Home;
