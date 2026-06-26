export interface Place {
  id: string;
  name: string;
  category: 'ghats' | 'temples' | 'food' | 'markets' | 'attractions';
  coordinates: [number, number];
  description: string;
  history: string;
  significance?: string;
  openingHours?: string;
  dressGuidelines?: string;
  tips?: string[];
  rating: number;
  phone?: string;
  website?: string;
  address: string;
  boatAvailable?: boolean;
  gangaAartiTime?: string;
  famousFor?: string[];
  bestTime?: string;
  imagePlaceholder?: string;
}

export const VARANASI_PLACES: Place[] = [
  // GHATS
  {
    id: 'dashashwamedh',
    name: 'Dashashwamedh Ghat',
    category: 'ghats',
    coordinates: [25.3078, 83.0101],
    description: 'The spectacular heart of Varanasi, known globally for the daily magnificent evening Ganga Aarti.',
    history: 'Created by Lord Brahma to welcome Lord Shiva, performing ten Ashwamedha sacrifices here.',
    significance: 'Considered the most sacred ghat in Varanasi where the river flows northwards.',
    openingHours: 'Open 24 hours',
    rating: 4.9,
    address: 'Godowlia, Varanasi, Uttar Pradesh 221001',
    boatAvailable: true,
    gangaAartiTime: '6:30 PM - 7:30 PM (Daily)',
    famousFor: ['Ganga Aarti', 'Floating Diyas', 'Boat Rides', 'Morning Bathing'],
    bestTime: 'Evening at Sunset'
  },
  {
    id: 'assi',
    name: 'Assi Ghat',
    category: 'ghats',
    coordinates: [25.2898, 83.0116],
    description: 'The southernmost ghat where pilgrims bathe before paying homage to Shiva under a peepal tree.',
    history: 'Where Goddess Durga threw her sword (assi) after defeating demons Shumbha-Nishumbha, creating the Assi river.',
    significance: 'Famous for Subah-e-Banaras (morning music and yoga ceremonies at sunrise).',
    openingHours: 'Open 24 hours',
    rating: 4.8,
    address: 'Near BHU, Assi Road, Varanasi 221005',
    boatAvailable: true,
    gangaAartiTime: '5:30 AM (Subah-e-Banaras Aarti)',
    famousFor: ['Subah-e-Banaras', 'Yoga', 'Clay Cup Chai', 'Boating'],
    bestTime: 'Sunrise (5:00 AM)'
  },
  {
    id: 'manikarnika',
    name: 'Manikarnika Ghat',
    category: 'ghats',
    coordinates: [25.3109, 83.0135],
    description: 'The primary cremation ghat of Varanasi, representing the eternal cycle of life and death in Hinduism.',
    history: 'Lord Shiva’s earring (Manikarnika) fell here into a well dug by Lord Vishnu.',
    significance: 'It is believed that passing away or being cremated here grants instant Moksha (liberation).',
    openingHours: 'Open 24 hours (Cremations occur continuously)',
    rating: 4.7,
    address: 'Manikarnika Gali, Varanasi 221001',
    boatAvailable: false,
    famousFor: ['Eternal Flame', 'Vishnu Charan Paduka', 'Moksha Prayers'],
    bestTime: 'Any time (respectful distance recommended)'
  },
  {
    id: 'harishchandra',
    name: 'Harishchandra Ghat',
    category: 'ghats',
    coordinates: [25.2995, 83.0094],
    description: 'One of the oldest cremation ghats, named after the legendary King Harishchandra who worked here for truth.',
    history: 'Named after King Harishchandra, who chose to work as a cremator here to uphold truth and duty.',
    significance: 'Believed to grant peace to departed souls. A historic electric crematorium also operates here alongside traditional pyres.',
    openingHours: 'Open 24 hours',
    rating: 4.6,
    address: 'Bangali Tola, Varanasi 221001',
    boatAvailable: true,
    famousFor: ['Historical Cremation', 'King Harishchandra Temple'],
    bestTime: 'Afternoon'
  },
  {
    id: 'tulsi',
    name: 'Tulsi Ghat',
    category: 'ghats',
    coordinates: [25.2882, 83.0106],
    description: 'A peaceful ghat named after the saint-poet Tulsidas who wrote the Ramcharitmanas here.',
    history: 'Where Goswami Tulsidas lived, composed the Hindi version of the Ramayana, and eventually passed away.',
    significance: 'Holds the house and relics of Tulsidas, including a piece of the wooden boat he used.',
    openingHours: '6:00 AM - 8:00 PM',
    rating: 4.7,
    address: 'Near Assi Ghat, Varanasi 221005',
    boatAvailable: true,
    famousFor: ['Tulsidas Temple', 'Lolark Kund (sacred water tank)', 'Lolark Mela'],
    bestTime: 'Morning'
  },
  {
    id: 'scindia',
    name: 'Scindia Ghat',
    category: 'ghats',
    coordinates: [25.3117, 83.0141],
    description: 'An elegant ghat featuring a partially submerged Shiva Temple that sank under its own weight during construction.',
    history: 'Built in 1830 by Queen Baija Bai of Gwalior.',
    significance: 'The submerged Ratneshwar Mahadev Temple is a famous architectural leaning wonder of India.',
    openingHours: 'Open 24 hours',
    rating: 4.8,
    address: 'Near Manikarnika, Varanasi 221001',
    boatAvailable: true,
    famousFor: ['Leaning Temple', 'Yoga Shala', 'Vedic Schools'],
    bestTime: 'Morning or Late Afternoon'
  },

  // TEMPLES
  {
    id: 'kashi_vishwanath',
    name: 'Kashi Vishwanath Temple (Golden Temple)',
    category: 'temples',
    coordinates: [25.3109, 83.0099],
    description: 'One of the most famous Hindu temples, dedicated to Lord Shiva (Vishweshwara), standing on the western bank of the Ganga.',
    history: 'Reconstructed by Queen Ahilyabai Holkar of Indore in 1780. The dome was gold-plated by Maharaja Ranjit Singh in 1835.',
    significance: 'One of the twelve sacred Jyotirlingas, representing Shiva as the supreme cosmic light.',
    openingHours: '4:00 AM - 11:00 PM',
    dressGuidelines: 'Traditional Indian wear preferred; avoid shorts/sleeveless clothing. Security checks are strict.',
    tips: ['Deposit mobile phones, cameras, and leather items in lockers outside.', 'Avail of Sugam Darshan tickets during peak times to avoid lines.'],
    rating: 4.9,
    phone: '+91-542-2392629',
    website: 'https://shrikashivishwanath.org',
    address: 'Lahori Tola, Varanasi 221001',
    famousFor: ['Jyotirlinga Darshan', 'Golden Domes', 'Ganga Corridor Walkway']
  },
  {
    id: 'sankat_mochan',
    name: 'Sankat Mochan Hanuman Temple',
    category: 'temples',
    coordinates: [25.2825, 82.9996],
    description: 'A historic temple dedicated to Lord Hanuman, situated near the Assi river stream, offering a peaceful natural sanctuary.',
    history: 'Established by Goswami Tulsidas in the early 16th century, at the spot where he had a vision of Hanuman.',
    significance: 'Sankat Mochan translates to "reliever of troubles." Famous for offering "Besan Ladoo" prasad.',
    openingHours: '5:00 AM - 12:00 PM, 3:00 PM - 10:00 PM',
    dressGuidelines: 'Modest casual attire.',
    tips: ['Watch out for monkeys in the temple courtyard; keep your bags secure.', 'Tuesdays and Saturdays are highly crowded.'],
    rating: 4.8,
    address: 'Sankat Mochan Saket Nagar, Varanasi 221005',
    famousFor: ['Hanuman Bhajans', 'Besan Ladoos', 'Sankat Mochan Music Festival']
  },
  {
    id: 'durga_kund',
    name: 'Durga Kund Mandir',
    category: 'temples',
    coordinates: [25.2887, 82.9995],
    description: 'An iconic 18th-century red temple built in Nagara architectural style with a large adjacent water tank (Kund).',
    history: 'Built by Rani Bhabani of Natore (Bengal) in the 18th century.',
    significance: 'Dedicated to Goddess Durga. It is believed that the deity arose spontaneously (Swayambhu) in the sanctum.',
    openingHours: '5:00 AM - 11:00 PM',
    dressGuidelines: 'Respectful modest clothing.',
    rating: 4.7,
    address: 'Durga Kund Road, Jawahar Nagar Colony, Varanasi 221010',
    famousFor: ['Durga Puja celebrations', 'Nagara Architecture', 'Monkey Temple (historical nickname)']
  },
  {
    id: 'kaal_bhairav',
    name: 'Kaal Bhairav Mandir',
    category: 'temples',
    coordinates: [25.3195, 83.0119],
    description: 'A powerful temple dedicated to Shiva’s fierce form, Kaal Bhairav, who is considered the spiritual governor of Varanasi.',
    history: 'Dating back centuries, Kaal Bhairav is believed to protect Kashi from evil energies.',
    significance: 'Legend says pilgrims must visit this temple first to seek permission (Kotwal approval) to stay in Kashi.',
    openingHours: '5:00 AM - 1:30 PM, 4:30 PM - 9:30 PM',
    dressGuidelines: 'Modest attire.',
    tips: ['Purchase black threads (Kala Dhaga) sold outside as a protective charm.', 'Prepare for intense crowd queues.'],
    rating: 4.7,
    address: 'K-32/22, Bhaironath, Varanasi 221001',
    famousFor: ['Spiritual Protection', 'Mustard oil offerings', 'Kotwal of Kashi prayers']
  },
  {
    id: 'new_vishwanath_bhu',
    name: 'New Vishwanath Temple (VT BHU)',
    category: 'temples',
    coordinates: [25.2677, 82.9904],
    description: 'Located in the middle of the lush Banaras Hindu University campus, featuring the tallest temple tower (Shikhara) in the world.',
    history: 'Initiated by Pandit Madan Mohan Malaviya and built by the Birla family (completed in 1966).',
    significance: 'Built to be open to all castes, creeds, and religions. Constructed completely of white marble.',
    openingHours: '4:00 AM - 12:00 PM, 1:00 PM - 9:00 PM',
    rating: 4.8,
    address: 'BHU Campus, Varanasi 221005',
    famousFor: ['77-meter tall Shikhara', 'BHU Campus Gardens', 'Peaceful ambiance', 'Marble engravings']
  },

  // FAMOUS FOOD
  {
    id: 'kashi_chaat_bhandar',
    name: 'Kashi Chat Bhandar',
    category: 'food',
    coordinates: [25.3089, 83.0078],
    description: 'The legendary epicenter of Varanasi street food, famous for Tamatar Chaat served in clay pots.',
    history: 'Serving local flavors for over seven decades, visited by chefs and food lovers worldwide.',
    famousFor: ['Tamatar Chaat', 'Palak Patta Chaat', 'Aloo Tikki', 'Golgappas'],
    openingHours: '4:00 PM - 10:30 PM',
    rating: 4.8,
    address: 'D.47/60, Godowlia Crossing, Varanasi 221001',
    bestTime: 'Evening (5:00 PM - 8:00 PM)'
  },
  {
    id: 'blue_lassi_shop',
    name: 'Blue Lassi Shop',
    category: 'food',
    coordinates: [25.3114, 83.0116],
    description: 'An iconic tiny shop in the alleyways serving over 80 varieties of hand-churned fruit lassis topped with rabri and pistachios.',
    history: 'A family-run establishment serving yogurt lassis in terracotta cups (Kulhads) since 1925.',
    famousFor: ['Mango Rabri Lassi', 'Pomegranate Lassi', 'Kulhad Lassi', 'Wall of Traveller Notes'],
    openingHours: '9:00 AM - 10:00 PM',
    rating: 4.7,
    address: 'CK 12/1 Waza, Manikarnika Gali, Varanasi 221001',
    bestTime: 'Afternoon'
  },
  {
    id: 'malaiyyo_chowk',
    name: 'Markandey Malaiyyo Shop',
    category: 'food',
    coordinates: [25.3168, 83.0111],
    description: 'Serving Malaiyyo — a magical, seasonal sweet made of frothed milk dew, saffron, almonds, and pistachios.',
    history: 'A delicate winter specialty prepared overnight under the open moonlit sky to collect winter dew.',
    famousFor: ['Saffron Malaiyyo', 'Kulhad Milk', 'Winter Delicacy'],
    openingHours: '7:00 AM - 11:30 AM (Available only during Winter: Nov - Feb)',
    rating: 4.9,
    address: 'Near Gopal Mandir, Chowk, Varanasi 221001',
    bestTime: 'Early Morning (8:00 AM)'
  },
  {
    id: 'baati_chokha_sigra',
    name: 'Baati Chokha Sigra',
    category: 'food',
    coordinates: [25.3194, 82.9867],
    description: 'A traditional clay-themed restaurant serving authentic Purvanchal cuisine: wheat baatis baked on cow-dung fire and mashed eggplant chokha.',
    history: 'Established to preserve the rural culinary heritage of Eastern Uttar Pradesh.',
    famousFor: ['Baati Chokha', 'Sattu Baati with Desi Ghee', 'Kheer', 'Clay pottery dining'],
    openingHours: '12:00 PM - 10:30 PM',
    rating: 4.6,
    address: 'Sigra Road, Varanasi 221010',
    bestTime: 'Lunch or Dinner'
  },
  {
    id: 'netaji_sweets',
    name: 'Netaji Sweets & Kachori',
    category: 'food',
    coordinates: [25.3134, 83.0092],
    description: 'Best spot for Banarasi breakfast: piping hot Kachori Sabzi followed by crispy sweet Jalebis.',
    history: 'A historic spot where generations of Banarasis start their day.',
    famousFor: ['Chana Masala Kachori', 'Desi Ghee Jalebi', 'Launglata (sweet pastry)'],
    openingHours: '7:00 AM - 2:00 PM',
    rating: 4.5,
    address: 'Chowk, Varanasi 221001',
    bestTime: 'Breakfast (8:00 AM)'
  },

  // MARKETS
  {
    id: 'godowlia_market',
    name: 'Godowlia Bazaar',
    category: 'markets',
    coordinates: [25.3087, 83.0083],
    description: 'The oldest, busiest, and most vibrant market street in Varanasi, packed with silk sarees, brassware, and local street stalls.',
    history: 'Serving as the commercial central node of Kashi since the British era.',
    famousFor: ['Banarasi Silk Sarees', 'Wooden Toys', 'Glass Beads', 'Street Food'],
    openingHours: '10:00 AM - 9:30 PM',
    rating: 4.6,
    address: 'Godowlia Crossing, Varanasi 221001',
    tips: ['Vehicles are banned here in the evenings; enjoy walking in the pedestrian zone.', 'Bargain aggressively for handicrafts.']
  },
  {
    id: 'vishwanath_gali',
    name: 'Vishwanath Gali',
    category: 'markets',
    coordinates: [25.3105, 83.0102],
    description: 'A network of narrow, bustling pedestrian alleys leading to the Kashi Vishwanath temple, selling religious items and glass bangles.',
    history: 'An ancient pilgrim passage pathway which has turned into a legendary bazaar.',
    famousFor: ['Rudraksha beads', 'Brass idols', 'Religious books', 'Glass bangles'],
    openingHours: '6:00 AM - 9:00 PM',
    rating: 4.7,
    address: 'Near Kashi Vishwanath Temple, Varanasi 221001',
    tips: ['Keep your belongings close; the lane is extremely narrow (1-2 meters wide).']
  },

  // ATTRACTIONS
  {
    id: 'sarnath',
    name: 'Sarnath Buddhist Site',
    category: 'attractions',
    coordinates: [25.3762, 83.0227],
    description: 'A tranquil Buddhist pilgrimage site featuring the massive Dhamek Stupa and deer park, located 10km north of Varanasi.',
    history: 'Where Gautama Buddha gave his first sermon (Dharmachakrapravartana) after attaining enlightenment.',
    significance: 'Contains the Ashoka Pillar, whose lion capital is the National Emblem of India.',
    openingHours: '6:00 AM - 6:00 PM',
    rating: 4.8,
    address: 'Sarnath, Varanasi, Uttar Pradesh 221007',
    famousFor: ['Dhamek Stupa', 'Mulagandha Kuti Vihara', 'Archaeological Museum', 'Deer Park'],
    bestTime: 'Morning or Winter afternoon'
  },
  {
    id: 'ramnagar_fort',
    name: 'Ramnagar Fort & Museum',
    category: 'attractions',
    coordinates: [25.2683, 83.0272],
    description: 'An 18th-century sandstone fortress on the eastern bank of the Ganga, built in Mughal-Hindu architectural style.',
    history: 'Built by Kashi Naresh Raja Balwant Singh in 1750; it remains the ancestral residence of the present titular King.',
    significance: 'Features an eccentric museum displaying royal vintage cars, ivory carvings, and astronomical clocks.',
    openingHours: '10:00 AM - 5:00 PM',
    rating: 4.4,
    address: 'Ramnagar Road, Ramnagar, Varanasi 221008',
    famousFor: ['Sandstone Architecture', 'Vintage Carriage Museum', 'Ganga Sunset views']
  },
  {
    id: 'bhu_campus',
    name: 'Banaras Hindu University (BHU)',
    category: 'attractions',
    coordinates: [25.2750, 83.0005],
    description: 'One of the largest residential universities in Asia, featuring a circular, tree-lined campus spanning over 1,300 acres.',
    history: 'Founded in 1916 by nationalist leader Pandit Madan Mohan Malaviya, Annie Besant, and Sundar Lal.',
    significance: 'A great seat of learning housing the Bharat Kala Bhavan museum and VT temple.',
    openingHours: 'Open daily to visitors',
    rating: 4.8,
    address: 'Lanka, Varanasi 221005',
    famousFor: ['Lush avenues', 'Bharat Kala Bhavan (Art Museum)', 'Birla Temple']
  },
  {
    id: 'cantt_railway_station',
    name: 'Varanasi Cantt Railway Station (BSB)',
    category: 'attractions',
    coordinates: [25.3276, 82.9739],
    description: 'The primary gateway and railway terminal of Varanasi, connecting the holy city to all parts of India.',
    history: 'Dating back to the British Raj, recently modernized with ropeway stations under construction.',
    openingHours: 'Open 24 hours',
    rating: 4.2,
    address: 'Cantt, Varanasi 221002'
  },
  {
    id: 'airport_varanasi',
    name: 'Lal Bahadur Shastri International Airport (VNS)',
    category: 'attractions',
    coordinates: [25.4497, 82.8591],
    description: 'The international airport serving Varanasi, located 26 km northwest of the city in Babatpur.',
    history: 'Named after India’s second Prime Minister, Lal Bahadur Shastri, who hailed from Ramnagar, Varanasi.',
    openingHours: 'Open 24 hours',
    rating: 4.5,
    address: 'Babatpur, Uttar Pradesh 221006'
  }
];

