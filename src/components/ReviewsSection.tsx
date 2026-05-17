import Image from 'next/image';
import styles from './ReviewsSection.module.css';

const reviews = [
  {
    id: 1,
    name: 'Marcus Vance',
    role: 'Elite Athlete',
    rating: 5,
    text: 'FitMind AI has completely transformed how I track my training. The networking side lets me stay connected with other top-tier athletes.',
  },
  {
    id: 2,
    name: 'Coach Sarah Miller',
    role: 'Personal Trainer',
    rating: 5,
    text: 'A safe space for trainers that actually works. My clients love the value-added AI workouts, and I can manage everything in one clean hub.',
  },
  {
    id: 3,
    name: 'David K.',
    role: 'Fitness Enthusiast',
    rating: 4,
    text: 'The exercises are explained with absolute scientific clarity. Best fitness ecosystem I have ever invested in.',
  },
  {
    id: 4,
    name: 'Elena Rostova',
    role: 'Strength Coach',
    rating: 5,
    text: 'Outstanding platform! The affiliate store links are incredibly fast, and the community aspect keeps my clients highly motivated.',
  },
  {
    id: 5,
    name: 'Jonathan Reynolds',
    role: 'Competitive Bodybuilder',
    rating: 5,
    text: 'Perfect combination of exercise science, community support, and clinical supplements. Highly recommend FitMind AI to everyone.',
  },
];

export default function ReviewsSection() {
  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <div className={styles.videoCol}>
          <div className={styles.videoWrapper}>
            <video 
              className={styles.videoPlayer}
              src="https://assets.mixkit.co/videos/preview/mixkit-man-holding-dumbbells-in-a-gym-40502-large.mp4"
              poster="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className={styles.videoOverlay}>
              <span className={styles.videoBadge}>FitMind AI In Action</span>
            </div>
            
            <div className={styles.centerBrandOverlay}>
              <Image 
                src="/assets/fitmindai.png" 
                alt="FitMind AI Logo" 
                width={160} 
                height={45} 
                style={{ height: 'auto' }}
                className={styles.centerLogo}
              />
              <div className={styles.playButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reviewsCol}>
          <div className={styles.reviewsHeader}>
            <h2 className="heading-md">Trusted By The <span className="text-gradient">Best</span></h2>
            <p className="text-sm text-gray">Real feedback from athletes and coaches in our network.</p>
          </div>
          
          <div className={styles.scrollContainer}>
            <div className={styles.scrollTrack}>
              {/* Duplicate reviews to make continuous scrolling loop */}
              {[...reviews, ...reviews].map((review, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div>
                      <h4 className={styles.reviewerName}>{review.name}</h4>
                      <span className={styles.reviewerRole}>{review.role}</span>
                    </div>
                    <div className={styles.stars}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className={styles.star}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className={styles.reviewText}>"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
