import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Listen for the 'connected' event to confirm a successful connection.
    mongoose.connection.on('connected', () => console.log('✅ Database connected successfully'));

    // Attempt to connect to MongoDB using the URI from environment variables
    // and appending the specific database name 'quickshow'.
    const connectionUri = `${process.env.MONGODB_URI}/quickshow`;
    
    console.log(`Attempting to connect to: ${connectionUri}`);

    await mongoose.connect(connectionUri);
    
  } catch (error) {
    // Log any errors that occur during the connection attempt.
    console.error(' MongoDB connection error:');
    console.log(error.message);
    
    // Optional: Exit the process if the connection fails critically
    // process.exit(1); 
  }
};

export default connectDB;
