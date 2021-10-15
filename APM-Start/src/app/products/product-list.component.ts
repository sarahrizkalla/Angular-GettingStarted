import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string= 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    products: IProduct[] = [];
    
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
        this.products = this.productService.getproducts(); // Get list of products
        this.filteredProducts = this.products; // Set filtered products to the initial products list, since we bind on it
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
}