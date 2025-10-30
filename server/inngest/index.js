import { Inngest } from "inngest";
// 🛑 FIX: Changed the import path to explicitly include the file extension (.js)
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

/**
 * Inngest Function to sync user data from Clerk to the MongoDB database on creation.
 * Triggered by the 'clerk/user.created' event.
 */
const syncUserCreation = inngest.createFunction(
  {
    id: 'sync-user-from-clerk',
    event: 'clerk/user.created',
  },
  async ( { event } ) => {
    // Destructure the required fields from the event data
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    // Construct the user data object to match the Mongoose schema (User.js)
    const userData = {
      // Use the Clerk user ID as the MongoDB _id
      _id: id,
      // Get the primary email address
      email: email_addresses[0].email_address,
      // Combine first and last name
      name: `${first_name} ${last_name}`,
      // User profile image URL
      image: image_url
    };

    // Save the new user document to the database
    await User.create(userData);

    console.log(`Successfully synced new user: ${userData.email}`);
    
    return { success: true, message: `User ${id} synced successfully.` };
  }
)

/**
 * Inngest Function to update user data in the database when changes occur in Clerk.
 * Triggered by the 'clerk/user.updated' event.
 */
const syncUserUpdation = inngest.createFunction(
  {
    id: 'update-user-from-clerk',
    event: 'clerk/user.updated',
  },
  async ({ event }) => {
    // Destructure the required fields from the event data
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    // Construct the update data object
    const userData = {
      // Note: _id is included for completeness but is immutable in the database
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url
    };

    // Find the user by the Clerk ID (which is stored as the MongoDB _id) and update the document
    // The $set operator is implicitly handled by Mongoose's findByIdAndUpdate
    await User.findByIdAndUpdate(id, userData);

    console.log(`Successfully updated user with ID: ${id}`);
    
    return { success: true, message: `User ${id} updated successfully.` };
  }
)

/**
 * Inngest Function to delete user from the database.
 * Triggered by the 'clerk/user.deleted' event.
 */
const syncUserDeletion = inngest.createFunction(
  {
    id: 'delete-user-with-clerk',
    event: 'clerk/user.deleted',
  },
  async ({ event }) => {
    const { id } = event.data;
    
    // Find the user by the Clerk ID (which is stored as the MongoDB _id) and delete it
    await User.findByIdAndDelete(id);
    
    console.log(`Successfully deleted user with ID: ${id}`);
    
    return { success: true, message: `User ${id} deleted successfully.` };
  }
)

// Export all three Inngest functions so the server can register them
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
