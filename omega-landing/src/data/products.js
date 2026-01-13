const getAvatarUrl = (name, background = null) => {
    const colors = [
        '0D8ABC', '7B9F35', '946D57', '2C5F2D', '1C1C1E',
        'FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8',
        'F7DC6F', 'BB8FCE', '85C1E2', 'F8B739', '52BE80'
    ];
    const bgColor = background || colors[Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length];
    const encodedName = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${encodedName}&size=96&background=${bgColor}&color=fff&bold=true&format=png`;
};

const reviewTemplates = [
    { name: "Ahmed Al-Rashid", avatar: getAvatarUrl("Ahmed Al-Rashid", "0D8ABC"), rating: 5, date: "March 15, 2024 at 3:45 pm" },
    { name: "Fatima Hassan", avatar: getAvatarUrl("Fatima Hassan", "FF6B6B"), rating: 5, date: "March 18, 2024 at 11:20 am" },
    { name: "Mohammed Ali", avatar: getAvatarUrl("Mohammed Ali", "4ECDC4"), rating: 4, date: "March 20, 2024 at 2:37 pm" },
    { name: "Aisha Khan", avatar: getAvatarUrl("Aisha Khan", "45B7D1"), rating: 5, date: "March 22, 2024 at 9:15 am" },
    { name: "Omar Abdullah", avatar: getAvatarUrl("Omar Abdullah", "FFA07A"), rating: 5, date: "March 25, 2024 at 4:30 pm" },
    { name: "Priya Sharma", avatar: getAvatarUrl("Priya Sharma", "98D8C8"), rating: 5, date: "March 16, 2024 at 1:20 pm" },
    { name: "Rajesh Kumar", avatar: getAvatarUrl("Rajesh Kumar", "F7DC6F"), rating: 4, date: "March 19, 2024 at 10:45 am" },
    { name: "Anjali Patel", avatar: getAvatarUrl("Anjali Patel", "BB8FCE"), rating: 5, date: "March 21, 2024 at 3:10 pm" },
    { name: "Vikram Singh", avatar: getAvatarUrl("Vikram Singh", "85C1E2"), rating: 5, date: "March 23, 2024 at 2:00 pm" },
    { name: "Kavita Reddy", avatar: getAvatarUrl("Kavita Reddy", "F8B739"), rating: 4, date: "March 26, 2024 at 11:30 am" },
    { name: "Sarah Johnson", avatar: getAvatarUrl("Sarah Johnson", "52BE80"), rating: 5, date: "March 17, 2024 at 5:00 pm" },
    { name: "Michael Brown", avatar: getAvatarUrl("Michael Brown", "7B9F35"), rating: 5, date: "March 19, 2024 at 8:15 am" },
    { name: "Emily Davis", avatar: getAvatarUrl("Emily Davis", "946D57"), rating: 4, date: "March 22, 2024 at 12:45 pm" },
    { name: "David Wilson", avatar: getAvatarUrl("David Wilson", "2C5F2D"), rating: 5, date: "March 24, 2024 at 6:20 pm" },
    { name: "Jessica Martinez", avatar: getAvatarUrl("Jessica Martinez", "1C1C1E"), rating: 5, date: "March 27, 2024 at 10:00 am" },
    { name: "Khalid Al-Mansoori", avatar: getAvatarUrl("Khalid Al-Mansoori", "0D8ABC"), rating: 5, date: "March 18, 2024 at 2:30 pm" },
    { name: "Layla Al-Zahra", avatar: getAvatarUrl("Layla Al-Zahra", "FF6B6B"), rating: 5, date: "March 20, 2024 at 4:15 pm" },
    { name: "Yusuf Al-Hashimi", avatar: getAvatarUrl("Yusuf Al-Hashimi", "4ECDC4"), rating: 4, date: "March 23, 2024 at 1:50 pm" },
    { name: "Noor Al-Dosari", avatar: getAvatarUrl("Noor Al-Dosari", "45B7D1"), rating: 5, date: "March 25, 2024 at 3:40 pm" },
    { name: "Tariq Al-Otaibi", avatar: getAvatarUrl("Tariq Al-Otaibi", "FFA07A"), rating: 5, date: "March 28, 2024 at 11:10 am" }
];

const generateReviews = (productTitle, category, reviewIndices) => {
    const reviewComments = {
        'Frozen fish': [
            "Excellent quality! The fish was fresh and perfectly frozen. Will definitely order again.",
            "Amazing taste and texture. Very satisfied with the quality and packaging.",
            "Great product! The freshness is maintained perfectly. Highly recommend!",
            "Perfect for my seafood recipes. The quality exceeded my expectations.",
            "Very fresh and well-packaged. Delivery was fast and product quality is top-notch."
        ],
        'Spices': [
            "Authentic flavors! These spices are exactly what I needed for my cooking.",
            "High quality spices with amazing aroma. Worth every penny!",
            "Perfect blend and freshness. Makes all my dishes taste authentic.",
            "Excellent quality spices. The flavor is rich and authentic.",
            "Great value for money. The spices are fresh and aromatic."
        ],
        'Fruits': [
            "Fresh and delicious! The fruits arrived in perfect condition.",
            "Sweet and juicy. Exactly as described. Very satisfied!",
            "Premium quality fruits. Fresh, tasty, and well-packaged.",
            "Amazing freshness! The fruits are perfect for my family.",
            "Great quality and taste. Will definitely order again soon."
        ],
        'Vegitables': [
            "Fresh and crisp vegetables. Perfect for healthy cooking!",
            "Excellent quality! The vegetables are fresh and well-packaged.",
            "Great value! Fresh vegetables that last long in the fridge.",
            "Perfect for my daily cooking needs. Fresh and healthy!",
            "High quality vegetables. Very satisfied with the purchase."
        ]
    };

    const comments = reviewComments[category] || reviewComments['Fruits'];
    
    return reviewIndices.map((idx, i) => ({
        id: `review-${idx}`,
        name: reviewTemplates[idx].name,
        avatar: reviewTemplates[idx].avatar,
        rating: reviewTemplates[idx].rating,
        date: reviewTemplates[idx].date,
        comment: comments[i] || comments[0]
    }));
};

export const categories = [
    {
        id: 'Frozen fish',
        name: 'Frozen fish',
        icon: '/assets/img/menu/frozen/LOGO.png',
        tabId: 'pills-Frozen fish',
        ariaControls: 'pills-Frozen fish'
    },
    {
        id: 'Spices',
        name: 'Spices',
        icon: '/assets/img/menu/spices/LOGO.png',
        tabId: 'pills-Spices',
        ariaControls: 'pills-Spices'
    },
    {
        id: 'Fruits',
        name: 'Fruits',
        icon: '/assets/img/menu/Fruits/LOGO.png',
        tabId: 'pills-Fruits',
        ariaControls: 'pills-Fruits'
    },
    {
        id: 'Vegitables',
        name: 'Vegetables',
        icon: '/assets/img/menu/Vegetables/LOGO.png',
        tabId: 'pills-Vegitables',
        ariaControls: 'pills-Vegitables'
    }
];

export const productsByCategory = {
    'Frozen fish': [
        { id: 'frozen-1', img: "/assets/img/menu/Frozen/frozen1.png", title: "Frozen Shrimps 30-40", content: "Origin : oman", price: "$24.00", description: "Premium frozen shrimps sourced from Oman. Perfect size 30-40 count per pound. Freshly frozen to preserve quality and taste.", reviews: generateReviews("Frozen Shrimps 30-40", "Frozen fish", [0, 5, 10, 15]) },
        { id: 'frozen-2', img: "/assets/img/menu/Frozen/frozen2.png", title: "Frozen Black Pomfret", content: "Origin: UAE", price: "$28.00", description: "High-quality black pomfret from UAE waters. Frozen at peak freshness to maintain flavor and texture.", reviews: generateReviews("Frozen Black Pomfret", "Frozen fish", [1, 6, 11, 16]) },
        { id: 'frozen-3', img: "/assets/img/menu/Frozen/frozen3.png", title: "Frozen Salmon 2-3", content: "Origin: Norway", price: "$32.00", description: "Premium Norwegian salmon, 2-3 kg portions. Rich in omega-3 fatty acids, frozen to preserve nutritional value.", reviews: generateReviews("Frozen Salmon 2-3", "Frozen fish", [2, 7, 12, 17]) },
        { id: 'frozen-4', img: "/assets/img/menu/Frozen/frozen4.png", title: "Frozen Shark", content: "Origin: UAE", price: "$35.00", description: "Fresh frozen shark from UAE. Cleaned and ready to cook. Maintains freshness and quality.", reviews: generateReviews("Frozen Shark", "Frozen fish", [3, 8, 13, 18]) },
        { id: 'frozen-5', img: "/assets/img/menu/Frozen/frozen5.png", title: "Frozen Mussels", content: "Origin: Oman", price: "$20.00", description: "Fresh frozen mussels from Oman. Shelled and cleaned, ready for cooking. Perfect for seafood dishes.", reviews: generateReviews("Frozen Mussels", "Frozen fish", [4, 9, 14, 19]) },
        { id: 'frozen-6', img: "/assets/img/menu/Frozen/frozen6.png", title: "Frozen Squid", content: "Origin: UAE", price: "$26.00", description: "Premium frozen squid from UAE. Cleaned and cut, ideal for grilling or frying.", reviews: generateReviews("Frozen Squid", "Frozen fish", [0, 5, 10, 15]) },
        { id: 'frozen-7', img: "/assets/img/menu/Frozen/frozen7.png", title: "Frozen Crab Meat Sticks", content: "Origin: UAE", price: "$30.00", description: "Delicious crab meat sticks from UAE. Ready to cook, perfect for appetizers and main dishes.", reviews: generateReviews("Frozen Crab Meat Sticks", "Frozen fish", [1, 6, 11, 16]) },
        { id: 'frozen-8', img: "/assets/img/menu/Frozen/frozen8.png", title: "Frozen Seabream", content: "Origin: Europe", price: "$40.00", description: "European seabream, frozen fresh. Whole fish, cleaned and ready to prepare.", reviews: generateReviews("Frozen Seabream", "Frozen fish", [2, 7, 12, 17]) },
        { id: 'frozen-9', img: "/assets/img/menu/Frozen/frozen9.png", title: "Frozen Lobester", content: "Origin: UAE", price: "$58.00", description: "Premium frozen lobster from UAE. Whole lobster, frozen at peak freshness for the best taste.", reviews: generateReviews("Frozen Lobester", "Frozen fish", [3, 8, 13, 18]) },
        { id: 'frozen-10', img: "/assets/img/menu/Frozen/frozen10.png", title: "Frozen king fish", content: "Origin: UAE", price: "$45.00", description: "Fresh frozen king fish from UAE waters. Cleaned and cut into steaks, ready to cook.", reviews: generateReviews("Frozen king fish", "Frozen fish", [4, 9, 14, 19]) }
    ],
    "Spices": [
        { id: 'spice-1', img: "/assets/img/menu/Spices/spices1.png", title: "Black Pepper", content: "India", price: "$12.00", description: "Premium black pepper from India. Whole peppercorns with intense flavor and aroma.", reviews: generateReviews("Black Pepper", "Spices", [0, 5, 10, 15]) },
        { id: 'spice-2', img: "/assets/img/menu/Spices/spices2.png", title: "Cinnamon", content: "India", price: "$15.00", description: "High-quality cinnamon sticks from India. Sweet and aromatic, perfect for cooking and baking.", reviews: generateReviews("Cinnamon", "Spices", [1, 6, 11, 16]) },
        { id: 'spice-3', img: "/assets/img/menu/Spices/spices3.png", title: "Chilli Powder", content: "India", price: "$10.00", description: "Spicy chilli powder from India. Medium heat level, perfect for adding flavor to dishes.", reviews: generateReviews("Chilli Powder", "Spices", [2, 7, 12, 17]) },
        { id: 'spice-4', img: "/assets/img/menu/Spices/spices4.png", title: "Paprika", content: "India", price: "$13.00", description: "Sweet paprika powder from India. Adds color and mild flavor to your dishes.", reviews: generateReviews("Paprika", "Spices", [3, 8, 13, 18]) },
        { id: 'spice-5', img: "/assets/img/menu/Spices/spices5.png", title: "Turmeric", content: "India", price: "$11.00", description: "Pure turmeric powder from India. Known for its health benefits and vibrant yellow color.", reviews: generateReviews("Turmeric", "Spices", [4, 9, 14, 19]) },
        { id: 'spice-6', img: "/assets/img/menu/Spices/spices6.png", title: "Garlic Powder", content: "India", price: "$9.00", description: "Fine garlic powder from India. Convenient alternative to fresh garlic with strong flavor.", reviews: generateReviews("Garlic Powder", "Spices", [0, 5, 10, 15]) },
        { id: 'spice-7', img: "/assets/img/menu/Spices/spices7.png", title: "Coriander Powder", content: "India", price: "$10.00", description: "Ground coriander seeds from India. Essential spice for Indian and Middle Eastern cuisine.", reviews: generateReviews("Coriander Powder", "Spices", [1, 6, 11, 16]) },
        { id: 'spice-8', img: "/assets/img/menu/Spices/spices8.png", title: "Cardamom", content: "India", price: "$18.00", description: "Premium green cardamom pods from India. Highly aromatic, used in both sweet and savory dishes.", reviews: generateReviews("Cardamom", "Spices", [2, 7, 12, 17]) },
        { id: 'spice-9', img: "/assets/img/menu/Spices/spices9.png", title: "Cloves", content: "India", price: "$16.00", description: "Whole cloves from India. Strong, sweet flavor perfect for spice blends and marinades.", reviews: generateReviews("Cloves", "Spices", [3, 8, 13, 18]) },
        { id: 'spice-10', img: "/assets/img/menu/Spices/spices10.png", title: "Fish Masala", content: "India", price: "$14.00", description: "Special blend of spices for fish dishes. Pre-mixed for convenience and authentic flavor.", reviews: generateReviews("Fish Masala", "Spices", [4, 9, 14, 19]) }
    ],
    "Fruits": [
        { id: 'fruit-1', img: "/assets/img/menu/Fruits/fruit1.png", title: "Apple", content: "India", price: "$8.00", description: "Fresh, crisp apples from India. Sweet and juicy, perfect for snacking or cooking.", reviews: generateReviews("Apple", "Fruits", [0, 5, 10, 15]) },
        { id: 'fruit-2', img: "/assets/img/menu/Fruits/fruit5.png", title: "Blueberry", content: "India", price: "$22.00", description: "Premium blueberries from India. Packed with antioxidants, perfect for smoothies and desserts.", reviews: generateReviews("Blueberry", "Fruits", [1, 6, 11, 16]) },
        { id: 'fruit-3', img: "/assets/img/menu/Fruits/fruit2.png", title: "Avocado", content: "India", price: "$15.00", description: "Creamy avocados from India. Rich in healthy fats, perfect for salads and spreads.", reviews: generateReviews("Avocado", "Fruits", [2, 7, 12, 17]) },
        { id: 'fruit-4', img: "/assets/img/menu/Fruits/fruit3.png", title: "Blue Grapes", content: "India", price: "$12.00", description: "Sweet blue grapes from India. Seedless variety, perfect for snacking.", reviews: generateReviews("Blue Grapes", "Fruits", [3, 8, 13, 18]) },
        { id: 'fruit-5', img: "/assets/img/menu/Fruits/fruit4.png", title: "Banana", content: "India", price: "$6.00", description: "Fresh bananas from India. Naturally sweet, rich in potassium and energy.", reviews: generateReviews("Banana", "Fruits", [4, 9, 14, 19]) },
        { id: 'fruit-6', img: "/assets/img/menu/Fruits/fruit9.png", title: "Tender coconut", content: "India", price: "$5.00", description: "Fresh tender coconut from India. Refreshing coconut water and soft flesh.", reviews: generateReviews("Tender coconut", "Fruits", [0, 5, 10, 15]) },
        { id: 'fruit-7', img: "/assets/img/menu/Fruits/fruit10.png", title: "Mango", content: "India", price: "$10.00", description: "Sweet, juicy mangoes from India. Known as the king of fruits, perfect for desserts.", reviews: generateReviews("Mango", "Fruits", [1, 6, 11, 16]) },
        { id: 'fruit-8', img: "/assets/img/menu/Fruits/fruit6.png", title: "Kiwi", content: "India", price: "$18.00", description: "Fresh kiwi from India. Rich in vitamin C, tangy and sweet flavor.", reviews: generateReviews("Kiwi", "Fruits", [2, 7, 12, 17]) },
        { id: 'fruit-9', img: "/assets/img/menu/Fruits/fruit7.png", title: "Orange", content: "India", price: "$9.00", description: "Juicy oranges from India. High in vitamin C, perfect for fresh juice.", reviews: generateReviews("Orange", "Fruits", [3, 8, 13, 18]) },
        { id: 'fruit-10', img: "/assets/img/menu/Fruits/fruit8.png", title: "Strawberry", content: "India", price: "$20.00", description: "Sweet strawberries from India. Fresh and juicy, perfect for desserts and smoothies.", reviews: generateReviews("Strawberry", "Fruits", [4, 9, 14, 19]) }
    ],
    "Vegitables": [
        { id: 'veg-1', img: "/assets/img/menu/Vegetables/vegitable2.png", title: "Cabbage", content: "India", price: "$4.00", description: "Fresh cabbage from India. Crisp and versatile, perfect for salads and stir-fries.", reviews: generateReviews("Cabbage", "Vegitables", [0, 5, 10, 15]) },
        { id: 'veg-2', img: "/assets/img/menu/Vegetables/vegitable1.png", title: "Broccoli", content: "India", price: "$7.00", description: "Fresh broccoli from India. Rich in vitamins, perfect for healthy meals.", reviews: generateReviews("Broccoli", "Vegitables", [1, 6, 11, 16]) },
        { id: 'veg-3', img: "/assets/img/menu/Vegetables/vegitable3.png", title: "Carrot", content: "India", price: "$5.00", description: "Fresh carrots from India. Sweet and crunchy, rich in beta-carotene.", reviews: generateReviews("Carrot", "Vegitables", [2, 7, 12, 17]) },
        { id: 'veg-4', img: "/assets/img/menu/Vegetables/vegitable4.png", title: "Corn", content: "India", price: "$6.00", description: "Sweet corn from India. Fresh kernels, perfect for grilling or boiling.", reviews: generateReviews("Corn", "Vegitables", [3, 8, 13, 18]) },
        { id: 'veg-5', img: "/assets/img/menu/Vegetables/vegitable5.png", title: "Cucumber", content: "India", price: "$4.00", description: "Fresh cucumbers from India. Cool and refreshing, perfect for salads.", reviews: generateReviews("Cucumber", "Vegitables", [4, 9, 14, 19]) },
        { id: 'veg-6', img: "/assets/img/menu/Vegetables/vegitable6.png", title: "Leafy mix", content: "India", price: "$8.00", description: "Mixed leafy greens from India. Fresh salad mix with various nutritious greens.", reviews: generateReviews("Leafy mix", "Vegitables", [0, 5, 10, 15]) },
        { id: 'veg-7', img: "/assets/img/menu/Vegetables/vegitable9.png", title: "Pumpkin", content: "India", price: "$6.00", description: "Fresh pumpkin from India. Sweet and versatile, perfect for soups and curries.", reviews: generateReviews("Pumpkin", "Vegitables", [1, 6, 11, 16]) },
        { id: 'veg-8', img: "/assets/img/menu/Vegetables/vegitable7.png", title: "Onion", content: "India", price: "$5.00", description: "Fresh onions from India. Essential cooking ingredient with strong flavor.", reviews: generateReviews("Onion", "Vegitables", [2, 7, 12, 17]) },
        { id: 'veg-9', img: "/assets/img/menu/Vegetables/vegitable8.png", title: "Potato", content: "India", price: "$4.00", description: "Fresh potatoes from India. Versatile and filling, perfect for various dishes.", reviews: generateReviews("Potato", "Vegitables", [3, 8, 13, 18]) },
        { id: 'veg-10', img: "/assets/img/menu/Vegetables/vegitable10.png", title: "Tomato", content: "India", price: "$5.00", description: "Fresh tomatoes from India. Juicy and flavorful, essential for cooking.", reviews: generateReviews("Tomato", "Vegitables", [4, 9, 14, 19]) }
    ]
};

export const getAllProducts = () => {
    const allProducts = [];
    Object.entries(productsByCategory).forEach(([categoryId, products]) => {
        products.forEach(product => {
            allProducts.push({ ...product, categoryId });
        });
    });
    return allProducts;
};

export const getProductsByCategory = (categoryId) => {
    return productsByCategory[categoryId] || [];
};

export const getProductById = (productId) => {
    const allProducts = getAllProducts();
    return allProducts.find(product => product.id === productId) || null;
};

