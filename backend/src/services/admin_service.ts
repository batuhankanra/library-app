import { User } from "../models/user";
import { Borrow } from "../models/borrow";

export const getUsersWithPenalties = async () => {
  const users = await User.find().select("-password");

  const result = await Promise.all(
    users.map(async (user) => {
      const activeBorrows = await Borrow.countDocuments({
        userId:user._id ,
        returnDate: null,
      });

      const lateBorrows = await Borrow.countDocuments({
        userId: user._id,
        returnDate: null,
        dueDate: { $lt: new Date() },
      });

      return {
        user,
        stats: {
          activeBorrows,
          lateBorrows,
          penaltyPoints: user.penaltyPoints,
          debt: user.debt,
        },
      };
    })
  );

  return result;
};