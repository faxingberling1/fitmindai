"use server";

export interface SocialPost {
  id: number | string;
  platform: 'instagram' | 'tiktok' | 'linkedin';
  imageUrl: string;
  videoUrl?: string; // Support for auto-playing videos
  likes: string;
  comments: string;
  caption: string;
  postUrl: string;
}

// ============================================================================
// ⚠️ API INTEGRATION REQUIRED
// ============================================================================
// To fetch real data, you must replace the mock return below with a fetch request 
// to your chosen Social Media Aggregator API (e.g., Curator.io, RapidAPI).
// 
// Example Real Implementation:
// const res = await fetch('https://api.curator.io/v1/feeds/YOUR_FEED_ID', {
//   headers: { Authorization: `Bearer ${process.env.CURATOR_API_KEY}` },
//   next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limits
// });
// const data = await res.json();
// return data.posts.map(formatPost);
// ============================================================================

const MOCK_DATA: SocialPost[] = [
  // Instagram Posts
  {
    id: 'ig-1',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    likes: '1,420',
    comments: '88',
    caption: 'Kinetic chain alignment during maximum load hypertrophy regimes. Perfect exercise form is the difference between injury and elite physical adaptations.',
    postUrl: 'https://instagram.com/donovanbarker11'
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
    likes: '912',
    comments: '34',
    caption: 'Lyophilized TB-500 synthesis, peptide reconstitution formulas, and in-vitro laboratory storage guidelines explained.',
    postUrl: 'https://instagram.com/donovanbarker11'
  },
  {
    id: 'ig-3',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    likes: '2,104',
    comments: '142',
    caption: 'Uncompromising standard: 400GSM heavy organic loopback knit structure. Built for thermal stability and high-end styling.',
    postUrl: 'https://instagram.com/donovanbarker11'
  },
  
  // TikTok Posts (with video support)
  {
    id: 'tk-1',
    platform: 'tiktok',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2021/08/10/84518-587290197_large.mp4', // Example stock fitness video
    likes: '14.5K',
    comments: '342',
    caption: 'How to actually structure your push day for maximum hypertrophy 🚀 #gym #fitness #bodybuilding',
    postUrl: 'https://tiktok.com/@djbarker2'
  },
  {
    id: 'tk-2',
    platform: 'tiktok',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2024/02/13/200424-912850986_large.mp4',
    likes: '8.2K',
    comments: '129',
    caption: 'Stop making this mistake on lateral raises! 🛑 Try this instead. #workouttips #fitmindai',
    postUrl: 'https://tiktok.com/@djbarker2'
  },
  {
    id: 'tk-3',
    platform: 'tiktok',
    imageUrl: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop',
    likes: '22.1K',
    comments: '890',
    caption: 'The absolute best peptide stack for injury recovery explained in 60 seconds 🧬 #recovery #peptides',
    postUrl: 'https://tiktok.com/@djbarker2'
  },

  // LinkedIn Posts
  {
    id: 'ln-1',
    platform: 'linkedin',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=600&auto=format&fit=crop',
    likes: '4,102',
    comments: '342',
    caption: 'Excited to announce the launch of FitMind AI! We are bridging the gap between elite performance data and accessible coaching algorithms.',
    postUrl: 'https://www.linkedin.com/in/donovan-barker-a32297252/'
  },
  {
    id: 'ln-2',
    platform: 'linkedin',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop',
    likes: '2,890',
    comments: '156',
    caption: 'The future of B2B SaaS in the fitness industry is hardware-agnostic. Here is our technical roadmap for Q3.',
    postUrl: 'https://www.linkedin.com/in/donovan-barker-a32297252/'
  },
  {
    id: 'ln-3',
    platform: 'linkedin',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop',
    likes: '3,450',
    comments: '210',
    caption: 'Great panel discussion today on the integration of biometric sensors into standard athletic apparel.',
    postUrl: 'https://www.linkedin.com/in/donovan-barker-a32297252/'
  }
];

export async function fetchSocialFeed(): Promise<SocialPost[]> {
  // Simulate network latency for API fetch (shows off the Skeleton loaders)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return the mock data until API keys are provided
  return MOCK_DATA;
}
