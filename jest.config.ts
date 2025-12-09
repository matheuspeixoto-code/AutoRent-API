import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },

  extensionsToTreatAsEsm: [".ts"],



  
};

export default config;
