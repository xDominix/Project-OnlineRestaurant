
export class Dish {
    id!:string;
    name:string;
    price:number;
    category:string;
    region:string;
    ingredients?:String[];
    maxAmount:number;
    description?:String;
    photosDirectory?:String;
    rating:number;

    constructor(name:string,price:number,category:string,region:string,ingredients:string[],maxAmount:number,description:string,photosDirectory:string,rating:number)
    {
      this.name = name;
      this.price = price;
      this.category = category;
      this.region = region;
      this.ingredients = ingredients;
      this.maxAmount = maxAmount;
      this.description = description;
      this.photosDirectory = photosDirectory;
      this.rating = rating;

    }
  }