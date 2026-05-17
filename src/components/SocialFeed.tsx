"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './SocialFeed.module.css';
import { fetchSocialFeed, SocialPost } from '@/actions/social';

export default function SocialFeed() {
  const [activeTab, setActiveTab] = useState<'instagram' | 'tiktok' | 'linkedin'>('instagram');
  const [activePost, setActivePost] = useState<SocialPost | null>(null);
  
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the data from the Server Action
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    
    fetchSocialFeed().then((data) => {
      if (isMounted) {
        setPosts(data);
        setIsLoading(false);
      }
    }).catch(err => {
      console.error("Failed to fetch social feed:", err);
      setIsLoading(false);
    });

    return () => { isMounted = false; };
  }, []);

  const filteredPosts = posts.filter(post => post.platform === activeTab);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={styles.subTitle}>Live Feed</span>
          <h2 className="heading-lg">On <span className="text-gradient">Social Media</span></h2>
          <p className="text-lg" style={{ marginBottom: '2rem' }}>
            Follow Donovan Barker and the FitMind AI ecosystem for real-time coaching telemetry.
          </p>

          <div className={styles.tabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'instagram' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('instagram')}
            >
              📸 Instagram
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'tiktok' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('tiktok')}
            >
              🎵 TikTok
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'linkedin' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('linkedin')}
            >
              👔 LinkedIn
            </button>
          </div>
        </div>

        {/* Premium Masonry Grid */}
        <div className={styles.gridContainer}>
          {isLoading ? (
            // Skeleton Loaders
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))
          ) : (
            filteredPosts.map((post) => (
              <SocialCard key={post.id} post={post} onClick={() => setActivePost(post)} />
            ))
          )}
        </div>

        {/* Action Follow Bar */}
        <div className={styles.followBar}>
          <a 
            href="https://instagram.com/donovanbarker11" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.magneticBtn} ${styles.igBtn}`}
          >
            <span>📸</span> Follow @donovanbarker11
          </a>
          <a 
            href="https://tiktok.com/@djbarker2" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.magneticBtn} ${styles.tiktokBtn}`}
          >
            <span>🎵</span> Follow djbarker2
          </a>
          <a 
            href="https://www.linkedin.com/in/donovan-barker-a32297252/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.magneticBtn} ${styles.linkedinBtn}`}
          >
            <span>👔</span> Connect on LinkedIn
          </a>
        </div>

        {/* Image Detail Viewer Modal */}
        {activePost && (
          <div className={styles.modalOverlay} onClick={() => setActivePost(null)}>
            <div className={`${styles.modalContent} glass-panel`} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setActivePost(null)}>×</button>

              <div className={styles.modalGrid}>
                {/* High-res Image / Video box */}
                <div className={styles.modalImageBox}>
                  {activePost.videoUrl ? (
                    <video 
                      src={activePost.videoUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className={styles.modalVideo}
                    />
                  ) : (
                    <Image 
                      src={activePost.imageUrl} 
                      alt={`${activePost.platform} Post`} 
                      fill 
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Detail Box */}
                <div className={styles.modalDetails}>
                  <div className={styles.profileHeader}>
                    <div className={styles.avatar}>DB</div>
                    <div>
                      <h4 className={styles.channelName}>
                        {activePost.platform === 'instagram' && '@donovanbarker11'}
                        {activePost.platform === 'tiktok' && 'djbarker2'}
                        {activePost.platform === 'linkedin' && 'Donovan Barker'}
                      </h4>
                      <p className={styles.location}>
                        {activePost.platform === 'linkedin' ? 'Founder @ FitMind AI' : 'Donovan Barker'}
                      </p>
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.statsOverview}>
                    <span className={styles.statItem}>❤️ **{activePost.likes}** Likes</span>
                    <span className={styles.statItem}>💬 **{activePost.comments}** Comments</span>
                  </div>

                  <div className={styles.captionBox}>
                    <p className={styles.postCaption}>
                      {activePost.caption}
                    </p>
                  </div>

                  <div className={styles.modalActionRow}>
                    <a 
                      href={activePost.postUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary"
                      style={{ 
                        width: '100%', 
                        textDecoration: 'none', 
                        textAlign: 'center', 
                        display: 'block',
                        background: activePost.platform === 'linkedin' ? '#0a66c2' : undefined 
                      }}
                    >
                      View on {activePost.platform.charAt(0).toUpperCase() + activePost.platform.slice(1)} ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Sub-component for individual Social Cards (handles video hover logic)
function SocialCard({ post, onClick }: { post: SocialPost, onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={styles.gridItem}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={post.imageUrl}
          alt={`FitMind AI ${post.platform} post`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
          className={styles.postImage}
        />

        {/* Hover Auto-Play Video */}
        {post.videoUrl && (
          <video 
            ref={videoRef}
            src={post.videoUrl}
            muted
            playsInline
            loop
            className={styles.hoverVideo}
          />
        )}
        
        {/* Platform Icon Badge */}
        <div className={styles.platformBadge}>
          {post.platform === 'instagram' && '📸'}
          {post.platform === 'tiktok' && '🎵'}
          {post.platform === 'linkedin' && '👔'}
        </div>
        
        {/* Hover Glass Overlay */}
        <div className={styles.overlay}>
          <div className={styles.statRow}>
            <span>❤️ {post.likes}</span>
            <span>💬 {post.comments}</span>
          </div>
          <p className={styles.captionText}>{post.caption}</p>
        </div>
      </div>
    </div>
  );
}
