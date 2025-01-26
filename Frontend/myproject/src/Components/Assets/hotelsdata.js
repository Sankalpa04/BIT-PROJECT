const hotels = [
  {
    id: 1,
    name: "Luxury Hotel",
    price: 120,
    img: "https://www.luxsphere.co/wp-content/uploads/luxury-hotels-in-dubai-armani-3--696x521.png",
    description: "Starting at $120/night",
    details: "Experience luxury and comfort in our top-rated hotel.",
    rooms: [
      { type: "Single Room", price: 120, capacity: 1 },
      { type: "Double Room", price: 180, capacity: 2 },
    ],
    availability: { startDate: "2024-12-20", endDate: "2025-01-10" },
    photos: [
      "https://www.luxsphere.co/wp-content/uploads/luxury-hotels-in-dubai-armani-3--696x521.png",
      "https://example.com/luxury-room2.jpg",
    ],
    reviews: [
      { text: "Amazing service and stunning views!", rating: 5 },
      { text: "Loved the amenities!", rating: 4 },
    ],
  },
  {
    id: 2,
    name: "Cozy Stay",
    price: 80,
    img: "https://cozy-stay-bali.ubudhotelsnow.com/data/Photos/700x500w/6863/686388/686388816.JPEG",
    description: "Starting at $80/night",
    details: "A charming and affordable stay in the heart of the city.",
    rooms: [
      { type: "Single Room", price: 80, capacity: 1 },
      { type: "Suite", price: 150, capacity: 2 },
    ],
    availability: { startDate: "2024-12-15", endDate: "2025-01-05" },
    photos: [
      "https://cozy-stay-bali.ubudhotelsnow.com/data/Photos/700x500w/6863/686388/686388816.JPEG",
      "https://example.com/cozy-room2.jpg",
    ],
    reviews: [
      { text: "Cozy and well-maintained.", rating: 4 },
      { text: "Perfect for budget travelers.", rating: 3 },
    ],
  },
  {
    id: 3,
    name: "Beach Resort",
    price: 150,
    img: "https://www.usnews.com/object/image/00000178-f4f5-d258-a5f9-fdf72e020000/lounge-area-restaurant.jpg?update-time=1725655129282&size=responsive640",
    description: "Starting at $150/night",
    details: "Relax by the beach and enjoy world-class hospitality.",
    rooms: [
      { type: "Beach Villa", price: 250, capacity: 4 },
      { type: "Standard Room", price: 150, capacity: 2 },
    ],
    availability: { startDate: "2024-12-22", endDate: "2025-01-12" },
    photos: [
      "https://www.usnews.com/object/image/00000178-f4f5-d258-a5f9-fdf72e020000/lounge-area-restaurant.jpg?update-time=1725655129282&size=responsive640",
      "https://example.com/beach-room2.jpg",
    ],
    reviews: [
      { text: "Spectacular location!", rating: 5 },
      { text: "A must-visit for beach lovers.", rating: 4 },
    ],
  },
];

export default hotels;
