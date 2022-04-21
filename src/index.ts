import app from './app';
import { connectDB } from './db';

const port = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await connectDB();
    app.listen(port)
    console.log(`Listening on port ${port}`);
  } catch (e) {
    console.log(e)
  }
}

bootstrap();