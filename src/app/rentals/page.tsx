import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: listings } = await supabase
    .from('listings')
    .select(
      'description, postal_code, monthly_rent, rooms, lease_terms, address_1, address_2, city, state_province, required_legal_statement, listing_images(url)'
    )
  return <pre>{JSON.stringify(listings, null, 2)}</pre>
}
