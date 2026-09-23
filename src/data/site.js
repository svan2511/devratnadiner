export const LOGO_URL = '/logo.png';

export const IMAGES = {
  heroBg:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCw9Nx_Z-CizGIuPKUMF7BXe1qEMaca74DGg5rqGi9kULL-goKcdzJmJEQ-QGcnOuxky8EBnmSUnZhlFUxrzz98PytEwOKr-aZ8B_sCDKF9rC8qo68nR7bfNR8iZEJ0U3_1r5qUoNXey9BgBipROCHZPqsf4lpm2mQ5fbkHVgV3NTPKK5zXfuWG8H_1pKqJIKZh_seK-6M8yDc0aSF5xMDoPkvXe_xnmF8lyHQqfHTTurMzT12hO-wFyg',
  // Nayi shop-front photo (public/front.png). Purani heroBg wali line backup hai —
  // wapas chahiye to Hero.jsx me IMAGES.heroFront ki jagah IMAGES.heroBg kar dena.
  heroFront: '/front.png',
  story:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuALdqvxN0ZEoePw9PDFIWeHxYT0-V8pbO0BiBtek5KVCaKHGEBvSnmqgLi_d5qD-bnXXNwpenaIS5LqDsun0dXV_E3tH2evZBCnqJQ4eHFAt0kbp6hQrH8WZHmZ99KGW3COnL5T0Lo1fMIm-ZqqDOrG2N-5l2P77EYgZTJuLjZOlRc_dmqL-zT9_p9OE82AsNBalZSHhWqM55P9Qxv2VI8DOdK_rJ4Q6UWXe4am0Zrm1ztLWIoEL8VV6w',
  dalMakhani:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvTYHkSSbwf-kxwAropeWT0TPInywyjOV4ZUtcdQCNhYpkmplxBrNcbqDAfNlqyUe8SHYdJASMSWyV6cGeKs21yQTvbS-Sx-Ft8vhpVvDu39VYHMdxHs7kqlcGkgblku8QA0PitCHo-l3scgxdTutZrNWnN9wincxCX4L8HScp7uK1fabBCNO24-NSRGbb-2EzUXKq0RSc03JJ076Y8eY1_4I5oXxaK_UcGrS27ZI0PioOLLSt-gyNRQ',
  thali:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCfIs1TqjtMm9rnuN69nGkYDOsXRkqlXG98HaisDdOhgbl-cPxmh3fFBQkdp6mCgzaMqmRbj-MB59aqgdQqRK3qfmY9wPEQ1futxRDtJXuXnBDu_3uBPB9fV-ks_etkDwqFeWJx_jbTh5AVlAJmc_BGJKZol5Ew0mAsro1pMeCKCf93dvESnEzENhaZ1CzNLOfXSxOpH1w0xo8-8DlX_kTpxt7CPDEWGhleXkm84mOrQMeSJddWtMG18w',
  momos:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB1kwqgk7YLzzuTIEzcML7ZTq_9GVz7moGGfMxyRevYuzb103OUhOERagQ2fAOgSbMlnXbFRKA7aoFBtbzkFhQeV7H8DY8jJsrnqHO2G70bPYOmWO8I-RG3lzsVPek7ixFPNSXYn99zQZaKzYDyrRzIZQSbnunuJNDshV90SJYcb-Qxj5FivN_u2Ayxe7HtbZvFZ3IP8232zmffOyS83j0ITR9eRYGJ_Q5qt5bKXCs7PxYSRRSDRSCMWQ',
  students:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDaT1PHSX5W76SI8OnRuc_Y4D7XEDE-pn6AwOfEFkNf3PwMmcp61kh410Z1EJK4GiOHCAODSibaqGdAtoy3gAalHjvXHTUvrbsvJ9qgBiWHpGWQIRc3wskH3cyCcVx71Pu9Kpm4f9X4KDcmbsYFuD4L2dMejPxnbku0pRrx1GF1_YSGR_Qfj8_G0FwV2ZggfCY63fuplIr6HIBMmkGomkiMuPAlwF_pQP_DnTto1DFNB40bDvYoY3a3vA',
  mapBg:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAVK0hHnMU36lSlQMYuHH7jxDdXRgXls3QDo-RFV3IQLAuyw_y6AMWjMnmEDY9FudnoNXpwUaM0RKf6G_NyCKmK2ujxdzbl7Dd_CXGVMJuSO0EjWUAI4QXP9nbyRgDmv_UEiiPGuSXR8dduXIv5JEJK14pLlRMLiEK3kBIGqulCCp_MABGWqV1wI_ZkeNJtUFKT4Vk9bwSaJ0tp5udjs8Glw6T4TO-xuoprhXV6NgteW_W9fZEk8az7oQ',
};