export const FESTIVALS = [
  {
    id: 'dev_deepawali',
    name: 'Dev Deepawali',
    date: 'Kartik Poornima (Nov/Dec)',
    description: 'The festival of lights of the Gods. Every single ghat steps of Varanasi is lit with over a million clay diyas.',
    themeClass: 'theme-dev-deepawali',
    soundtrackUrl: '#',
    palette: {
      primary: '#ff6f00',
      secondary: '#ffcc80',
      background: '#0d0700',
      text: '#fff'
    }
  },
  {
    id: 'mahashivratri',
    name: 'Mahashivratri',
    date: 'Phalguna (Feb/March)',
    description: 'The great night of Shiva, celebrating Shiva’s wedding. Colorful processions (Shiv Baraat) take over the streets.',
    themeClass: 'theme-mahashivratri',
    palette: {
      primary: '#7b1fa2',
      secondary: '#b39ddb',
      background: '#07020a',
      text: '#fff'
    }
  },
  {
    id: 'holi',
    name: 'Holi',
    date: 'Phalguna Purnima (March)',
    description: 'The spring festival of colors. Alleys are filled with colors, gulal, and special thandai.',
    themeClass: 'theme-holi',
    palette: {
      primary: '#e91e63',
      secondary: '#f48fb1',
      background: '#080104',
      text: '#fff'
    }
  }
];
