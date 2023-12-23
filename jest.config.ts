import { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/build/',
        '<rootDir>/src/__tests__/data/*',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/build/',
        '<rootDir>/src/__tests__/data/*',
    ],
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/data/setup/jest.setup.ts'],
    restoreMocks: true,
};

export default config;