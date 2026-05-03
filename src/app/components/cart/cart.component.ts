import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];
  total: number = 0;
  success: boolean = false;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.getTotal();
  }

  getTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.getTotal();
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
    this.getTotal();
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateCart();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(this.cartItems.indexOf(item));
    }
    this.updateCart();
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.getTotal();
  }
  placeOrder() {
    const order = {
      userId: 1, // Example user ID
      date: new Date(),
      products: this.cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    this.cartService.createCart(order).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        this.success = true;
        this.clearCart();
      },
      (error) => {
        console.error('Error placing order:', error);
      },
    );
  }
}
