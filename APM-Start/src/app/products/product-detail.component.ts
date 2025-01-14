import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  errorMessage = "";
  product: IProduct | undefined;
  sub!: Subscription;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    const id= Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += ` ${id}`;
    if (id){
      this.getProduct(id);
    }
  }
  
  getProduct(id: number): void {
    this.sub = this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }
  
  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

}
