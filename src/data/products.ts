export interface Product {
  id: number;
  name: string;
  category: 'peptides' | 'apparel' | 'accessories' | 'equipment' | 'nutrition' | 'recovery' | 'training';
  price: number;
  badge: string;
  image: string;
  isAffiliate: boolean;
  affiliateLink?: string;
  description: string;
  details: string[];
  science?: string[];
  usage: string;
  specifications: { [key: string]: string };
}

export const products: Product[] = [
  // ─── PEPTIDES ───────────────────────────────────────────────
  {
    id: 1,
    name: 'BPC-157 Recovery Matrix',
    category: 'peptides',
    price: 89.99,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/bpc157',
    description: 'BPC-157 is a premium synthetic peptide compound sequence consisting of 15 amino acids. Renowned in sports science and orthopedic research, it acts as a powerful healing modulator that triggers rapid angiogenetic tissue reconstruction, accelerating ligament, muscle, and tendon recovery.',
    details: [
      'Accelerates tendon-to-bone healing',
      'Promotes micro-vascular repair (angiogenesis)',
      'Protects and restores gastric mucosa cell integrity',
      'Highly stable and bio-effective compound sequence'
    ],
    science: [
      'Clinical studies demonstrate significant acceleration of collateral ligament healing in rat models.',
      'Promotes cellular migration of fibroblasts and increases collagen deposition structurally.',
      'Demonstrated high stability in human gastric juices compared to other peptide sequences.'
    ],
    usage: 'Research Use Only. Not for direct human consumption. Always consult clinical laboratory protocols for reconstitution and research guidelines.',
    specifications: {
      'Purity': '>99.2% (HPLC Verified)',
      'Sequence': 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
      'Molecular Weight': '1419.5 g/mol',
      'Format': 'Lyophilized Sterile Powder',
      'Storage': 'Store at -20°C (stable up to 2 years)'
    }
  },
  {
    id: 3,
    name: 'TB-500 Performance Blend',
    category: 'peptides',
    price: 95.00,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/tb500',
    description: 'TB-500 is a synthetic fraction of the naturally occurring healing protein Thymosin Beta-4. It acts as a primary actin-sequestering molecule in eukaryotic cells, promoting cell migration, tissue growth, and massive anti-inflammatory cascades inside injured muscular fibers.',
    details: [
      'Promotes cellular migration and tissue regeneration',
      'Drastically reduces acute joint and ligament inflammation',
      'Increases collagen deposition to restore joint elasticity',
      'Synergizes perfectly with BPC-157 protocol suites'
    ],
    science: [
      'Thymosin Beta-4 fractions demonstrate immediate upregulation of wound healing factors in biological matrices.',
      'Stimulates essential actin polymerization, facilitating rapid myofibrillar cellular mobility.'
    ],
    usage: 'Research Use Only. Not for direct human consumption. Always consult laboratory protocols for reconstitution and research guidelines.',
    specifications: {
      'Purity': '>99.5% (HPLC Certified)',
      'Sequence': 'Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser',
      'Molecular Weight': '4963.5 g/mol',
      'Format': 'Lyophilized Sterile Powder',
      'Storage': 'Store under refrigeration at 2°C to 8°C'
    }
  },

  // ─── APPAREL ────────────────────────────────────────────────
  {
    id: 2,
    name: 'FitMind Pro Hoodie',
    category: 'apparel',
    price: 65.00,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    isAffiliate: false,
    description: 'Engineered for high-performance warmups and premium street lifestyle wear. Cut from ultra-heavyweight 400GSM organic cotton loopback, the FitMind Pro Hoodie features structured drop shoulders, double-lined hood insulation, and clean, geometric fit lines.',
    details: [
      'Premium ultra-heavyweight 400GSM organic cotton',
      'Structured double-lined hood with zero drawcords for minimal design',
      'High-durability flatlock seams engineered for heavy training strain',
      'Subtle 3D embroidered FitMind sleeve insignia'
    ],
    science: [
      'Breathable double-face weave provides high thermal retention while allowing moisture ventilation during warmups.',
      'Pre-shrunk organic fibers guarantee form-fitting stability over multiple heavy wash cycles.'
    ],
    usage: 'Machine wash cold inside out. Hang dry or tumble dry low. Do not iron direct embroidery.',
    specifications: {
      'Material': '100% Organic Loopback Cotton',
      'Weight': '400 GSM (Heavyweight)',
      'FitType': 'Oversized Athletic Crop',
      'Origin': 'Sustainably Crafted in Portugal',
      'Sizing': 'True to size (size up for highly oversized fit)'
    }
  },
  {
    id: 10,
    name: 'FitMind Compression Shorts',
    category: 'apparel',
    price: 38.00,
    badge: 'Training Essential',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop',
    isAffiliate: false,
    description: 'High-performance compression shorts engineered for maximum muscle support during intense lower-body training sessions. Features moisture-wicking 4-way stretch fabric and anatomical panel seaming for unrestricted movement.',
    details: [
      '4-way stretch performance nylon-spandex blend',
      'Targeted compression zones for quad and glute support',
      'Anti-chafe flatlock seams for long session comfort',
      'Deep waistband pocket for secure phone storage'
    ],
    usage: 'Machine wash cold. Hang dry only. Do not bleach.',
    specifications: {
      'Material': '82% Nylon / 18% Spandex',
      'Compression': 'Graduated 20-30 mmHg',
      'Length': '7-inch inseam',
      'Waistband': 'Wide non-roll elastic',
      'Sizing': 'XS – 3XL'
    }
  },

  // ─── ACCESSORIES ────────────────────────────────────────────
  {
    id: 4,
    name: 'Tactical Gym Duffel',
    category: 'accessories',
    price: 45.00,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    isAffiliate: false,
    description: 'Built to survive the most intense athletic travels. Features ultra-durable 1000D ballistic nylon construction, heavy-duty YKK double-zippers, and water-resistant separated pockets for damp training shoes or sweaty gear.',
    details: [
      'Ultra-durable 1000D Ballistic Cordura Nylon shell',
      'Dual separated ventilated pockets for shoes/dirty apparel',
      'Tactical MOLLE webbing loops for customized modular add-ons',
      'Ergonomic padded neoprene shoulder strap system'
    ],
    usage: 'Wipe clean with a damp cloth. Hand wash only if heavily soiled. Air dry only.',
    specifications: {
      'Material': '1000D Ballistic Cordura Nylon',
      'Volume': '45 Liters',
      'Zippers': 'Waterproof Sealed YKK',
      'Weight Capacity': '65 lbs / 30 kg',
      'Dimensions': '22" L x 11" W x 11" H'
    }
  },

  // ─── EQUIPMENT ──────────────────────────────────────────────
  {
    id: 5,
    name: 'Adjustable Dumbbell Set',
    category: 'equipment',
    price: 199.99,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/dumbbells',
    description: 'Space-saving adjustable dumbbell system replacing 15 sets of weights in a single compact unit. Fast-dial weight selection from 5 lbs to 52.5 lbs in 2.5 lb increments — purpose-built for elite home gym setups.',
    details: [
      'Replaces 15 sets — adjusts from 5 to 52.5 lbs per dumbbell',
      'Patented dial-a-weight system changes load in seconds',
      'Contoured non-slip grip handle with knurled texture',
      'Compact tray storage for organized gym space'
    ],
    usage: 'Store in the included tray when not in use. Do not drop from height. Inspect dial mechanism before each session.',
    specifications: {
      'Weight Range': '5 – 52.5 lbs per dumbbell',
      'Increments': '2.5 lb',
      'Material': 'Steel plates with ABS dial housing',
      'Handle Length': '15.75 inches',
      'Tray Dimensions': '16.9" x 8.3" x 9"'
    }
  },
  {
    id: 6,
    name: 'Olympic Barbell 7ft 20kg',
    category: 'equipment',
    price: 175.00,
    badge: 'Pro Grade',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/barbell',
    description: 'Institutional-grade Olympic barbell machined from high-tensile steel with premium zinc coating. Rated for powerlifting, Olympic weightlifting, and CrossFit workloads up to 1500 lbs.',
    details: [
      'High-tensile 190,000 PSI steel shaft',
      'Premium zinc coating for rust and sweat resistance',
      'Aggressive dual-knurl pattern for secure lockout grip',
      'Needle-bearing sleeve rotation for clean Olympic lifts'
    ],
    usage: 'Load plates evenly. Inspect collars before use. Wipe down with dry cloth after sessions.',
    specifications: {
      'Length': '7 ft (2.2m)',
      'Shaft Diameter': '28mm',
      'Weight': '20 kg / 44 lbs',
      'Tensile Strength': '190,000 PSI',
      'Load Rating': '1,500 lbs'
    }
  },
  {
    id: 7,
    name: 'Resistance Band Set (5pc)',
    category: 'equipment',
    price: 34.99,
    badge: 'Mobility Essential',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/bands',
    description: 'Professional-grade looped resistance bands engineered from 100% natural latex for maximum durability. Set of 5 progressive resistance levels for warm-up mobility, assisted pull-ups, and advanced banded compound lifts.',
    details: [
      'Set of 5 progressive bands (15–200 lbs resistance)',
      '100% natural latex for superior elasticity and longevity',
      'Anti-snap reinforced band edges for safe heavy loading',
      'Full body versatility: pull-ups, squats, hip thrusts, rows'
    ],
    usage: 'Inspect for tears before use. Avoid sharp edges. Store away from direct sunlight.',
    specifications: {
      'Material': '100% Natural Latex',
      'Resistance Range': '15 – 200 lbs',
      'Widths': '1/2", 7/8", 1.25", 1.75", 2.5"',
      'Length': '41 inches looped',
      'Includes': 'Carry bag + exercise guide'
    }
  },

  // ─── NUTRITION ──────────────────────────────────────────────
  {
    id: 8,
    name: 'Whey Protein Isolate 5lb',
    category: 'nutrition',
    price: 69.99,
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/whey',
    description: 'Ultra-pure cold-processed whey protein isolate delivering 27g of protein per serving with minimal fat, lactose, and carbohydrates. Third-party certified for banned substance compliance.',
    details: [
      '27g pure whey isolate protein per serving',
      'Cold-processed to preserve natural growth factors',
      'Less than 1g fat and 2g carbs per serving',
      'NSF Certified for Sport — banned substance tested'
    ],
    usage: 'Mix 1 scoop with 6-8 oz cold water or milk. Consume within 30 minutes post-workout or between meals.',
    specifications: {
      'Protein Per Serving': '27g',
      'Serving Size': '32g (1 scoop)',
      'Servings': '71',
      'Calories': '120 kcal per serving',
      'Certification': 'NSF Certified for Sport'
    }
  },
  {
    id: 9,
    name: 'Creatine Monohydrate 500g',
    category: 'nutrition',
    price: 29.99,
    badge: 'Science-Backed',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/creatine',
    description: 'Pharmaceutical-grade micronized creatine monohydrate — the most researched performance supplement in sports science. Increases phosphocreatine stores to drive explosive ATP regeneration during max-effort lifts.',
    details: [
      '5g pure micronized creatine per serving',
      'Pharmaceutical-grade — zero fillers, additives, or flavors',
      'Increases ATP resynthesis for explosive power output',
      'Over 500 peer-reviewed clinical studies supporting efficacy'
    ],
    usage: 'Mix 5g (1 teaspoon) into water, juice, or protein shake. Take daily — timing flexible (pre or post-workout).',
    specifications: {
      'Type': 'Creatine Monohydrate (Micronized)',
      'Serving Size': '5g',
      'Servings': '100',
      'Purity': '>99.9%',
      'Flavoring': 'Unflavored'
    }
  },

  // ─── RECOVERY ───────────────────────────────────────────────
  {
    id: 11,
    name: 'Percussion Massage Gun Pro',
    category: 'recovery',
    price: 129.99,
    badge: 'Recovery Essential',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/massagegun',
    description: 'Professional percussion therapy device delivering deep muscle tissue treatment at up to 3200 RPM. Accelerates blood flow, reduces DOMS, and speeds up post-training recovery significantly.',
    details: [
      '6 interchangeable attachment heads for targeted muscle groups',
      '5 adjustable speed settings up to 3200 RPM',
      'Ultra-quiet brushless motor (<45dB at full power)',
      '6-hour battery life on a single USB-C charge'
    ],
    usage: 'Apply to target muscle 1-2 minutes per area. Avoid bony prominences and joints. Use 2-3 times daily post-workout.',
    specifications: {
      'Speed': '1200 – 3200 RPM',
      'Noise Level': '<45 dB',
      'Battery': '2500 mAh (6-hour runtime)',
      'Amplitude': '12mm',
      'Attachments': '6 interchangeable heads'
    }
  },
  {
    id: 12,
    name: 'High-Density Foam Roller 36"',
    category: 'recovery',
    price: 24.99,
    badge: 'Mobility Must-Have',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
    isAffiliate: false,
    description: 'Professional 36-inch EVA high-density foam roller for myofascial release, deep tissue massage, and pre/post-workout mobility work. Maintains shape through thousands of compression cycles.',
    details: [
      'Extra-firm high-density EVA foam — never goes flat',
      'Textured grid surface targets trigger points and fascia',
      'Full 36-inch length for thoracic spine and IT band work',
      'Hollow core design for lightweight travel and storage'
    ],
    usage: 'Roll slowly over target areas, pausing 20-30 seconds on tight spots. Use before and after training sessions.',
    specifications: {
      'Dimensions': '36" x 6" diameter',
      'Material': 'High-density EVA foam',
      'Weight Capacity': '300 lbs',
      'Surface': 'Textured grid pattern',
      'Core': 'Hollow ABS plastic tube'
    }
  },

  // ─── TRAINING GEAR ──────────────────────────────────────────
  {
    id: 13,
    name: 'Leather Lifting Belt 4"',
    category: 'training',
    price: 79.99,
    badge: 'Powerlifting Grade',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com/liftingbelt',
    description: 'Competition-grade 10mm thick genuine leather powerlifting belt providing maximum intra-abdominal pressure support during heavy compound lifts. Uniform 4-inch width for full lumbar support.',
    details: [
      '10mm thick premium vegetable-tanned genuine leather',
      'Uniform 4-inch width for full lumbar and abdominal support',
      'Stainless steel double-prong roller buckle for secure lock',
      'Suede inner lining for anti-slip grip against the skin'
    ],
    usage: 'Wear 2 finger-widths above hip bones. Brace hard into belt before each rep. Break in gradually over first 20 sessions.',
    specifications: {
      'Thickness': '10mm',
      'Width': '4 inches uniform',
      'Material': 'Vegetable-tanned genuine leather',
      'Buckle': 'Stainless steel double-prong',
      'Sizing': 'XS – 3XL (by waist measurement)'
    }
  },
  {
    id: 14,
    name: 'Competition Wrist Wraps',
    category: 'training',
    price: 22.99,
    badge: 'Injury Prevention',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop',
    isAffiliate: false,
    description: 'Heavy-duty 24-inch stiff elastic wrist wraps for maximum wrist stability during pressing, overhead, and Olympic lifting movements. IPF and IWF approved for competition use.',
    details: [
      '24-inch length for maximum coverage and adjustable tension',
      'Stiff elastic blend for rigid wrist lockout support',
      'Reinforced thumb loop and velcro closure',
      'IPF and IWF approved for sanctioned competitions'
    ],
    usage: 'Wrap firmly around wrist joint. Keep thumb loop secure. Unwrap between sets for blood circulation.',
    specifications: {
      'Length': '24 inches',
      'Width': '3 inches',
      'Material': 'Cotton / Elastic blend',
      'Closure': 'Heavy-duty velcro',
      'Approval': 'IPF and IWF competition legal'
    }
  },
  {
    id: 15,
    name: 'Deadlift Lifting Straps',
    category: 'training',
    price: 16.99,
    badge: 'Grip Enhancer',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
    isAffiliate: false,
    description: 'Heavy-duty cotton Olympic lifting straps eliminating grip failure during pulls, rows, shrugs, and deadlifts. Lasso-style design for rapid secure loading without compromising wrist positioning.',
    details: [
      'Extra-thick 1.5-inch cotton webbing with zero slippage',
      'Lasso loop design secures in under 3 seconds',
      'Reinforced stitching tested to 600 lb pull force',
      'Neoprene wrist pad prevents bar abrasion'
    ],
    usage: 'Loop around bar before gripping. Tighten by rotating bar toward you. Remove between warm-up sets to train grip strength.',
    specifications: {
      'Length': '21 inches',
      'Width': '1.5 inches',
      'Material': 'Heavy cotton webbing + neoprene pad',
      'Pull Rating': '600 lbs tested',
      'Pair Weight': '85g'
    }
  }
];
