import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string= 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    products: IProduct[] = [];
    errorMessage: string = '';
    sub!: Subscription; // The ! is to inform Typescript that we will handle this variable later. It wont be left unassigned.
    
    constructor(private productService: ProductService){}

    filteredProducts: IProduct[] = [];
    private _listFilter: string = ''; // Backing variable
    
    // Getter
    get listFilter(): string {
        return this._listFilter;
    }
    // Setter
    set listFilter(value: string) {
        this._listFilter = value
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }
    // Other Methods
    ngOnInit(): void { // Initializations
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
                this.products = products;
                this.filteredProducts = this.products; // Set filtered products to the initial products list, since we bind on it
            },
          error: err => this.errorMessage = err
        }); // Subscribe to get list of products
    }
    toggleImage(): void {
       this.showImage = !this.showImage;
    }
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filterBy));
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    ngOnDestroy(): void{
        this.sub.unsubscribe();
    }
}