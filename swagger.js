import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Moderators Api documentation',
      version: '1.0.0',
      description: 'Moderators api documentation',
    },
    servers: [
      {
        url: 'http://localhost:5005',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
