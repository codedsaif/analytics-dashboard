import { faker } from "@faker-js/faker";
import axios from "axios";

export function createRandomUser() {
  const socialSource = [
    "Facebook",
    "Twitter",
    "Instagram",
    "LinkedIn",
    "Others",
  ][Math.floor(Math.random() * 3)];
  const device = ["Desktop", "Tablet", "Mobile"][Math.floor(Math.random() * 3)];

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city,
      state: faker.location.state(),
      country: faker.location.country(),
      zipcode: faker.location.zipCode(),
    },
    socialSource: socialSource,
    device: device,
    createdAt: faker.date.recent(),
    lastLogin: faker.date.recent(),
  };
}

// export const USERS = Array.from({ length: 5 }, createRandomUser);
// console.log(USERS);

let category = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Toys & Games",
  "Health & Wellness",
  "Automotive",
  "Jewelry & Watches",
  "Pet Supplies",
  "Furniture",
  "Baby & Kids",
  "Office Supplies",
  "Food & Beverages",
  "Arts & Crafts",
  "Tools & Home Improvement",
  "Electronics Accessories",
  "Musical Instruments",
  "Outdoor Equipment",
];
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "cyan",
  "magenta",
  "brown",
];
export function createRandomProducts() {
  const price = faker.number.float({ min: 20, max: 2000 });
  const stock = faker.number.int({ min: 0, max: 2000 });
  const salesCount = faker.number.int({ min: 0, max: stock });
  const revenue = price * salesCount;
  const profitMargin = faker.number.float({ min: 0.1, max: 0.5 });
  const discount = faker.number.float({ min: 0, max: 0.3 });
  const discountedPrice = price * (1 - discount);
  const returnRate = faker.number.float({ min: 0, max: 0.3 });

  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: category[Math.floor(Math.random() * category.length)],
    price: price,
    stock: stock,
    image: faker.image.url(),
    brand: faker.company.name(),
    attributes: {
      color: colors[Math.floor(Math.random() * colors.length)],
      material: faker.commerce.productMaterial(),
      size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
    },
    rating: faker.number.int({ min: 1, max: 5 }),
    reviews: faker.number.int({ min: 5, max: 500 }),
    salesCount: faker.number.int({ min: 0, max: 2000 }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    rating: faker.number.int({ min: 1, max: 5 }),
    reviews: faker.number.int({ min: 5, max: 500 }),
    salesCount: salesCount,
    revenue: revenue,
    profitMargin: profitMargin,
    discount: discount,
    discountedPrice: discountedPrice,
    returnRate: returnRate,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    shippingCost: faker.number.float({ min: 0, max: 20 }),
    deliveryTime: faker.number.int({ min: 1, max: 7 }),
  };
}

// export const PRODUCTS = Array.from({ length: 5 }, createRandomProducts);
// console.log(PRODUCTS);

async function generateData(
  type = "products",
  fun = createRandomProducts,
  number = 5
) {
  try {
    const data = Array.from({ length: number }, () => fun());
    await postData(type, data);
  } catch (error) {
    console.error("Error generating orders:", error);
  }
}

// generateData("products", createRandomProducts, 1000);
// generateData("users", createRandomUser, 1000);

export function createRandomOrders(users, products) {
  const userIndex = faker.number.int({ min: 0, max: users.length });
  const productIndex = faker.number.int({ min: 0, max: users.length });

  const user = users[userIndex];
  const product = products[productIndex];

  const price = faker.number.float({ min: 20, max: 2000 });
  const quantity = faker.number.int({ min: 0, max: 10 });

  return {
    id: faker.string.uuid(),
    productId: faker.string.uuid(),
    userId: faker.string.uuid(),
    price: price,
    quantity: quantity,
    date: faker.date.recent(),
  };
}

async function generateOrders(number = 100) {
  try {
    const users = await fetchData("users");
    const products = await fetchData("products");

    const orders = Array.from({ length: number }, () =>
      createRandomOrders(users, products)
    );
    await postData("orders", orders);
  } catch (error) {
    console.error("Error generating orders:", error);
  }
}

generateOrders(2000);
// fetch data from json
async function fetchData(endpoint) {
  try {
    const response = await axios.get(`http://localhost:3000/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// posting data to json
async function postData(endpoint, data) {
  try {
    // console.log(data);
    for (const item of data) {
      await axios.post(
        `http://localhost:3000/${endpoint}`,
        JSON.stringify(item)
      );
    }
    console.log(`${endpoint} posted successfully`);
  } catch (error) {
    console.error(`Error posting ${endpoint} :`, error);
  }
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

// const dailySales = ordersData.reduce((acc, order) => {
//     const date = new Date(order.date).toLocaleDateString();
//     acc[date] = (acc[date] || 0) + (order.price * order.quantity);
//     return acc;
//   }, {});

// OLD CODE
// module.exports = () => {
//   const data = {
//     products: [],
//   };
//   for (let i = 0; i < 1000; i++) {
//     data.products.push({
//       id: i,
//       name:
//         Math.random().toString(36).substring(2, 15) +
//         Math.random().toString(36).substring(2, 15),
//       price:
//         Math.random().toString(36).substring(2, 15) +
//         Math.random().toString(36).substring(2, 15),
//       image:
//         Math.random().toString(36).substring(2, 15) +
//         Math.random().toString(36).substring(2, 15),
//     });
//   }
//   return data;
// };
