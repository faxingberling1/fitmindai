import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoTicker from "@/components/LogoTicker";
import AboutSection from "@/components/AboutSection";
import ScienceSection from "@/components/ScienceSection";
import EcommerceSection from "@/components/EcommerceSection";
import ReviewsSection from "@/components/ReviewsSection";
import AppProgressSection from "@/components/AppProgressSection";
import TrainingSection from "@/components/TrainingSection";
import MediaSection from "@/components/MediaSection";
import InstagramFeed from "@/components/InstagramFeed";
import AppDownloadSection from "@/components/AppDownloadSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <HeroSection />
        <LogoTicker />
        <AboutSection />
        <ScienceSection />
        <EcommerceSection />
        <ReviewsSection />
        {/* <AppProgressSection /> */}
        <TrainingSection />
        <MediaSection />
        <InstagramFeed />
        <AppDownloadSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
