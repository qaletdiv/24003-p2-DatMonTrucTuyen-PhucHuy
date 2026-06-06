import { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
  // ── Burger ──────────────────────────────────────────
  {
    id: "1",
    name: "Cheese Beef Burger",
    price: 79000,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    category: "Burger",
    description:
      "Australian beef patty grilled to perfection, melted cheddar cheese, fresh lettuce, and special sauce.",
    special: true,
  },
  {
    id: "7",
    name: "Crispy Chicken Burger",
    price: 69000,
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1571a423?w=600",
    category: "Burger",
    description:
      "Crispy fried chicken fillet with pickles, coleslaw, and tangy mayo on a brioche bun.",
    special: false,
  },
  {
    id: "8",
    name: "Double Smash Burger",
    price: 99000,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600",
    category: "Burger",
    description:
      "Two thin smashed beef patties, American cheese, caramelized onions, and house-made burger sauce.",
    special: false,
  },
  {
    id: "9",
    name: "BBQ Bacon Burger",
    price: 89000,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600",
    category: "Burger",
    description:
      "Juicy beef patty topped with crispy bacon, cheddar, onion rings, and smoky BBQ sauce.",
    special: true,
  },
  {
    id: "10",
    name: "Mushroom Swiss Burger",
    price: 85000,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600",
    category: "Burger",
    description:
      "Grilled beef patty with sautéed mushrooms, melted Swiss cheese, and garlic aioli.",
    special: false,
  },

  // ── Pizza ───────────────────────────────────────────
  {
    id: "2",
    name: "Seafood Pizza",
    price: 159000,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
    category: "Pizza",
    description:
      "Crispy crust topped with shrimp, squid, crab sticks, and melted mozzarella.",
    special: true,
  },
  {
    id: "11",
    name: "Margherita Pizza",
    price: 119000,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
    category: "Pizza",
    description:
      "Classic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella, and basil.",
    special: false,
  },
  {
    id: "12",
    name: "Pepperoni Pizza",
    price: 139000,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
    category: "Pizza",
    description:
      "Loaded with spicy pepperoni, mozzarella cheese, and oregano on a hand-tossed crust.",
    special: true,
  },
  {
    id: "13",
    name: "BBQ Chicken Pizza",
    price: 149000,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    category: "Pizza",
    description:
      "Grilled chicken, red onion, cilantro, and smoky BBQ sauce on a golden crust.",
    special: false,
  },
  {
    id: "14",
    name: "Four Cheese Pizza",
    price: 145000,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600",
    category: "Pizza",
    description:
      "A rich blend of mozzarella, gorgonzola, parmesan, and gouda on a thin crust.",
    special: false,
  },

  // ── Pasta ───────────────────────────────────────────
  {
    id: "3",
    name: "Spaghetti Bolognese",
    price: 89000,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600",
    category: "Pasta",
    description: "Spaghetti with rich tomato and minced beef sauce.",
    special: true,
  },
  {
    id: "15",
    name: "Carbonara",
    price: 95000,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600",
    category: "Pasta",
    description:
      "Creamy egg and parmesan sauce with crispy pancetta over al dente spaghetti.",
    special: false,
  },
  {
    id: "16",
    name: "Penne Arrabbiata",
    price: 79000,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600",
    category: "Pasta",
    description:
      "Penne pasta tossed in a spicy tomato sauce with garlic and red chili flakes.",
    special: false,
  },
  {
    id: "17",
    name: "Shrimp Alfredo",
    price: 109000,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600",
    category: "Pasta",
    description:
      "Fettuccine in a rich, creamy Alfredo sauce topped with sautéed garlic shrimp.",
    special: true,
  },
  {
    id: "18",
    name: "Pesto Fusilli",
    price: 85000,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    category: "Pasta",
    description:
      "Fusilli pasta with homemade basil pesto, cherry tomatoes, and pine nuts.",
    special: false,
  },

  // ── Combo ───────────────────────────────────────────
  {
    id: "4",
    name: "Fried Chicken Combo for 2",
    price: 199000,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600",
    category: "Combo",
    description:
      "4 crispy fried chicken pieces, 2 servings of fries, and 2 medium soft drinks.",
    special: true,
  },
  {
    id: "19",
    name: "Family Feast Combo",
    price: 399000,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    category: "Combo",
    description:
      "1 large pizza, 6 chicken wings, garlic bread, coleslaw, and 4 soft drinks.",
    special: true,
  },
  {
    id: "20",
    name: "Burger & Fries Combo",
    price: 109000,
    image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=600",
    category: "Combo",
    description:
      "Choice of any classic burger with a large fries and a medium soft drink.",
    special: false,
  },
  {
    id: "21",
    name: "Pasta & Salad Duo",
    price: 129000,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
    category: "Combo",
    description:
      "Any pasta of your choice paired with a fresh garden salad and breadsticks.",
    special: false,
  },

  // ── Salad ───────────────────────────────────────────
  {
    id: "5",
    name: "Tuna Salad",
    price: 69000,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    category: "Salad",
    description: "Fresh lettuce, tuna, boiled egg, and sesame dressing.",
    special: false,
  },
  {
    id: "22",
    name: "Caesar Salad",
    price: 75000,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600",
    category: "Salad",
    description:
      "Crisp romaine lettuce, parmesan, croutons, and creamy Caesar dressing.",
    special: true,
  },
  {
    id: "23",
    name: "Greek Salad",
    price: 72000,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600",
    category: "Salad",
    description:
      "Tomato, cucumber, red onion, olives, and feta cheese with olive oil dressing.",
    special: false,
  },
  {
    id: "24",
    name: "Grilled Chicken Salad",
    price: 85000,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    category: "Salad",
    description:
      "Mixed greens with grilled chicken breast, avocado, cherry tomatoes, and balsamic vinaigrette.",
    special: false,
  },

  // ── Beverages ───────────────────────────────────────
  {
    id: "6",
    name: "Peach Orange Lemongrass Tea",
    price: 39000,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
    category: "Beverages",
    description: "Peach tea blended with fresh orange and fragrant lemongrass.",
    special: false,
  },
  {
    id: "25",
    name: "Mango Smoothie",
    price: 45000,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600",
    category: "Beverages",
    description:
      "Thick and creamy smoothie made with ripe mango, yogurt, and a hint of honey.",
    special: true,
  },
  {
    id: "26",
    name: "Iced Vietnamese Coffee",
    price: 35000,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    category: "Beverages",
    description:
      "Strong Vietnamese drip coffee with sweetened condensed milk served over ice.",
    special: false,
  },
  {
    id: "27",
    name: "Fresh Watermelon Juice",
    price: 32000,
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=600",
    category: "Beverages",
    description:
      "Freshly pressed watermelon juice with a squeeze of lime, no added sugar.",
    special: false,
  },
  {
    id: "28",
    name: "Matcha Latte",
    price: 49000,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600",
    category: "Beverages",
    description:
      "Premium Japanese matcha whisked with steamed milk, lightly sweetened.",
    special: false,
  },

  // ── Dessert ─────────────────────────────────────────
  {
    id: "29",
    name: "Chocolate Lava Cake",
    price: 59000,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600",
    category: "Dessert",
    description:
      "Warm chocolate cake with a molten center, served with vanilla ice cream.",
    special: true,
  },
  {
    id: "30",
    name: "Tiramisu",
    price: 55000,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600",
    category: "Dessert",
    description:
      "Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone cream.",
    special: false,
  },
  {
    id: "31",
    name: "Mango Sticky Rice",
    price: 49000,
    image: "https://images.unsplash.com/photo-1621293954908-907159247fc8?w=600",
    category: "Dessert",
    description:
      "Sweet sticky rice topped with ripe mango slices and coconut cream.",
    special: false,
  },
  {
    id: "32",
    name: "Crème Brûlée",
    price: 52000,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600",
    category: "Dessert",
    description:
      "Silky vanilla custard with a crisp caramelized sugar top.",
    special: true,
  },

  // ── Sides ───────────────────────────────────────────
  {
    id: "33",
    name: "French Fries",
    price: 35000,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
    category: "Sides",
    description:
      "Golden crispy fries seasoned with sea salt, served with ketchup.",
    special: false,
  },
  {
    id: "34",
    name: "Onion Rings",
    price: 39000,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=600",
    category: "Sides",
    description:
      "Thick-cut onion rings in a light, crispy batter with ranch dipping sauce.",
    special: false,
  },
  {
    id: "35",
    name: "Chicken Wings (6 pcs)",
    price: 79000,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600",
    category: "Sides",
    description:
      "Crispy buffalo wings tossed in your choice of hot, BBQ, or honey garlic sauce.",
    special: true,
  },
  {
    id: "36",
    name: "Garlic Bread",
    price: 29000,
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=600",
    category: "Sides",
    description:
      "Toasted baguette slices with garlic butter and a sprinkle of parsley.",
    special: false,
  },
  {
    id: "37",
    name: "Mozzarella Sticks",
    price: 55000,
    image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=600",
    category: "Sides",
    description:
      "Breaded mozzarella sticks fried until golden, served with marinara sauce.",
    special: false,
  },
];