// Every nav item links to its page section (requirement: menu links -> appropriate section)
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  // { label: 'Popular', href: '#signature-dishes' },
  { label: 'Menu', href: '#menu-catalog' },
  // { label: 'Special', href: '#todays-special' },
  // { label: 'Atmosphere', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact Us', href: '#location-map' },
];

// Categories taken directly from the printed menu card (menu.jpg)
export const MENU_TABS = [
  { key: 'all', label: 'All Offerings' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'thali', label: 'Thali' },
  { key: 'maincourse', label: 'Main Course' },
  { key: 'paneer', label: 'Paneer Dishes' },
  { key: 'veg', label: 'Vegetables' },
  { key: 'dal', label: 'Dal / Rajma / Chole' },
  { key: 'chinese', label: 'Chinese & Momos' },
  { key: 'raita', label: 'Raita & Dahi' },
  { key: 'maggi', label: 'Maggi' },
  { key: 'beverages', label: 'Beverages' },
];

export const CATEGORY_LABELS = {
  breakfast: 'Breakfast',
  snacks: 'Snacks',
  thali: 'Thali',
  maincourse: 'Main Course',
  paneer: 'Paneer',
  veg: 'Vegetable',
  dal: 'Dal',
  chinese: 'Chinese',
  raita: 'Raita',
  maggi: 'Maggi',
  beverages: 'Beverages',
};

