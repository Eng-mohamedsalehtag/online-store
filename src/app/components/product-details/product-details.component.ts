import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId: any;
  product: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.getProduct();
    });
  }

  getProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let existingProduct = cart.find((p: any) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.toastr.success('Product added to cart 🛒', 'Success');
  }
}
