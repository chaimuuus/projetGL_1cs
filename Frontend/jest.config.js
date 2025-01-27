
  export default {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",
    },
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    }
  };
 