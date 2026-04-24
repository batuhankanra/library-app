import { Request, Response } from "express";
import * as adminService from "../services/admin_service";
import { User } from "../models/user";


export const getUser = async (req: any, res: Response) => {
  try {
    const data = await adminService.getUsersWithPenalties();

    res.json({
      totalUsers: data.length,
      users: data,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserOne = async (req: any, res: Response) => {
  try {
    const id=req.params.id as string
    const data = await adminService.getUserOne(id);

    res.json({
      users: data,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUserByAdmin = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;

    const {name,email,role,penaltyPoints,debt} = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        ...(penaltyPoints !== undefined && { penaltyPoints }),
        ...(debt !== undefined && { debt }),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json({
      message: "Kullanıcı güncellendi",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    await User.findByIdAndDelete(userId);

    res.json({ message: "Kullanıcı silindi" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};