import mongoose from 'mongoose';
import dotenv from 'dotenv';

class Config {
  private static instance: Config;
  private envConfig: { [key: string]: string };

  private constructor() {
    const env = process.env.NODE_ENV || 'development';
    dotenv.config({ path: `.env.${env}` });

    this.envConfig = {
      MONGO_URI: process.env.MONGO_URI || '',
      PORT: process.env.PORT || '3000',
      JWT_SECRET: process.env.JWT_SECRET || 'secret',
    };
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public async connectDB(): Promise<void> {
    try {
      await mongoose.connect(this.envConfig.MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit process with failure
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}

export default Config;
