"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, UserCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema for profile form validation
const profileSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  bio: z
    .string()
    .max(200, { message: "Bio must be less than 200 characters" })
    .optional(),
});

// TypeScript type inference from Zod schema
type ProfileFormInputs = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "johndoe",
      email: "john.doe@example.com",
      bio: "Software developer and chat enthusiast",
    },
  });

  const handleProfilePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPEG, PNG, and GIF files are allowed");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      // Simulate profile update logic
      console.log("Profile updated", {
        ...data,
        profilePicture: profilePicture,
      });

      // You would typically call an API to update the profile here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed", error);
      alert("Profile update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center mb-6">
        {profilePicture ? (
          <Image
            src={profilePicture}
            alt="Profile"
            width={0}
            height={0}
            className="relative w-24 h-24 rounded-full object-cover mb-4"
          />
        ) : (
          <UserCircle className="w-24 h-24 text-gray-400 mb-4" />
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleProfilePictureUpload}
          className="hidden"
          id="profile-picture-upload"
        />
        <Label
          htmlFor="profile-picture-upload"
          className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800"
        >
          <Upload className="mr-2 h-5 w-5" /> Upload Profile Picture
        </Label>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            {...register("username")}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            {...register("bio")}
            placeholder="Tell us about yourself"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating Profile..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
