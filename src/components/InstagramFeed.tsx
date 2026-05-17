"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './InstagramFeed.module.css';

interface IGPost {
  id: number;
  imageUrl: string;
  likes: string;
  comments: string;
  caption: string;
  instagramUrl: string;
}

const INSTAGRAM_POSTS: IGPost[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    likes: '1,420',
    comments: '88',
    caption: 'Kinetic chain alignment during maximum load hypertrophy regimes. Perfect exercise form is the difference between injury and elite physical adaptations.',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
    likes: '912',
    comments: '34',
    caption: 'Lyophilized TB-500 synthesis, peptide reconstitution formulas, and in-vitro laboratory storage guidelines explained.',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    likes: '2,104',
    comments: '142',
    caption: 'Uncompromising standard: 400GSM heavy organic loopback knit structure. Built for thermal stability and high-end styling. Shop the FitMind Shop.',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop',
    likes: '1,560',
    comments: '95',
    caption: 'Next-Generation Coaching Dashboard: Helping learners discover correct form while enabling external coaches to host custom workout networks.',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop',
    likes: '834',
    comments: '29',
    caption: 'Behavioral conditioning, habit triggers, and dopamine-reward pathway mapping in athletic hypertrophy coaching.',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop',
    likes: '3,290',
    comments: '241',
    caption: 'Master the contraction, eliminate momentum. Download the FitMind AI mobile application for instant exercise analysis.',
    instagramUrl: 'https://instagram.com'
  }
];

export default function InstagramFeed() {
  const [activePost, setActivePost] = useState<IGPost | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={styles.subTitle}>Social Feed</span>
          <h2 className="heading-lg">On <span className="text-gradient">Instagram</span></h2>
          <p className="text-lg">Follow Donovan Barker and the FitMind AI ecosystem for real-time coaching telemetry.</p>
        </div>

        {/* Fluid Auto-Adjusting Spaced Grid */}
        <div className={styles.gridContainer}>
          {INSTAGRAM_POSTS.map((post) => (
            <div 
              key={post.id} 
              className={styles.gridItem}
              onClick={() => setActivePost(post)}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={post.imageUrl}
                  alt="FitMind AI Instagram post"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.postImage}
                />
                
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
          ))}
        </div>

        {/* Action Follow Bar */}
        <div className={styles.followBar}>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <span>📸</span> Follow @fitmind.ai
          </a>
        </div>

        {/* Image Detail Viewer Modal */}
        {activePost && (
          <div className={styles.modalOverlay} onClick={() => setActivePost(null)}>
            <div className={`${styles.modalContent} glass-panel`} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setActivePost(null)}>×</button>

              <div className={styles.modalGrid}>
                {/* High-res Image box */}
                <div className={styles.modalImageBox}>
                  <Image 
                    src={activePost.imageUrl} 
                    alt="Instagram Post" 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Detail Box */}
                <div className={styles.modalDetails}>
                  <div className={styles.profileHeader}>
                    <div className={styles.avatar}>FM</div>
                    <div>
                      <h4 className={styles.channelName}>fitmind.ai</h4>
                      <p className={styles.location}>Donovan Barker • Founder</p>
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
                      href={activePost.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary"
                      style={{ width: '100%', textDecoration: 'none', textAlign: 'center', display: 'block' }}
                    >
                      View on Instagram ↗
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
