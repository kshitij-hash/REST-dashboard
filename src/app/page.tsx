import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import Location from '@/components/location'
import Testimonials from '@/components/testimonials'
import YourTeacher from '@/components/your-teacher'

export default function Home() {
  return (
    <div className='mt-4'>
      <HeroSection />
      <YourTeacher />
      <Location />
      <Testimonials />
      <Footer />
    </div>
  )
}
