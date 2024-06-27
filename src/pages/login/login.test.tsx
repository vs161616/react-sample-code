/* eslint-disable jest/no-mocks-import */
import React from "react";
import { render } from "@testing-library/react";
import Login from "./index";
import { AuthContext } from "../../contexts/AuthContext"; // Assuming you have AuthContext provider
import axiosInstance from "../../utils/__mocks__/axios-config"; // Import the mocked axiosInstance
// Mock AuthContext
const mockAuthContext = {
  login: jest.fn(),
  isAuthenticated: false,
  userData: null,
  handleUnathorised: jest.fn(),
  logout: jest.fn(),
};

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

// Mock Axios methods used in AuthContext
axiosInstance.post.mockResolvedValue({ data: { token: "mocked-token" } });

describe("Login component", () => {
  it("renders login component", () => {
    const { getByAltText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Login />
      </AuthContext.Provider>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const logoElement = getByAltText("logo");
    expect(logoElement).toBeInTheDocument();
  });
});
