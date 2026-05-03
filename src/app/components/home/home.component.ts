import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];
  categories: any[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  loadFeaturedProducts(): void {
    this.productsService.getProducts().subscribe((products: any) => {
      this.featuredProducts = products.slice(0, 4); // Get first 4 products as featured
    });
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe((categories: any) => {
      this.categories = categories.map((cat: string) => ({ name: cat }));
      console.log(this.categories);
    });
  }
}
