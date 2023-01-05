class Game{
    id
    name
    discount_percent
    original_price
    final_price
    currency
    link
    genres
    large_image
    small_image
    medium_image
    shop
    constructor(name,discount_percent,original_price,final_price,currency,link,genres,large_image,small_image,medium_image,shop) {
      this.name=name;
      this.link=link;
      this.currency=currency;
      this.discount_percent=discount_percent;
      this.final_price=final_price;
      this.genres=genres;
      this.large_image=large_image;
      this.medium_image=medium_image;
      this.small_image=small_image;
      this.original_price=original_price;
      this.shop=shop;
  
    }
  }
  
  export default Game;