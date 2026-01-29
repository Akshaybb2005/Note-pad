import { register, login } from "../authcontroller.js";
import prisma from "../prismaclient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../prismaclient.js");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn();
  return res;
};

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("registers a new user", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: 1,
      name: "Akshay",
      email: "test@test.com",
      password: "hashed",
    });

    const req = {
      body: {
        name: "Akshay",
        email: "test@test.com",
        password: "123456",
      },
    };

    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User registered successfully" })
    );
  });

  test("fails login for invalid user", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const req = {
      body: {
        email: "wrong@test.com",
        password: "123",
      },
    };

    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
