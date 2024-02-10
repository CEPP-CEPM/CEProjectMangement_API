export default () => ({
    // port: parseInt(process.env.PORT, 10) || 3000,
    // database: {
    //   host: process.env.DB_HOST,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   port: parseInt(process.env.DB_PORT, 10) || 5432,
    // },
    // jwt: {
    //   secret: process.env.JWT_SECRET,
    //   expire: process.env.JWT_EXPIRE,
    // },
    google: {
      secret: process.env.GOOGLE_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
    //   callback: process.env.GOOGLE_CALLBACK_URL,
    },
    // minio: {
    //   endpoint: process.env.MINIO_ENDPOINT,
    //   port: parseInt(process.env.MINIO_PORT),
    //   useSSL: Boolean(process.env.MINIO_SSL),
    //   accessKey: process.env.MINIO_ACCESSKEY,
    //   secretKey: process.env.MINIO_SECRETKEY,
    // },
    // whitelist: process.env.WHITELIST,
    // node_env: process.env.NODE_ENV,
  });