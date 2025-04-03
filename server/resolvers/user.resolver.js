import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
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
        const hashedPassword = await bcrypt.hash(password, sat);
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
        if (!username || !password) {
          throw new Error("All fields are required");
        }
        await context.authenticate("graphql-local", { username, password });
        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    logout: async (_, _, context) => {
      try {
        await context.logout();
        req.session.destroy((err) => {
          if (err) {
            throw new Error("Failed to destroy session");
          }
        });
        res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error logging out:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, _, context) => {
      try {
        const user = await context.getUser();
        return user;
        } catch (error) {
            console.error("Error fetching authenticated user:", error);
            throw new Error(error.message || "Internal server error");
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
  Mutation: {},
};

export default userResolver;
