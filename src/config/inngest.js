import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "../models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ModernMart" });


export const syncUserCreation = inngest.createFunction(
  {id: "sync-user-from-clerk"},{ event: "clerk/user.created" },
  async ({ event }) => {
    const {id,first_name,last_name,email_addresses,image_url,username} = event.data;
    const userData= {
      _id:id,
      name: `${first_name} ${last_name}`,
      userid: username,
      email: email_addresses[0].email_address,
      imageUrl: image_url, //TODO Fallback image URL
    }
    await dbConnect()
    await User.create(userData);
  }
)

export const syncUserUpdation = inngest.createFunction(
 {id: "update-user-from-clerk"},{ event: "clerk/user.updated" },
  async ({ event }) => {
    const {id,first_name,last_name,email_addresses,image_url,username} = event.data;
    const userData= {
      _id:id,
      name: `${first_name} ${last_name}`,
            userid: username,
      email: email_addresses[0].email_address,
      imageUrl: image_url, //TODO Fallback image URL
    }
    await dbConnect()
    await User.findByIdAndUpdate(id, userData);
  }
)

export const syncUserDeletion = inngest.createFunction(
  {id: "delete-user-from-clerk"},{ event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await dbConnect();
    await User.findByIdAndDelete(id);
  }
)