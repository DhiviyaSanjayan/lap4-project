const UserController = require("../../../controllers/users");
const User = require("../../../models/User");
const bcrypt = require("bcrypt");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));
const mockRes = { status: mockStatus };

describe("users controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns users with a 201 status code", async () => {
      let users = [
        {
          user_id: 1,
          first_name: "Nastasia",
          last_name: "Smith'",
          email: "nsm@mail.com",
          password: "hashedPassword",
        },
      ];
      jest.spyOn(User, "getAll").mockResolvedValue(users);
      await UserController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(users);
    });
  });

  describe("register", () => {
    test("it returns a new user with a 201 status code", async () => {
      let testUser = {
        user_id: 1,
        first_name: "Nastasia",
        last_name: "Smith'",
        email: "nsm@mail.com",
        password: "hashedPassword",
      };

      console.log("Mocking bcrypt functions...");
      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("mockedSalt");
      jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
      jest.spyOn(User, "create").mockResolvedValue(new User(testUser));

      const mockReq = { body: testUser };

      console.log("Calling UserController.register...");
      await UserController.register(mockReq, mockRes);

      console.log("Checking mockStatus and mockJson calls...");
      console.log("testUser:", testUser);
      console.log("mockJson calls:", mockJson.mock.calls);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new User(testUser));

      console.log("Test completed!");
    });
  });
  // Add more test cases for other UserController methods
});
