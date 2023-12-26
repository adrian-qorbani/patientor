import app from './app';
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server running on port http://localhost:${PORT}`);
   try {
    await mongoose.connect(
      process.env.DATABASE_URL as string
    );
    console.log("🛢️  Connected To MongoDB Database.");
  } catch (error) {
    console.log("⚠️ Error to connect Database:", error);
  }
});