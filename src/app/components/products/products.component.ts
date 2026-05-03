import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading: boolean = false;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.loading = true;
    this.productsService.getProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data;
      this.loading = false;
    });
  }
  getCategories() {
    this.loading = true;
    this.categoriesService.getCategories().subscribe((data: any) => {
      console.log(data);
      this.categories = data;
      this.loading = false;
    });
  }
  getfilteredProducts(event: any) {
    let value = event.target.value;
    if (value === '') {
      this.getProducts();
    } else {
      this.getCategoryProducts(value);
    }
  }
  getCategoryProducts(category: string) {
    this.loading = true;
    this.categoriesService
      .getCategoryProducts(category)
      .subscribe((data: any) => {
        console.log(data);
        this.products = data;
        this.loading = false;
      });
  }
  //add to cart
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
