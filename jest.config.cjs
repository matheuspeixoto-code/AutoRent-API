module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  transform: {
    "^.+\\.ts?$": "ts-jest",
  },

  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@errors/(.*)$": "<rootDir>/src/errors/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@data$": "<rootDir>/src/data-source.ts"
  },

  extensionsToTreatAsEsm: [".ts"],
};
