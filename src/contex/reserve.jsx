// // Add or update a product in the cart
// const addOrUpdatePurchasedProduct = (product) => {
//   setPurchasedProducts((prevProducts) => {
//     const existingProduct = prevProducts.find((p) => p._id === product._id);

//     let updatedProducts;
//     if (existingProduct) {
//       // Update quantity if the product exists
//       updatedProducts = prevProducts.map((p) =>
//         p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
//       );
//     } else {
//       // Add new product to the cart
//       updatedProducts = [...prevProducts, { ...product, quantity: 1 }];
//     }

//     return updatedProducts;
//   });

//   // Optionally, update the product quantity in the context
//   setProductQuantity((prevQuantity) => prevQuantity + 1);
// };

// // Remove a product from the cart
// const removeProductFromCart = (productId) => {
//   setPurchasedProducts((prevProducts) =>
//     prevProducts.filter((p) => p._id !== productId)
//   );
// };

// // Clear the entire cart
// const clearCart = () => {
//   setPurchasedProducts([]);
// };

//  const fetchAccountBalance = async () => {
//     if (!phoneNum) {
//       return;
//     } else {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/wallet/${phoneNum}`,
//           {
//             method: "GET",
//             credentials: "include", // <-- this is important!
//             // headers: {
//             //   Authorization: `Bearer ${token}`, // <-- Add your token here
//             // }
//           }
//         );
//         const data = await res.json();
//         if (res.ok && data.balance !== undefined) {
//           setAccountBalance(data.balance);
//           console.log("Account balance fetched:", data.balance);
//         }
//       } catch (err) {
//         console.error("Failed to fetch account balance:", err);
//       }
//     }
//   };

//  useEffect(() => {
//     fetchAccountBalance();
//     // eslint-disable-next-line
// //   }, [phoneNum]);
