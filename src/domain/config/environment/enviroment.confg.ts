export const config = async () => {
  return {
    port: process.env.PORT,
    prefix: process.env.PREFIX,

    // Database Config
    databaseHost: process.env.DATABASE_HOST,
    databasePort: +process.env.DATABASE_PORT,
    databaseUsername: process.env.DATABASE_USERNAME,
    databasePassword: process.env.DATABASE_PASSWORD,
    databaseName: process.env.DATABASE,

    // Auth Config
    jwtSecret: process.env.JWT_SECRET,

    // PayPal Config
    getPaypalTokenUrl: process.env.GET_PAYPAL_TOKEN_URL,
    createPaypalOrderUrl: process.env.CREATE_PAYPAL_ORDER_URL,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  };
};
