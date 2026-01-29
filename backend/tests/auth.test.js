import { describe, test, expect, vi, beforeEach } from "vitest";

/**
 * 1️⃣ Mock prisma BEFORE importing controller
 */
vi.mock("../prismaclient.js", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn()
    }
  }
}));

/**
 * 2️⃣ Mock jsonwebtoken (default import)
 * matches: import jwt from "jsonwebtoken"
 */
vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(() => "fake.jwt.token")
  }
}));

/**
 * 3️⃣ Import after mocks
 */
import prisma from "../prismaclient.js";
import { register, login } from "../authcontroller.js";

/**
 * 4️⃣ Mock Express response
 */
const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("registers a new user", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: 1,
      name: "Akshay",
      email: "test@test.com",
      password: "hashed"
    });

    const req = {
      body: {
        name: "Akshay",
        email: "test@test.com",
        password: "123456"
      }
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
        password: "123"
      }
    };

    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
