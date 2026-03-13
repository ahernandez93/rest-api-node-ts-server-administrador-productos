import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.1.1',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: 'API Docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSPec = swaggerJSDoc(options)

export default swaggerSPec