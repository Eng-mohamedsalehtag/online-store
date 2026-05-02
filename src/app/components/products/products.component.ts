import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any[] = [];
  categories: any[] = [];
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.productsService.getProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data;
    });
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe((data: any) => {
      console.log(data);
      this.categories = data;
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
    this.categoriesService
      .getCategoryProducts(category)
      .subscribe((data: any) => {
        console.log(data);
        this.products = data;
      });
  }
}
