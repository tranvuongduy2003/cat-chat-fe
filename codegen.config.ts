import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5002/graphql/schema.graphql", // Path to your GraphQL schema
  documents: ["./graphql/**/*.{graphql,ts,tsx}"], // Paths to your GraphQL operations
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        scalars: {
          DateTime: "string",
        },
      },
    },
  },
};

export default config;
