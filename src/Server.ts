import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';

import { Schema as schema } from './schema';

class Server {
  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.setupDatabaseConnection();
    this.setupGraphQL();
  }

  public app;

  private async setupDatabaseConnection(): Promise<void> {
    await mongoose.connect(process.env.DB_CONNECTION_STRING || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(chalk.cyan('Database connection successful.'));
  }

  private setupGraphQL(): void {
    this.app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
  }

  public start(): void {
    const PORT = process.env.PORT || 3000;

    this.app.listen(PORT, () => {
      console.log(chalk.cyan(`Server listening on port ${PORT}.`));
    });
  }
}

export default Server;
