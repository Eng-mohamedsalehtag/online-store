import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  total: number = 0;
  success: boolean = false;
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
      this.getTotal();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  getTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    } else {
      this.cartService.removeFromCart(item.id);
    }
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
      (response: any) => {
        console.log('Order placed successfully:', response);
        this.success = true;
        this.clearCart();
      },
      (error: any) => {
        console.error('Error placing order:', error);
      },
    );
  }
}
