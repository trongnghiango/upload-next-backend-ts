/**
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 *
 * ts-prune-ignore-next
 */
export default function baseEnv() {
  const isDevelopment = process.env.NODE_ENV !== "production";
  const isProduction = process.env.NODE_ENV === "production";
  const appDev = "http://localhost:3000";
  const appPro = "http://localhost:3000";

  return {
    api: {
      film: "https://swapi.dev/api/films/:filmId",
      films: "https://swapi.dev/api/films",
    },

    isServer: typeof window === "undefined",
    isClient: typeof window !== "undefined",
    isDevelopment,
    isProduction,
    app: {
      users: `/api/v1/users`,
      user: `/api/users/:userId`,
      upload: `/api/v1/upload`,
    },
  };
}

export type Environment = ReturnType<typeof baseEnv>;
