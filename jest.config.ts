import { createDefaultPreset, JestConfigWithTsJest } from 'ts-jest';

const defaultPreset = createDefaultPreset({
  tsconfig: './tsconfig.app.json'
});

const config: JestConfigWithTsJest = {
  ...defaultPreset,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/app/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src/__tests__'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/file.mock.js',
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/style.mock.js',
    '\\.svg\\?react$': '<rootDir>/test/__mocks__/svgr.mock.js',
    'src/(.*)': '<rootDir>/src/$1',
    'shared/(.*)': '<rootDir>/src/shared/$1',
    'entities/(.*)': '<rootDir>/src/entities/$1',
    'widgets/(.*)': '<rootDir>/src/widgets/$1',
    'features/(.*)': '<rootDir>/src/features/$1',
    'pages/(.*)': '<rootDir>/src/pages/$1',
    'app/(.*)': '<rootDir>/src/app/$1'
  }
};

export default config;
