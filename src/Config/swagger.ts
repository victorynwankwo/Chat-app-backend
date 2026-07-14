import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Chat App API",
    version: "1.0.0",
    description: "REST API documentation for the chat application (rooms, messages, auth)",
  },
  servers: [
    {
      url: "http://localhost:3500",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // scan these files for JSDoc @swagger comments
  apis: ["./src/Routes/*.ts", "./src/Controllers/*.ts"],
};

export const swagger = swaggerJSDoc(options);