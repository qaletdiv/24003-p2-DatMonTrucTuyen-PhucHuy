import { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
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
    id: "3",
    name: "Spaghetti Bolognese",
    price: 89000,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600",
    category: "Pasta",
    description: "Spaghetti with rich tomato and minced beef sauce.",
    special: true,
  },
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
    id: "5",
    name: "Tuna Salad",
    price: 69000,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    category: "Salad",
    description: "Fresh lettuce, tuna, boiled egg, and sesame dressing.",
    special: false,
  },
  {
    id: "6",
    name: "Peach Orange Lemongrass Tea",
    price: 39000,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
    category: "Beverages",
    description: "Peach tea blended with fresh orange and fragrant lemongrass.",
    special: false,
  },
];
