"use client";
import { updateUserProfile } from "@/query/users";
import { motion } from "framer-motion";
import { Camera, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

interface UserProfile {
  name: string;
  email: string;
  bio: string | null;
  password: string;
  confirmPassword: string;
}

const ProfileForm = ({
  user,
  token,
}: {
  user: {
    fullName: string;
    email: string;
    bio: string | null;
    id: string;
  } | null;
  token?: string;
}) => {
  const initialProfile: UserProfile = {
    name: user?.fullName || "",
    email: user?.email || "",
    bio: user?.bio || "",
    password: "",
    confirmPassword: "",
  };

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [imagePreview, setImagePreview] = useState<string | null>("/user.png");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedProfile = {
      fullName: profile.name,
      bio: profile?.bio || "",
      password: profile.password || undefined,
    };

    const response = await updateUserProfile(
      user.id,
      updatedProfile,
      token || null
    );
    if (!response.status) {
      console.error("Failed to update profile:", response.error);
      toast.error(`Error: ${response.error}`);
      return;
    }
    toast.success("Profile updated successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900/50 rounded-lg shadow-lg p-6 border border-slate-500/20"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={imagePreview || "/placeholder.svg?height=128&width=128"}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full rounded-full object-cover"
            />
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-300"
            >
              <Camera size={20} />
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white/80"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-slate-600 border  text-white/70 px-2 py-2 shadow-sm bg-slate-700/50   focus-visible:ring-blue-500 focus-visible:outline-none  focus:border-purple-500 focus:border "
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/80"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            disabled
            placeholder="You can't change your email"
            value={profile.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-slate-600 border  text-white/70 px-2 py-2 shadow-sm bg-slate-700/50   focus-visible:ring-blue-500 focus-visible:outline-none  focus:border-purple-500 focus:border "
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/80"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Leave blank to keep the same"
            name="password"
            value={profile.password}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-slate-600 border  text-white/70 px-2 py-2 shadow-sm bg-slate-700/50   focus-visible:ring-blue-500 focus-visible:outline-none  focus:border-purple-500 focus:border "
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/80"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Leave blank to keep the same"
            name="confirmPassword"
            value={profile.confirmPassword}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-slate-600 border  text-white/70 px-2 py-2 shadow-sm bg-slate-700/50   focus-visible:ring-blue-500 focus-visible:outline-none  focus:border-purple-500 focus:border "
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-white/80"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            value={profile?.bio || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-slate-600 border  text-white/70 px-2 py-2 shadow-sm bg-slate-700/50   focus-visible:ring-blue-500 focus-visible:outline-none  focus:border-purple-500 focus:border "
          ></textarea>
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="mr-2" size={20} />
            Save Changes
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileForm;
