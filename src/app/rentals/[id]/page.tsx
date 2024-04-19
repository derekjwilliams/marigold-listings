'use server'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import * as stylex from '@stylexjs/stylex'
import { Key } from 'react'

const rental = stylex.create({
  logo: {
    backgroundColor: 'rgb(255 213 95)', padding: '1rem'
  },
  propertyInformation: {
      display: 'grid',
      gridTemplateColumns: '[a0] 1fr [a1] 4fr [a2] 1fr [b2] 3fr [a3] 2fr [b3] 2fr [a4] 3fr [b4] 1fr [a5] 4fr [a6]',
      gridColumnGap: '0.5vw',
      gridRowGap: '1vh',
      margin: '1rem',
  },
  image: {
    objectFit: 'cover',
    boxShadow:
          'rgba(0, 0, 0, 0.5) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
    borderRadius: '0.5rem',
    margin: 20   
  },
  images: {
    justifyContent: 'space-evenly',
    display: 'inline-flex',
    gap: '1rem',
    flexWrap: 'wrap',
    margin: '1rem',
  },
  overview: {
    gridColumn: 'b2 / a6'
  },
  description: {
    margin: '1rem 0 1rem 0'
  },
  legal: {
    marginTop: '1rem'
  },
  details: {
    gridColumn: 'a0 / a2'
  },
  rooms: {
    marginBottom: '2rem'
  },
  heading: {
    fontWeight: '700',
    marginBottom: '2rem'
  },
  address: {
    marginBottom: '2rem', fontWeight: '700'
  },
  highlights: {
    marginBottom: '1rem'
  },
  highlightsList: {
      margin: '1rem'
  },
})


export default async function Page({ params }: { params: { id: string } }) {
  const aspectRatio = 1.5
  const supabase = createClient()
  const { data: listing } = await supabase
    .from('listings')
    .select(
      'description, features, monthly_rent, rooms, lease_terms, address_1, address_2, city, state_province, postal_code, required_legal_statement, listing_images(id, url, description)'
    )
    .eq('id', params.id)
    .throwOnError()
    .single()

  const listingImages = listing?.listing_images?.map((image) => (
    <Image
    {...stylex.props(rental.image)}
      key={image.id}
      alt={image.description}
      width={250 * aspectRatio}
      height={250}
      src={image.url}
    ></Image>
  ))

  const overview = (
    <div {...stylex.props(rental.overview)}>
      <h2>Building overview</h2>
      <p {...stylex.props(rental.description)}>{listing?.description}</p>
      <p {...stylex.props(rental.legal)}>{listing?.required_legal_statement}</p>
    </div>
  )

  const details = (
    <div {...stylex.props(rental.details)}>
      <h2 {...stylex.props(rental.heading)}>
        <div {...stylex.props(rental.heading)}>{`$${listing?.monthly_rent.toLocaleString()}/mo`}</div>
      </h2>
      <div {...stylex.props(rental.rooms)}>{listing?.rooms}</div>
      <div {...stylex.props(rental.address)}>
        {`${listing?.address_1} ${listing?.address_2},  ${listing?.city}, ${listing?.state_province} ${listing?.postal_code}`}
      </div>
      <div {...stylex.props(rental.highlights)}>
        <h3>Highlights</h3>
        <div>
          <ul {...stylex.props(rental.highlightsList)}>
            {listing?.features.map(
              (
                feature: string | null | undefined,
                index: Key | null | undefined
              ) => (
                <li key={index}>{feature}</li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  )

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
  return (
    <div>
      <div>
        {header}
        <div {...stylex.props(rental.propertyInformation)}>
          {details}
          {overview}
        </div>
      </div>
      <div {...stylex.props(rental.images)}>
        {listingImages}
      </div>
    </div>
  )
}
