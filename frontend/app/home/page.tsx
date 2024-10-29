import { Footer } from '@/common/components/organisms';
import { Hero } from './Hero';
import { TrendingProjects } from './TrendingProjects';
import { DevelopmentProcess } from './DevelopmentProcess';

export default function Home () {
  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />
      <TrendingProjects />
      <DevelopmentProcess />
      <Footer />
    </div>
  );
}
