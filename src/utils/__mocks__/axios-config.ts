const axiosInstance: any = {
  create: jest.fn(() => axiosInstance), // Mock create method to return itself
  interceptors: {
    request: {
      use: jest.fn(),
    },
  },
  // Mock other axios methods you use in your application
  get: jest.fn(),
  post: jest.fn(),
};

export default axiosInstance;
