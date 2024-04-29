import Header from '@/components/Header'
import stylex from '@stylexjs/stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'

const pageStyle = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: '5rem',
    alignItems: 'center',
    width: '100%',
    color: colors.gray9,
    fontSize: '16px',
  },
})
const pageNav = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottomWidth: '1px',
    width: '100%',
    height: '4rem',
  },
})
const pageNavContent = stylex.create({
  base: {
    display: 'flex',
    padding: '0.75rem',
    justifyContent: 'space-between',
    maxWidth: '56rem',
    alignItems: 'flex-end',
  },
})

const pageHeaderContainer = stylex.create({
  base: {
    display: 'flex',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: '5rem',
    maxWidth: '56rem',
    // opacity: 0
  },
})

const pageMain = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: '1.5rem',
  },
})

const pageFooter = stylex.create({
  base: {
    display: 'flex',
    padding: '2rem',
    justifyContent: 'center',
    borderTopWidth: '1px',
    width: '100%',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    textAlign: 'center',
  },
})

export default async function Index() {
  return (
    <div className={stylex(pageStyle.base)}>
      <nav className={stylex(pageNav.base)}>
        <div className={stylex(pageNavContent.base)}></div>
      </nav>
      <div className={stylex(pageHeaderContainer.base)}>
        <Header />
        <main className={stylex(pageMain.base)}>
          {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        </main>
      </div>
      <footer className={stylex(pageFooter.base)}></footer>
    </div>
  )
}

// import Image from 'next/image'
// import styles from './page.module.css'

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>Marigold Rental Listings</p>
//         <div>
//           <a
//             href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             By{' '}
//             <Image
//               src='/vercel.svg'
//               alt='Vercel Logo'
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src='/next.svg'
//           alt='Next.js Logo'
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className={styles.grid}>
//         <a
//           href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//           className={styles.card}
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           <h2>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p>Find in-depth information about Next.js features and API.</p>
//         </a>

//         <a
//           href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//           className={styles.card}
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           <h2>
//             Learn <span>-&gt;</span>
//           </h2>
//           <p>Marigold Rental Listings</p>
//         </a>

//         <a
//           href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//           className={styles.card}
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           <h2>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p>Explore starter templates for Next.js.</p>
//         </a>

//         <a
//           href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//           className={styles.card}
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           <h2>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