// Dishes + prices exactly as printed on the restaurant menu card. Pure veg.
export const MENU_ITEMS = [
  // ---- BREAK FAST ----
  { name: 'Aloo Paratha', price: '₹40', category: 'breakfast', veg: true, desc: 'Tawa-fresh, served with butter, curd & pickle.' },
  { name: 'Aloo Pyaj Paratha', price: '₹50', category: 'breakfast', veg: true, desc: 'Stuffed with spiced potato & onion.' },
  { name: 'Gobhi Paratha', price: '₹60', category: 'breakfast', veg: true, desc: 'Stuffed cauliflower paratha with white butter.' },
  { name: 'Mix Paratha', price: '₹70', category: 'breakfast', veg: true, desc: 'Mixed veg stuffing, tandoor-finished.' },
  { name: 'Paneer Paratha', price: '₹80', category: 'breakfast', veg: true, desc: 'Stuffed with spiced paneer.' },
  { name: 'Plain Paratha', price: '₹20', category: 'breakfast', veg: true, desc: 'Simple layered whole-wheat paratha.' },
  { name: 'Pyaz Paratha', price: '₹50', category: 'breakfast', veg: true, desc: 'Onion-stuffed crisp paratha.' },
  { name: 'Plain Roti', price: '₹10', category: 'breakfast', veg: true, desc: 'Tandoor-fresh whole wheat roti.' },
  { name: 'Butter Roti', price: '₹15', category: 'breakfast', veg: true, desc: 'Tandoori roti brushed with butter.' },
  { name: 'Puri Bhaji (4 Piece)', price: '₹60', category: 'breakfast', veg: true, desc: 'Fluffy puris with spiced aloo bhaji.' },
  { name: 'Chole Bhature', price: '₹80', category: 'breakfast', veg: true, desc: 'Delhi-style chole with fluffy bhature.' },
  { name: 'Veg Sandwich', price: '₹50', category: 'breakfast', veg: true, desc: 'Grilled sandwich with mint chutney.' },
  { name: 'Cheese Sandwich', price: '₹70', category: 'breakfast', veg: true, desc: 'Grilled sandwich with molten cheese.' },
  { name: 'Paneer Sandwich', price: '₹80', category: 'breakfast', veg: true, desc: 'Grilled sandwich with spiced paneer filling.' },
  { name: 'Butter Toast', price: '₹50', category: 'breakfast', veg: true, desc: 'Crisp toast with butter.' },
  { name: 'Plain Burger', price: '₹50', category: 'breakfast', veg: true, desc: 'Crispy veg patty burger.' },
  { name: 'Cheese Burger', price: '₹60', category: 'breakfast', veg: true, desc: 'Veg patty burger with cheese slice.' },
  { name: 'Paneer Burger', price: '₹70', category: 'breakfast', veg: true, desc: 'Crispy paneer patty burger.' },

  // ---- SNACKS ----
  { name: 'Bread Pakoda', price: '₹20', category: 'snacks', veg: true, desc: 'Stuffed bread fritters, chai-time favourite.' },
  { name: 'Paneer Pakoda (10 Pcs)', price: '₹100', category: 'snacks', veg: true, desc: 'Crisp batter-fried paneer bites.' },
  { name: 'Mix Pakoda (250 gm)', price: '₹80', category: 'snacks', veg: true, desc: 'Assorted monsoon fritters.' },

  // ---- INDIAN THALI ----
  { name: 'Veg Thali', price: '₹80', category: 'thali', veg: true, desc: 'Sabji + Dal + Roti + Salad + Rice.' },
  { name: 'Special Thali', price: '₹120', category: 'thali', veg: true, desc: 'Paneer + Dal + 4 Roti + Raita + Rice + Salad.' },

  // ---- INDIAN MAINCOURSE ----
  { name: 'Rajma Chawal', price: '₹40 / 70', category: 'maincourse', veg: true, desc: 'Half / Full. Homestyle rajma over steamed rice.' },
  { name: 'Kadhi Chawal', price: '₹40 / 70', category: 'maincourse', veg: true, desc: 'Half / Full. Tangy kadhi with rice.' },
  { name: 'Chole Chawal', price: '₹40 / 70', category: 'maincourse', veg: true, desc: 'Half / Full. Amritsari chole with rice.' },
  { name: 'Dal Chawal', price: '₹40 / 70', category: 'maincourse', veg: true, desc: 'Half / Full. Comforting dal with rice.' },

  // ---- PANEER DISHES ----
  { name: 'Mutter Paneer', price: '₹150 / 260', category: 'paneer', veg: true, desc: 'Half / Full. Peas & paneer in homestyle gravy.' },
  { name: 'Kadhai Paneer', price: '₹180 / 290', category: 'paneer', veg: true, desc: 'Half / Full. Wok-tossed with capsicum & kadhai masala.' },
  { name: 'Paneer Butter Masala', price: '₹180 / 300', category: 'paneer', veg: true, desc: 'Half / Full. Rich makhani gravy, best with naan.' },
  { name: 'Paneer Bhurji', price: '₹180 / 300', category: 'paneer', veg: true, desc: 'Half / Full. Scrambled paneer with onion-tomato masala.' },
  { name: 'Paneer Do Pyaza', price: '₹210 / 320', category: 'paneer', veg: true, desc: 'Half / Full. Paneer tossed with double onions & masala.' },

  // ---- VEGETABLE ----
  { name: 'Mix Veg', price: '₹90 / 160', category: 'veg', veg: true, desc: 'Half / Full. Seasonal garden vegetables.' },
  { name: 'Aloo Matar', price: '₹80 / 150', category: 'veg', veg: true, desc: 'Half / Full. Potato & peas homestyle curry.' },
  { name: 'Aloo Shimla', price: '₹80 / 150', category: 'veg', veg: true, desc: 'Half / Full. Potato with crunchy capsicum.' },
  { name: 'Aloo Gobhi', price: '₹80 / 150', category: 'veg', veg: true, desc: 'Half / Full. Classic potato-cauliflower sabji.' },
  { name: 'Gobhi Masala', price: '₹80 / 150', category: 'veg', veg: true, desc: 'Half / Full. Cauliflower in spiced masala.' },
  { name: 'Aloo Jeera', price: '₹60 / 100', category: 'veg', veg: true, desc: 'Half / Full. Tempered with roasted cumin.' },
  { name: 'Sev Bhaji', price: '₹150', category: 'veg', veg: true, desc: 'Spicy Kolhapuri-style sev curry.' },

  // ---- DAAL ----
  { name: 'Dal Fry', price: '₹70 / 130', category: 'dal', veg: true, desc: 'Half / Full. Ghee-garlic tempered arhar dal.' },
  { name: 'Dal Tadka', price: '₹70 / 130', category: 'dal', veg: true, desc: 'Half / Full. Smoky tadka dal.' },
  { name: 'Dal Makhani', price: '₹100 / 180', category: 'dal', veg: true, desc: 'Half / Full. Slow-cooked black urad, butter & cream.' },
  { name: 'Rajma', price: '₹80 / 140', category: 'dal', veg: true, desc: 'Half / Full. Jammu-style red kidney beans.' },
  { name: 'Chole', price: '₹80 / 140', category: 'dal', veg: true, desc: 'Half / Full. Amritsari chickpea curry.' },
  { name: 'Chana Masala', price: '₹80 / 140', category: 'dal', veg: true, desc: 'Half / Full. Dry-spiced kala chana.' },
  { name: 'Kadhi Pakoda', price: '₹60 / 100', category: 'dal', veg: true, desc: 'Half / Full. Besan kadhi with soft pakodas.' },

  // ---- CHINESE ----
  { name: 'Veg Noodles', price: '₹60', category: 'chinese', veg: true, desc: 'Street-style wok-tossed noodles.' },
  { name: 'Hakka Noodles', price: '₹80', category: 'chinese', veg: true, desc: 'Smoky hakka-style noodles.' },
  { name: 'Schezwan Noodles', price: '₹90', category: 'chinese', veg: true, desc: 'Fiery schezwan sauce noodles.' },
  { name: 'Paneer Noodles', price: '₹120', category: 'chinese', veg: true, desc: 'Noodles tossed with paneer strips.' },
  { name: 'Garlic Noodles', price: '₹80', category: 'chinese', veg: true, desc: 'Burnt-garlic noodles.' },
  { name: 'Veg Momos (8 Pcs)', price: '₹70', category: 'chinese', veg: true, desc: 'Steamed, with spicy red chutney.' },
  { name: 'Fried Momos (8 Pcs)', price: '₹100', category: 'chinese', veg: true, desc: 'Golden crisp-fried momos.' },
  { name: 'Kurkure Momos (8 Pcs)', price: '₹120', category: 'chinese', veg: true, desc: 'Crunchy kurkure-coated momos.' },
  { name: 'Tandoori Momos (8 Pcs)', price: '₹140', category: 'chinese', veg: true, desc: 'Charred in clay tandoor, smoky & juicy.' },
  { name: 'Manchurian (Dry)', price: '₹140', category: 'chinese', veg: true, desc: 'Crisp veg dumplings, dry tossed.' },
  { name: 'Manchurian (Gravy)', price: '₹120', category: 'chinese', veg: true, desc: 'Veg dumplings in garlic-soy gravy.' },
  { name: 'Chilli Potato', price: '₹120', category: 'chinese', veg: true, desc: 'Crisp fingers in chilli-garlic glaze.' },
  { name: 'Honey Chilli Potato', price: '₹180', category: 'chinese', veg: true, desc: 'Sweet-heat honey chilli glaze.' },
  { name: 'French Fries', price: '₹140', category: 'chinese', veg: true, desc: 'Golden salted fries.' },
  { name: 'Peri Peri Fries', price: '₹120', category: 'chinese', veg: true, desc: 'Dusted with peri peri masala.' },
  { name: 'White Sauce Pasta', price: '₹180', category: 'chinese', veg: true, desc: 'Creamy alfredo-style pasta.' },
  { name: 'Red Sauce Pasta', price: '₹160', category: 'chinese', veg: true, desc: 'Tangy tomato-basil pasta.' },
  { name: 'Mix Sauce Pasta', price: '₹150', category: 'chinese', veg: true, desc: 'Pink sauce, best of both.' },
  { name: 'Chilli Paneer (Gravy)', price: '₹160', category: 'chinese', veg: true, desc: 'Paneer cubes in spicy gravy.' },
  { name: 'Chilli Paneer (Dry)', price: '₹180', category: 'chinese', veg: true, desc: 'Dry-tossed starter style.' },
  { name: 'Veg Fried Rice', price: '₹120', category: 'chinese', veg: true, desc: 'Smoky wok rice with crunchy veg.' },
  { name: 'Paneer Fried Rice', price: '₹140', category: 'chinese', veg: true, desc: 'Fried rice with paneer cubes.' },
  { name: 'Veg Schezwan Rice', price: '₹120', category: 'chinese', veg: true, desc: 'Spicy schezwan fried rice.' },
  { name: 'Jeera Rice', price: '₹120', category: 'chinese', veg: true, desc: 'Basmati tempered with ghee-roasted cumin.' },
  { name: 'Steam Rice', price: '₹100', category: 'chinese', veg: true, desc: 'Plain steamed basmati.' },

  // ---- RAITA ----
  { name: 'Vegetable Raita', price: '₹70 / 120', category: 'raita', veg: true, desc: 'Half / Full. Cucumber-onion raita.' },
  { name: 'Boondi Raita', price: '₹60 / 100', category: 'raita', veg: true, desc: 'Half / Full. Crisp boondi in curd.' },
  { name: 'Plain Dahi (Curd)', price: '₹20 / 40 / 80', category: 'raita', veg: true, desc: 'Fresh set curd, three serving sizes.' },

  // ---- MAGGIE ----
  { name: 'Plain Maggi', price: '₹50', category: 'maggi', veg: true, desc: 'Classic masala maggi.' },
  { name: 'Veg Maggi', price: '₹60', category: 'maggi', veg: true, desc: 'Loaded with garden vegetables.' },
  { name: 'Paneer Maggi', price: '₹80', category: 'maggi', veg: true, desc: 'With soft paneer cubes.' },
  { name: 'Cheese Maggi', price: '₹70', category: 'maggi', veg: true, desc: 'Topped with molten cheese.' },

  // ---- BEVERAGES ----
  { name: 'Tea', price: '₹20', category: 'beverages', veg: true, desc: 'Kadak doodh chai.' },
  { name: 'Masala Tea', price: '₹30', category: 'beverages', veg: true, desc: 'Brewed with crushed spices.' },
  { name: 'Lemon Tea', price: '₹40', category: 'beverages', veg: true, desc: 'Light & refreshing.' },
  { name: 'Black Tea', price: '₹40', category: 'beverages', veg: true, desc: 'No-milk brew.' },
  { name: 'Green Tea', price: '₹40', category: 'beverages', veg: true, desc: 'Light detox brew.' },
  { name: 'Ice Tea', price: '₹70', category: 'beverages', veg: true, desc: 'Chilled lemon ice tea.' },
  { name: 'Hot Coffee', price: '₹60', category: 'beverages', veg: true, desc: 'Steaming filter-style coffee.' },
  { name: 'Cold Coffee', price: '₹130', category: 'beverages', veg: true, desc: 'Thick blended frappe.' },
  { name: 'Black Coffee', price: '₹40', category: 'beverages', veg: true, desc: 'Bold & bitter brew.' },
  { name: 'Banana Shake', price: '₹80', category: 'beverages', veg: true, desc: 'Thick milk shake.' },
  { name: 'Mango Shake', price: '₹80', category: 'beverages', veg: true, desc: 'Seasonal alphonso-style shake.' },
  { name: 'KitKat Shake', price: '₹100', category: 'beverages', veg: true, desc: 'Chocolate wafer shake.' },
  { name: 'Oreo Shake', price: '₹100', category: 'beverages', veg: true, desc: 'Cookies & cream shake.' },
  { name: 'Vanilla Shake', price: '₹100', category: 'beverages', veg: true, desc: 'Classic vanilla bean shake.' },
  { name: 'Badam Shake', price: '₹120', category: 'beverages', veg: true, desc: 'Kesar-badam milk shake.' },
  { name: 'Fresh Lemon Soda', price: '₹70', category: 'beverages', veg: true, desc: 'Sweet / salted / mixed.' },
  { name: 'Mint Mojito', price: '₹100', category: 'beverages', veg: true, desc: 'Virgin mint-lime cooler.' },
  { name: 'Blue Lagoon', price: '₹100', category: 'beverages', veg: true, desc: 'Electric-blue citrus cooler.' },
  { name: 'Shikanji', price: '₹50', category: 'beverages', veg: true, desc: 'Old Delhi-style nimbu masala.' },
  { name: 'Lemon Water', price: '₹50', category: 'beverages', veg: true, desc: 'Simple nimbu pani.' },
  { name: 'Masala Chaas', price: '₹40', category: 'beverages', veg: true, desc: 'Spiced buttermilk.' },
  { name: 'Sweet Lassi', price: '₹70', category: 'beverages', veg: true, desc: 'Thick curd lassi with malai.' },
  { name: 'Mineral Water', price: 'MRP', category: 'beverages', veg: true, desc: 'Sealed bottle.' },
  { name: 'Cold Drink', price: 'MRP', category: 'beverages', veg: true, desc: 'Chilled soft drink.' },
];

