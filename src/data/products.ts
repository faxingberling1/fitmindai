export interface Product {
  id: number;
  name: string;
  category: 'peptides' | 'apparel' | 'accessories';
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
    id: 2,
    name: 'FitMind Pro Hoodie',
    category: 'apparel',
    price: 65.00,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    isAffiliate: false,
    description: 'Engineered for high-performance warmups and premium street lifestyle wear. Cut from ultra-heavyweight 400GSM organic cotton loopback, the FitMind Pro Hoodie features structured drop shoulders, double-lined hood insulation, and clean, geometric fit lines that project power and physical structure.',
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
    usage: 'Machine wash cold inside out with similar colors. Hang dry or tumble dry low. Do not iron direct embroidery.',
    specifications: {
      'Material': '100% Organic Loopback Cotton',
      'Weight': '400 GSM (Heavyweight)',
      'FitType': 'Oversized Athletic Crop',
      'Origin': 'Sustainably Crafted in Portugal',
      'Sizing': 'True to size (size up for highly oversized fit)'
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
  {
    id: 4,
    name: 'Tactical Gym Duffel',
    category: 'accessories',
    price: 45.00,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    isAffiliate: false,
    description: 'Built to survive the most intense athletic travels. The Tactical Gym Duffel features ultra-durable 1000D ballistic nylon construction, heavy-duty YKK double-zippers, and a highly functional water-resistant separated pocket designed exclusively for damp training shoes or sweaty gear.',
    details: [
      'Ultra-durable 1000D Ballistic Cordura Nylon shell',
      'Dual separated ventilated pockets for shoes/dirty apparel',
      'Tactical MOLLE webbing loops for customized modular add-ons',
      'Ergonomic, padded neoprene shoulder strap system'
    ],
    science: [
      'Waterproof interior lining blocks odors from crossing compartments.',
      'Reinforced box-stitch stress zones handle up to 60 lbs of lifting loads without seam tearing.'
    ],
    usage: 'Wipe clean with a damp cloth. Hand wash only in lukewarm water if heavily soiled. Air dry only.',
    specifications: {
      'Material': '1000D Ballistic Cordura Nylon',
      'Volume': '45 Liters',
      'Zippers': 'Waterproof Sealed YKK',
      'Weight Capacity': '65 lbs / 30 kg',
      'Dimensions': '22" L x 11" W x 11" H'
    }
  }
];
