import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className='menu' role='navigation' aria-label='main navigation'>
      <ul>
        <li>
          <Link href='/rentals'>Rentals</Link>
        </li>
        <li>
          <Link href='/about'>About Us</Link>
        </li>
      </ul>
    </nav>
  )
}