// Popular picks with prices from the printed menu card (pure veg)
export const SIGNATURE_DISHES = [
  {
    name: 'Special Thali',
    badge: 'Signature Platter',
    badgeStyle: 'bg-secondary',
    price: '₹120',
    tag: 'All-in-One',
    desc: 'Paneer + Dal + 4 Roti + Raita + Rice + Salad. The complete Dev Ratna meal in one platter.',
    foot: 'Most Loved Combo',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfIs1TqjtMm9rnuN69nGkYDOsXRkqlXG98HaisDdOhgbl-cPxmh3fFBQkdp6mCgzaMqmRbj-MB59aqgdQqRK3qfmY9wPEQ1futxRDtJXuXnBDu_3uBPB9fV-ks_etkDwqFeWJx_jbTh5AVlAJmc_BGJKZol5Ew0mAsro1pMeCKCf93dvESnEzENhaZ1CzNLOfXSxOpH1w0xo8-8DlX_kTpxt7CPDEWGhleXkm84mOrQMeSJddWtMG18w',
    alt: 'Special thali platter',
  },
  {
    name: 'Dal Makhani',
    badge: 'Veg Specialty',
    badgeStyle: 'bg-emerald-800',
    price: '₹100 / 180',
    tag: 'Slow-Cooked',
    desc: 'Black urad simmered overnight with butter & cream. Half / Full as per menu card.',
    foot: 'Bestseller in Clement Town',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvTYHkSSbwf-kxwAropeWT0TPInywyjOV4ZUtcdQCNhYpkmplxBrNcbqDAfNlqyUe8SHYdJASMSWyV6cGeKs21yQTvbS-Sx-Ft8vhpVvDu39VYHMdxHs7kqlcGkgblku8QA0PitCHo-l3scgxdTutZrNWnN9wincxCX4L8HScp7uK1fabBCNO24-NSRGbb-2EzUXKq0RSc03JJ076Y8eY1_4I5oXxaK_UcGrS27ZI0PioOLLSt-gyNRQ',
    alt: 'Creamy Dal Makhani in traditional bowl',
  },
  {
    name: 'Kadhai Paneer',
    badge: 'Veg Delight',
    badgeStyle: 'bg-emerald-800',
    price: '₹180 / 290',
    tag: 'Wok-Tossed',
    desc: 'Paneer tossed with crunchy capsicum & roasted kadhai masala in a smoky gravy. Half / Full as per menu card.',
    foot: 'Best with Butter Naan',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kadai_paneer_with_garlic_naan.jpg?width=800',
    alt: 'Kadhai paneer served with garlic naan',
  },
  {
    name: 'Chole Bhature',
    badge: 'Delhi Style',
    badgeStyle: 'bg-emerald-800',
    price: '₹80',
    tag: 'Fluffy & Spicy',
    desc: 'Amritsari chole with fluffy bhature — the classic breakfast of champions.',
    foot: 'Breakfast Favourite',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chole_Bhature_from_Nagpur.JPG?width=800',
    alt: 'Chole bhature with fluffy bhature',
  },
  {
    name: 'Veg Momos (8 Pcs)',
    badge: 'Steamed Fresh',
    badgeStyle: 'bg-emerald-800',
    price: '₹70',
    tag: 'With Red Chutney',
    desc: 'Delicate steamed momos stuffed with seasoned garden vegetables, served with spicy red chutney.',
    foot: 'Evening Chai Companion',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Steamed_Momos_-_KOLKATA.jpg?width=800',
    alt: 'Steaming veg momos in a bowl',
  },
  {
    name: 'Veg Thali',
    badge: 'Wholesome Meal',
    badgeStyle: 'bg-secondary',
    price: '₹80',
    tag: 'Ghar Jaisa',
    desc: 'Sabji + Dal + Roti + Salad + Rice. The complete homestyle Dev Ratna meal in one thali.',
    foot: 'Everyday Favourite',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_Tipical_Veg_North_Indian_Thali.jpg?width=800',
    alt: 'Veg thali with dal, sabji, roti, rice and salad',
  },
];

export const REVIEWS = [
  {
    initials: 'AS',
    name: 'Ananya Sharma',
    meta: 'GEU Student • Local Guide',
    text: '“The Dal Makhani is unmatched in Clement Town! As Graphic Era students, this has become our weekly celebration and birthday spot. Honest pricing and huge portions.”',
  },
  {
    initials: 'RV',
    name: 'Rajesh Verma',
    meta: 'Family Diner • New Delhi',
    text: '“Brought my parents and kids for dinner during our weekend Dehradun trip. Beautiful quiet ambience, exceptionally polite staff, and genuine home-style food that didn’t feel heavy. Truly special.”',
  },
  {
    initials: 'RN',
    name: 'Rohan Negi',
    meta: 'Clement Town Resident',
    text: '“Affordable, delicious, and spotless hygiene. Try their Kadhai Paneer and fresh rotis with sweet lassi. Clement Town was missing a cozy spot like Dev Ratna Diner for years.”',
  },
];
