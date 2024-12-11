"use client";

import { useToast } from "@/hooks/use-toast";
import { User } from "@/models/user.model";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

// Create GraphQL mutations
const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`);

const REGISTER_MUTATION = gql(`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: username, email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`);

// const REFRESH_TOKEN_MUTATION = gql(`
//   mutation RefreshToken($accessToken: String!, $refreshToken: String!) {
//     refreshToken(accessToken: $accessToken, refreshToken: $refreshToken) {
//       accessToken
//       refreshToken
//     }
//   }
// `);

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);
  // const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

  useEffect(() => {
    (() => {
      const accessToken = localStorage.getItem("accessToken") as string;
      if (!accessToken || accessToken === "") {
        logout();
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.login) {
        // Store tokens
        localStorage.setItem("accessToken", data.login.accessToken);
        localStorage.setItem("refreshToken", data.login.refreshToken);
        toast({ title: "Login successfully!" });
        router.replace("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await registerMutation({
        variables: { username, email, password },
      });

      if (data?.register) {
        // Store tokens
        localStorage.setItem("accessToken", data.register.accessToken);
        localStorage.setItem("refreshToken", data.register.refreshToken);
        toast({ title: "Register successfully!" });
        router.replace("/");
      }
    } catch (error) {
      console.error("Register failed", error);
      throw error;
    }
  };

  const logout = () => {
    // Clear tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Reset states
    setUser(null);
  };

  // const refreshToken = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const refreshToken = localStorage.getItem("refreshToken");

  //     if (!accessToken || !refreshToken) {
  //       throw new Error("No tokens found");
  //     }

  //     const { data } = await refreshTokenMutation({
  //       variables: { accessToken, refreshToken },
  //     });

  //     if (data?.refreshToken) {
  //       // Update tokens
  //       localStorage.setItem("accessToken", data.refreshToken.accessToken);
  //       localStorage.setItem("refreshToken", data.refreshToken.refreshToken);

  //       setIsAuthenticated(true);
  //       // Optionally fetch user details
  //     }
  //   } catch (error) {
  //     console.error("Token refresh failed", error);
  //     logout();
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
