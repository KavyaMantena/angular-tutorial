import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { ProductsService } from '../services/products.service';
import { PaginatorModule } from 'primeng/paginator';
import { Xliff } from '@angular/compiler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => console.log(error),
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.log(error),
      });
  }

  deleteProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.log(error),
      });
  }

  addProduct(product: Product) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.log(error),
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
