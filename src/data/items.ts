export interface Item {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
  image: string;
  type: "lost" | "found";
  matchScore?: number;
}

export const dummyItems: Item[] = [
  {
    id: 1,
    title: "Navy Blue Backpack",
    category: "Bags",
    location: "Central Library, Floor 2",
    date: "2024-06-10",
    description:
      "A navy blue Jansport backpack with a red keychain. Contains notebooks and a charger.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    type: "lost",
    matchScore: 92,
  },
  {
    id: 2,
    title: "iPhone 14 Pro",
    category: "Electronics",
    location: "Cafeteria, Table 5",
    date: "2024-06-11",
    description:
      "Black iPhone 14 Pro with a cracked screen protector. Has a dark green case.",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&q=80",
    type: "found",
    matchScore: 85,
  },
  {
    id: 3,
    title: "Silver Car Keys",
    category: "Keys",
    location: "Parking Lot B",
    date: "2024-06-09",
    description:
      "Toyota car keys with a small panda plush keychain attached.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    type: "lost",
    matchScore: 78,
  },
  {
    id: 4,
    title: "Prescription Glasses",
    category: "Accessories",
    location: "Room 204, Science Block",
    date: "2024-06-12",
    description:
      "Black rectangular frame prescription glasses. Left lens has a small scratch.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80",
    type: "found",
    matchScore: 88,
  },
  {
    id: 5,
    title: "Brown Leather Wallet",
    category: "Accessories",
    location: "Student Union",
    date: "2024-06-08",
    description:
      "Brown leather bifold wallet. Contains ID cards and some cash.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    type: "lost",
    matchScore: 70,
  },
  {
    id: 6,
    title: "AirPods Pro",
    category: "Electronics",
    location: "Gym Locker Room",
    date: "2024-06-13",
    description:
      "White AirPods Pro in a white charging case. Name 'Alex' written inside lid.",
    image: "https://images.unsplash.com/photo-1588156979435-379b9d802b0a?w=400&q=80",
    type: "found",
    matchScore: 95,
  },
  {
    id: 7,
    title: "Purple Water Bottle",
    category: "Drinkware",
    location: "Sports Field",
    date: "2024-06-07",
    description:
      "Large purple Hydro Flask with stickers on the side. 32oz capacity.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    type: "lost",
    matchScore: 60,
  },
  {
    id: 8,
    title: "Student ID Card",
    category: "Documents",
    location: "Main Entrance",
    date: "2024-06-14",
    description:
      "University student ID card for Jordan Lee, Student #20219834.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    type: "found",
    matchScore: 82,
  },
];

export const categories = [
  "All",
  "Bags",
  "Electronics",
  "Keys",
  "Accessories",
  "Documents",
  "Drinkware",
  "Clothing",
  "Other",
];

export const chatMessages = [
  {
    id: 1,
    sender: "system",
    text: "This chat was opened after your claim was submitted. Please coordinate the handover here.",
    time: "10:00 AM",
  },
  {
    id: 2,
    sender: "other",
    name: "Campus Security",
    text: "Hi! We've reviewed your claim. The item matches your description. When are you available to pick it up?",
    time: "10:02 AM",
  },
  {
    id: 3,
    sender: "me",
    text: "Hello! I'm available today between 2 PM and 5 PM or tomorrow morning.",
    time: "10:05 AM",
  },
  {
    id: 4,
    sender: "other",
    name: "Campus Security",
    text: "Great! Please come to the Security Office at Building A, Ground Floor at 3 PM today. Bring your student ID.",
    time: "10:07 AM",
  },
  {
    id: 5,
    sender: "me",
    text: "Perfect, I'll be there. Thank you so much! 🙏",
    time: "10:09 AM",
  },
  {
    id: 6,
    sender: "other",
    name: "Campus Security",
    text: "See you then. The handover status will be updated to Completed once you collect the item.",
    time: "10:10 AM",
  },
];
