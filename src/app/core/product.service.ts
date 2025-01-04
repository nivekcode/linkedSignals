import {Injectable} from '@angular/core';

export interface Product {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PRODUCTS = [
    {
      title: "Wireless Headphones",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Experience high-quality sound with these wireless headphones, featuring noise cancellation and up to 20 hours of battery life.",
      price: 99.99,
    },
    {
      title: "Smartphone",
      imageUrl: "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Stay connected with this sleek smartphone, offering a powerful camera and long-lasting battery.",
      price: 699.99,
    },
    {
      title: "Gaming Laptop",
      imageUrl: "https://images.unsplash.com/photo-1684127987312-43455fd95925?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Level up your gaming experience with this high-performance gaming laptop equipped with a dedicated GPU.",
      price: 1499.99,
    },
    {
      title: "Bluetooth Speaker",
      imageUrl: "https://images.unsplash.com/photo-1605648916319-cf082f7524a1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Portable Bluetooth speaker with rich sound, perfect for outdoor adventures or parties.",
      price: 49.99,
    },
  ];
}
