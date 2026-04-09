import React from 'react'
import Banner from './components/banner'
import FeaturedBooks from './components/featured_books'
import Announcements from './components/announcements'
import NewBooks from './components/news_books'

const Home:React.FC = () => {
  return (
    <div className='container mx-auto flex flex-col gap-y-5'>
      <Banner />
      <FeaturedBooks />
      <NewBooks />
      <Announcements />
    </div>
  )
}

export default Home
