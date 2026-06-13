import type { Category, Product } from "@/types/database";

export const categoryNames = [
  "Microcontrollers",
  "Sensors",
  "Modules",
  "Motors",
  "Motor Drivers",
  "Batteries",
  "Power Systems",
  "Components",
  "Robotics Kits",
  "Project Packages"
];

export const placeholderCategories: Category[] = categoryNames.map((name, index) => ({
  id: `demo-category-${index + 1}`,
  name,
  slug: name.toLowerCase().replaceAll(" ", "-"),
  description: "Curated parts for student robotics and electronics builds.",
  image_url: null,
  sort_order: index + 1,
  is_active: true
}));

export const placeholderProducts: Product[] = [
  {
    id: "demo-arduino-uno",
    category_id: placeholderCategories[0].id,
    name: "Arduino Uno R3 Compatible",
    slug: "arduino-uno-r3-compatible",
    short_description: "Beginner-friendly microcontroller board for robotics projects.",
    description: null,
    price: 650,
    image_url: null,
    stock_status: "in_stock",
    is_featured: true,
    is_active: true,
    categories: { id: placeholderCategories[0].id, name: "Microcontrollers", slug: "microcontrollers" }
  },
  {
    id: "demo-ultrasonic",
    category_id: placeholderCategories[1].id,
    name: "HC-SR04 Ultrasonic Sensor",
    slug: "hc-sr04-ultrasonic-sensor",
    short_description: "Distance measurement module for obstacle avoidance bots.",
    description: null,
    price: 120,
    image_url: null,
    stock_status: "in_stock",
    is_featured: true,
    is_active: true,
    categories: { id: placeholderCategories[1].id, name: "Sensors", slug: "sensors" }
  },
  {
    id: "demo-l298n",
    category_id: placeholderCategories[4].id,
    name: "L298N Motor Driver Module",
    slug: "l298n-motor-driver-module",
    short_description: "Dual H-bridge driver for DC motors and robot chassis builds.",
    description: null,
    price: 180,
    image_url: null,
    stock_status: "low_stock",
    is_featured: true,
    is_active: true,
    categories: { id: placeholderCategories[4].id, name: "Motor Drivers", slug: "motor-drivers" }
  },
  {
    id: "demo-line-follower-kit",
    category_id: placeholderCategories[8].id,
    name: "Line Follower Robot Kit",
    slug: "line-follower-robot-kit",
    short_description: "Starter kit with chassis, sensors, motors, driver and guidance.",
    description: null,
    price: 1850,
    image_url: null,
    stock_status: "in_stock",
    is_featured: true,
    is_active: true,
    categories: { id: placeholderCategories[8].id, name: "Robotics Kits", slug: "robotics-kits" }
  }
];
