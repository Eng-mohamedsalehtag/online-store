import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  addToCart(product: any) {
    let cart = this.getCart();
    let existingProduct = cart.find((p: any) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  getCartCount(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }

  removeFromCart(productId: number) {
    let cart = this.getCart().filter((p: any) => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  updateQuantity(productId: number, quantity: number) {
    let cart = this.getCart();
    let product = cart.find((p: any) => p.id === productId);
    if (product) {
      product.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartSubject.next(cart);
      }
    }
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartSubject.next([]);
  }

  createCart(order: any) {
    return this.http.post('https://fakestoreapi.com/carts', order);
  }
}
