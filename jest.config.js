module.exports = {
  // 'globals': {
  //   'ts-jest': {
  //     'tsConfig': 'tsconfig.test.json'
  //   }
  // },

  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // setupFilesAfterEnv: [
  //   '<rootDir>/tests/setup.ts'
  // ],

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: [
  //   "@testing-library/jest-dom/extend-expect"
  // ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '\\.(test|spec)\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};