import app from './app';
import { connectDB } from './db';
import { PORT } from './config';

async function bootstrap() {
  try {
    await connectDB();
    app.listen(PORT)
    console.log(`Listening on port ${PORT}`);
  } catch (e) {
    console.log(e)
  }
}

bootstrap();