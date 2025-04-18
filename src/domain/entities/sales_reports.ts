export class SalesReport {
  constructor(
    public periodStart: Date,
    public periodEnd: Date,
    public totalSales: number,
    public productSold: number,
    public filePath: string,
    public id?: number,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ) {
    const requiredFields = {
      periodStart,
      periodEnd,
      totalSales,
      productSold,
      filePath,
    };

    Object.entries(requiredFields).forEach(([key, value]) => {
      if (value instanceof Date && isNaN(value.getTime())) {
        throw new Error(`${key} is required`);
      }

      if (value == null || (typeof value === 'string' && value.trim() == '')) {
        throw new Error(`${key} is required`);
      }
    });
  }
}
