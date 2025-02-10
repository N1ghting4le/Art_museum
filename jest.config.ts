import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
      },
    ],
  },
  moduleNameMapper: {
    '\\.svg\\?(react|url)$': '<rootDir>/src/__mocks__/svgMock.tsx',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

export default config;
