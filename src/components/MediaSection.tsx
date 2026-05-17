"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './MediaSection.module.css';

interface VideoItem {
  id: number;
  title: string;
  duration: string;
  views: string;
  uploadedAt: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  description: string;
}

const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: 'The Biomechanics of Hypertrophy: Kinetic Load Distribution',
    duration: '14:25',
    views: '124K views',
    uploadedAt: '2 weeks ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // External watch link
    description: 'Deep dive into structural alignment, kinetic chains, and metabolic fatigue triggers to maximize target muscle mechanical tension.'
  },
  {
    id: 2,
    title: 'TB-500 & BPC-157: Clinical Reconstitution & Storage Science',
    duration: '18:10',
    views: '98K views',
    uploadedAt: '1 month ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Explaining HPLC purity parameters, laboratory handling protocols, and safety compliance disclaimers for research peptides.'
  },
  {
    id: 3,
    title: 'Behavioral Conditioning: Neurological Triggers in Elite Coaching',
    duration: '11:45',
    views: '64K views',
    uploadedAt: '3 weeks ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'How to establish high-fidelity training habits, map neurological reward pathways, and conquer psychological roadblocks.'
  },
  {
    id: 4,
    title: 'Nutrition Engineering: Sport-Specific Metabolic Calculations',
    duration: '22:15',
    views: '148K views',
    uploadedAt: '2 months ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Calculating exact macronutrient boundaries, metabolic outputs, and peri-workout nutritional timing for elite athletic alteration.'
  }
];

