'use server'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import * as stylex from '@stylexjs/stylex'
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from 'react'

export default async function Page({ params }: { params: { id: string } }) {
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
    <img
      style={{
        objectFit: 'cover',
        boxShadow:
          'rgba(0, 0, 0, 0.5) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
        borderRadius: '0.5rem',
      }}
      key={image.id}
      alt={image.description}
      width={280}
      height={280}
      src={image.url}
    ></img>
  ))
  const description = (
    <div style={{ gridColumn: 'b2 / a6' }}>
      <h2>Building overview</h2>
      <p style={{ margin: '1rem 0 1rem 0' }}>{listing?.description}</p>
      <p style={{ marginTop: '1rem' }}>{listing?.required_legal_statement}</p>
    </div>
  )
  const details = (
    <div style={{ gridColumn: 'a0 / a2' }}>
      <h2 style={{ marginBottom: '2rem', fontWeight: '700' }}>
        {`$${listing?.monthly_rent.toLocaleString()}/mo`}
      </h2>
      <div style={{ marginBottom: '2rem' }}>{listing?.rooms}</div>
      <div style={{ marginBottom: '2rem', fontWeight: '700' }}>
        {`${listing?.address_1} ${listing?.address_2},  ${listing?.city}, ${listing?.state_province} ${listing?.postal_code}`}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3>Highlights</h3>
        <div style={{ margin: '1rem' }}>
          <ul>
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
    <div style={{ backgroundColor: 'rgb(255 213 95)', padding: '1rem' }}>
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
        <div className='compound-grid'>
          {details}
          {description}
          <div
            style={{
              display: 'inline-flex',
              gap: '1rem',
              flexWrap: 'wrap',
              margin: '2rem',
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          justifyContent: 'space-evenly',
          display: 'inline-flex',
          gap: '1rem',
          flexWrap: 'wrap',
          margin: '1rem',
        }}
      >
        {listingImages}
      </div>
    </div>
  )
}
