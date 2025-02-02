export default class ProductDTO{
  constructor(newProduct){
    this.name = this.validateName(newProduct.name)
    this.stock = this.validateStock(newProduct.stock)
    this.price = this.validatePrice(newProduct.price)
    this.description = this.validateDescription(newProduct.description)
  }

  validateName(name){
    if(typeof name !== 'string' || name.length <= 0)
      throw new Error("Nombre no valido")

    return name
  }
  validateStock(stock){
    try {
      const stockInt = parseInt(stock)
      if( stockInt < 0 || !stockInt)
        throw new Error("El valor de stock no puede ser negativo");
      return stockInt
    } catch (error) {
      throw new Error(error.message);
      
    }
      
  }
  validatePrice(price){
    try {
      const priceFloat = parseFloat(price)
      if( priceFloat < 0 || !priceFloat)
        throw new Error("El valor de stock no puede ser negativo");

      return price
    } catch (error) {
      throw new Error(error.message);
      
    }
  }
  validateDescription(description){
    if(!description)
      return 'Descripción no disponible'
    return description
  }
}