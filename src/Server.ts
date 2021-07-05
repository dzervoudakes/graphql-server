import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import chalk from 'chalk';
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

  private app;

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
    this.app.listen(process.env.PORT, () => {
      const { PORT = 3000 } = process.env;
      console.log(chalk.cyan(`Server listening on port ${PORT}.`));
    });
  }
}

export default Server;
