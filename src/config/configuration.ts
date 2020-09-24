export default () => ({
    port: process.env.PORT,
    jwtSecret: process.env.SECRET_KEY,
    expiresIn: process.env.expiresIn,
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
    }
});