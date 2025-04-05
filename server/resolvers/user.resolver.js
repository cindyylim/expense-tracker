import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, gender, name, password } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new Error("Username already in use");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const user = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        await user.save();
        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error signing up:", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    login: async (_, { input }, context) => {
        try {
            const { username, password } = input;
            if (!username || !password) throw new Error("All fields are required");
            const { user } = await context.authenticate("graphql-local", { username, password });

            await context.login(user);
            return user;
        } catch (err) {
            console.error("Error in login:", err);
            throw new Error(err.message || "Internal server error");
        }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
            if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error logging out:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        return context.getUser();
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
        return null;
      }
    },
    user: async (_, {userId}) => {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw new Error(error.message || "Internal server error");
        }
    }
  },
};

export default userResolver;
