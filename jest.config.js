/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    // '^.+\\.tsx?$': 'ts-jest',
    // '^.+\\.js?$': 'babel-jest',
    // '^.+\\.jsx?$': 'babel-jest',
    // '^.+\\.scss$': 'jest-scss-transform'
  }
};