export default function MediaSection() {
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(124);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  
  // Carousel Index state
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubscribeToggle = () => {
    if (subscribed) {
      setSubscriberCount(prev => prev - 1);
    } else {
      setSubscriberCount(prev => prev + 1);
    }
    setSubscribed(!subscribed);
  };

  // Carousel controls
  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? YOUTUBE_VIDEOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === YOUTUBE_VIDEOS.length - 1 ? 0 : prev + 1));
  };

  // Get active subset of 3 videos for infinite dynamic looping display
  const getVisibleVideos = (): VideoItem[] => {
    const len = YOUTUBE_VIDEOS.length;
    const v1 = YOUTUBE_VIDEOS[currentIndex];
    const v2 = YOUTUBE_VIDEOS[(currentIndex + 1) % len];
    const v3 = YOUTUBE_VIDEOS[(currentIndex + 2) % len];
    return [v1, v2, v3];
  };

  return (
    <section id="videos" className={styles.section}>
      <div className={styles.container}>
        
        {/* YouTube Channel Header Mock */}
        <div className={`${styles.channelBanner} glass-panel`}>
          <div className={styles.bannerBackground}>
            <div className={styles.bannerGridLines}></div>
          </div>
          
          <div className={styles.channelProfile}>
            <div className={styles.avatarWrapper}>
              <Image 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=150&auto=format&fit=crop"
                alt="Donovan Barker avatar"
                width={80}
                height={80}
                className={styles.avatarImage}
              />
            </div>
            
            <div className={styles.channelDetails}>
              <div className={styles.channelNameRow}>
                <h3>FitMind AI</h3>
                <span className={styles.verifiedBadge} title="Verified Channel">✓</span>
              </div>
              <p className={styles.channelStats}>
                @{subscriberCount}K subscribers • {YOUTUBE_VIDEOS.length} featured lessons
              </p>
            </div>

            <div className={styles.bannerActions}>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '10px 18px' }}
              >
                Go to YouTube ↗
              </a>
              <button 
                className={`${styles.subscribeBtn} ${subscribed ? styles.subscribed : ''}`}
                onClick={handleSubscribeToggle}
              >
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        {/* Video Grid Section Header with Sliders */}
        <div className={styles.videoGridHeader}>
          <div>
            <h2 className="heading-md">Educational <span className="text-gradient">Library</span></h2>
            <p className="text-md text-gray">Learn biomechanics, correct execution, metabolic nutrition, and coaching protocols.</p>
          </div>
          
          {/* Navigation Arrows */}
          <div className={styles.carouselControls}>
            <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Previous videos">
              ←
            </button>
            <button className={styles.arrowBtn} onClick={handleNext} aria-label="Next videos">
              →
            </button>
          </div>
        </div>

        {/* Slider track displaying visible items */}
        <div className={styles.carouselContainer}>
          <div className={styles.videoGrid}>
            {getVisibleVideos().map((video) => (
              <div key={video.id} className={styles.videoCard} onClick={() => setActiveVideo(video)}>
                
                {/* Thumbnail Container */}
                <div className={styles.thumbnailContainer}>
                  <Image 
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={styles.thumbnailImage}
                  />
                  <span className={styles.durationBadge}>{video.duration}</span>
                  
                  {/* Play Button Hover Effect */}
                  <div className={styles.thumbnailHoverPlay}>
                    <div className={styles.playIconContainer}>▶</div>
                  </div>
                </div>

                {/* Video Info */}
                <div className={styles.videoInfo}>
                  <div className={styles.videoAvatar}>
                    <Image 
                      src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=80&auto=format&fit=crop"
                      alt="Donovan Barker"
                      width={36}
                      height={36}
                      className={styles.infoAvatar}
                    />
                  </div>
                  <div className={styles.videoText}>
                    <h4 className={styles.videoTitle}>{video.title}</h4>
                    <p className={styles.channelLabel}>FitMind AI</p>
                    <p className={styles.viewsLabel}>{video.views} • {video.uploadedAt}</p>
                    
                    {/* External Redirect Trigger */}
                    <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
                      <a 
                        href={video.youtubeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.youtubeRedirectLink}
                      >
                        Watch on YouTube ↗
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Video Player Modal Popup */}
        {activeVideo && (
          <div className={styles.modalOverlay} onClick={() => setActiveVideo(null)}>
            <div className={`${styles.modalContent} glass-panel`} onClick={(e) => e.stopPropagation()}>
              
              {/* Modal Close */}
              <button className={styles.closeBtn} onClick={() => setActiveVideo(null)}>×</button>

              {/* Video Player Box */}
              <div className={styles.playerWrapper}>
                <div className={styles.simulatedScreen}>
                  <Image 
                    src={activeVideo.thumbnailUrl} 
                    alt={activeVideo.title} 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.videoPlayerControls}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.simulatedPlayText}>Simulating Secure Streaming Feed...</p>
                  </div>
                </div>
              </div>

              {/* Video Metadata */}
              <div className={styles.modalMeta}>
                <div className={styles.modalHeaderRow}>
                  <h3 className={styles.modalTitle}>{activeVideo.title}</h3>
                  
                  {/* YouTube Action */}
                  <a 
                    href={activeVideo.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                    style={{ fontSize: '0.85rem', padding: '10px 20px', flexShrink: 0, textDecoration: 'none' }}
                  >
                    Watch on YouTube ↗
                  </a>
                </div>

                <div className={styles.modalStatsRow}>
                  <span className={styles.modalViews}>{activeVideo.views} • Uploaded {activeVideo.uploadedAt}</span>
                  <span className={styles.youtubeTag}>YouTube Aesthetic Mode</span>
                </div>
                <div className={styles.modalDivider}></div>
                
                {/* Channel Creator Block */}
                <div className={styles.modalCreatorBlock}>
                  <div className={styles.modalCreatorAvatar}>
                    <Image 
                      src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=80&auto=format&fit=crop"
                      alt="Donovan Barker"
                      width={44}
                      height={44}
                      className={styles.creatorAvatarImg}
                    />
                  </div>
                  <div>
                    <h4 className={styles.creatorName}>FitMind AI (Donovan Barker)</h4>
                    <p className={styles.creatorSubs}>@{subscriberCount}K Subscribers</p>
                  </div>
                </div>

                <p className={styles.modalDescription}>
                  {activeVideo.description}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
