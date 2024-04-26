'use server'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import * as stylex from '@stylexjs/stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { borders } from '@stylexjs/open-props/lib/borders.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { marigoldColors } from '../../../app/customStyles/marigoldColors.stylex'

const imageSize = 220
const aspectRatio = 1.6
const logoSize = 492 / 8
const space = sizes.spacing3

const rental = stylex.create({
  logo: {
    backgroundColor: `${marigoldColors.flowerYellow}`,
    padding: sizes.spacing3,
  },
  propertyInformation: {
    display: 'grid',
    gridTemplateColumns:
      '[a0] 1fr [a1] 4fr [a2] 1fr [b2] 3fr [a3] 2fr [b3] 2fr [a4] 3fr [b4] 1fr [a5] 4fr [a6]',
    gridColumnGap: sizes.fluid1,
    gridRowGap: sizes.fluid2,
    margin: space,
    padding: space,
  },
  mediaScroller: {
    display: 'grid',
    gap: `0 ${space} ${space}`,
    padding: space,
    gridAutoFlow: 'column',
    gridAutoColumns: {
      default: '22%',
      '@media (max-width: 800px)': '70%',
      '@media (max-width: 1400px)': '30%',
    },
    overflowX: 'auto',
    backgroundColor: colors.gray3,
    overscrollBehavior: 'contain',
  },
  mediaElement: {
    display: 'grid',
    gridTemplateRows: 'min-content',
    margin: `${space} ${sizes.spacing1}`,
    borderRadius: borders.radius3,
  },
  image: {
    inlineSize: '100%',
    aspectRatio: 1.5,
    objectFit: 'cover',
    layout: 'fixed',
    width: '100%',
    height: 'auto',
  },
  details: {
    gridColumn: 'a0 / a3',
  },
  overview: {
    gridColumn: 'a3 / a6',
  },
  description: {
    margin: space,
  },
  legal: {
    margin: space,
  },
  rooms: {
    marginBottom: sizes.spacing6,
  },
  heading: {
    fontWeight: fonts.weight7,
    marginBottom: sizes.spacing6,
  },
  address: {
    marginBottom: sizes.spacing6,
    fontWeight: fonts.weight7,
  },
  highlights: {
    marginBottom: space,
  },
  highlightsList: {
    margin: '0',
    marginLeft: sizes.spacing2,
    lineHeight: sizes.spacing6,
    paddingInlineStart: 0,
    overflowWrap: 'break-word',
  },
})

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: listing } = await supabase
    .from('listings')
    .select(
      'description, features, monthly_rent, rooms, lease_terms, address_1, address_2, city, state_province, postal_code, required_legal_statement, listing_images(id, url, description)',
    )
    //.limit(5, { referencedTable: 'listing_images' })// if we want to limit number of images, //see https://supabase.com/docs/reference/javascript/limit?queryGroups=example&example=on-a-referenced-table
    .eq('id', params.id)
    .throwOnError()
    .single()

  const listingImages = listing?.listing_images?.map((image) => (
    <div key={image.id} {...stylex.props(rental.mediaElement)}>
      <Image
        {...stylex.props(rental.image)}
        alt={image.description}
        width={imageSize * aspectRatio}
        height={imageSize}
        src={image.url}
        loading='lazy'
      ></Image>
    </div>
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
        <div
          {...stylex.props(rental.heading)}
        >{`$${listing?.monthly_rent.toLocaleString()}/mo`}</div>
      </h2>
      <div {...stylex.props(rental.rooms)}>{listing?.rooms}</div>
      <div {...stylex.props(rental.address)}>
        {`${listing?.address_1}${listing?.address_2 !== null ? ' ' + listing?.address_2 : ''},  ${listing?.city}, ${listing?.state_province} ${listing?.postal_code}`}
      </div>
      <div {...stylex.props(rental.highlights)}>
        <h3>Highlights</h3>
        <div>
          <ul {...stylex.props(rental.highlightsList)}>
            {listing?.features.map((feature: string, index: string) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  const header = (
    <div {...stylex.props(rental.logo)}>
      <Image
        alt='simple logo'
        width={logoSize}
        height={logoSize}
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
      <div {...stylex.props(rental.mediaScroller)}>{listingImages}</div>
    </div>
  )
}
