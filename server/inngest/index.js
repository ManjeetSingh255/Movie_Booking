import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

/**
 * Inngest Function to sync user data from Clerk to MongoDB on creation.
 */
const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk', name: 'Sync user creation from Clerk' },
  { event: 'clerk/user.created' },  // ✅ Correct trigger placement
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.create(userData);
    console.log(`Successfully synced new user: ${userData.email}`);

    return { success: true, message: `User ${id} synced successfully.` };
  }
);

/**
 * Update user when Clerk user is updated.
 */
const syncUserUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk', name: 'Update user from Clerk' },
  { event: 'clerk/user.updated' },  // ✅ Correct trigger placement
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData);
    console.log(`Successfully updated user with ID: ${id}`);

    return { success: true, message: `User ${id} updated successfully.` };
  }
);

/**
 * Delete user when Clerk user is deleted.
 */
const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk', name: 'Delete user from Clerk' },
  { event: 'clerk/user.deleted' },  // ✅ Correct trigger placement
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
    console.log(`Successfully deleted user with ID: ${id}`);
    return { success: true, message: `User ${id} deleted successfully.` };
  }
);

// Export all three Inngest functions
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
