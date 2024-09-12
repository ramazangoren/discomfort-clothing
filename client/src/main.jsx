import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { AddClothesProvider } from "./hooks/TShirtContext.jsx";
import { ListProvider } from "./hooks/ListContext";
import { CatalogueProvider } from "./hooks/CatalogueContext.jsx";
import { ProductDetailsProvider } from "./hooks/ProductDetailsContext";
import { ProfileProvider } from "./hooks/ProfileContext";
import { CartProvider } from "./hooks/CartContext.jsx";
import { ReviewProvider } from "./hooks/ReviewContext";
import { OrderProvider } from "./hooks/OrderContext.jsx";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AddClothesProvider>
        <ListProvider>
          <CatalogueProvider>
            <ProductDetailsProvider>
              <ProfileProvider>
                <CartProvider>
                  <ReviewProvider>
                    <OrderProvider>
                      <App />
                    </OrderProvider>
                  </ReviewProvider>
                </CartProvider>
              </ProfileProvider>
            </ProductDetailsProvider>
          </CatalogueProvider>
        </ListProvider>
      </AddClothesProvider>
    </AuthProvider>
  </BrowserRouter>
);
