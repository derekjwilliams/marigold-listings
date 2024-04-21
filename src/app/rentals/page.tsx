import { createClient } from '@/lib/supabase/server'

import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import Link from 'next/link'

const rental = stylex.create({
  logo: {
    backgroundColor: 'rgb(255 213 95)',
    padding: '1rem',
  },
  overview: {
    padding: '1rem',
  },
  address: {
    marginBottom: '2rem',
    fontWeight: '700',
  },
  imageContainer: {
    width: '500px',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'relative !important',
  },
})

export default async function Page() {
  const header = (
    <div {...stylex.props(rental.logo)}>
      <Image
        alt='simple logo'
        width={492 / 8}
        height={492 / 8}
        src='/simple_logo.png'
      />
    </div>
  )
  const supabase = createClient()
  supabase
  const { data: listings } = await supabase.from('listings').select(`*`)

  const displayListings = listings?.map((listing) => (
    <div {...stylex.props(rental.overview)} key={listing.id}>
      <Link href={`/rentals/${listing.id}`}>
        <div>
          <div {...stylex.props(rental.address)}>
            {`${listing?.address_1}${listing?.address_2 !== null ? ' ' + listing?.address_2 : ''},  ${listing?.city}, ${listing?.state_province} ${listing?.postal_code}`}
          </div>
          <div {...stylex.props(rental.imageContainer)}>
            <Image
              {...stylex.props(rental.image)}
              width={0}
              height={0}
              fill
              sizes='100vw'
              alt='cover image'
              src={listing.cover_image_url}
            ></Image>
          </div>
        </div>
      </Link>
    </div>
  ))
  return (
    <div>
      {header}
      {displayListings}
    </div>
  )
}
