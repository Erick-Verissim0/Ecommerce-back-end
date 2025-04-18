export class Product {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public id?: number,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ) {
    const requiredFields = { name, description, price, stock };

    Object.entries(requiredFields).forEach(([key, value]) => {
      if (value == null || (typeof value === 'string' && value.trim() === '')) {
        throw new Error(`${key} is required`);
      }
    });
  }
}
