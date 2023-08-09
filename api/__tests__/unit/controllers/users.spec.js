// const UserController = require("../../../controllers/users");
// const User = require("../../../models/User");
// const bcrypt = require("bcrypt");

// const mockSend = jest.fn();
// const mockJson = jest.fn();
// const mockStatus = jest.fn((code) => ({
//   send: mockSend,
//   json: mockJson,
//   end: jest.fn(),
// }));
// const mockRes = { status: mockStatus };

// describe("users controller", () => {
//   beforeEach(() => jest.clearAllMocks());

//   afterAll(() => jest.resetAllMocks());

//   describe("index", () => {
//     test("it returns users with a 201 status code", async () => {
//       let users = [
//         {
//           user_id: 1,
//           first_name: "Nastasia",
//           last_name: "Smith'",
//           email: "nsm@mail.com",
//           password: "hashedPassword",
//         },
//       ];
//       jest.spyOn(User, "getAll").mockResolvedValue(users);
//       await UserController.index(null, mockRes);
//       expect(mockStatus).toHaveBeenCalledWith(200);
//       expect(mockJson).toHaveBeenCalledWith(users);
//     });
//   });

//   describe("register", () => {
//     test("it returns a new user with a 201 status code", async () => {
//       let testUser = {
//         user_id: 1,
//         first_name: "Nastasia",
//         last_name: "Smith'",
//         email: "nsm@mail.com",
//         password: "hashedPassword",
//       };

//       console.log("Mocking bcrypt functions...");
//       jest.spyOn(bcrypt, "genSalt").mockResolvedValue("mockedSalt");
//       jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
//       jest.spyOn(User, "create").mockResolvedValue(new User(testUser));

//       const mockReq = { body: testUser };

//       console.log("Calling UserController.register...");
//       await UserController.register(mockReq, mockRes);

//       console.log("Checking mockStatus and mockJson calls...");
//       console.log("testUser:", testUser);
//       console.log("mockJson calls:", mockJson.mock.calls);

//       expect(mockStatus).toHaveBeenCalledWith(201);
//       expect(mockJson).toHaveBeenCalledWith(new User(testUser));

//       console.log("Test completed!");
//     });
//   });
//   // Add more test cases for other UserController methods
// });

const request = require("supertest");
const app = require("../../app");
const UserController = require("../../controllers/users");
const User = require("../../models/User");

jest.mock("../../models/User");

describe("User Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of users with a 200 status code", async () => {
    const mockUsers = [
      {
        user_id: 1,
        first_name: "Anastasia",
        last_name: "Kuznecova",
        email: "ak@example.com",
        password: "hashedPassword",
      },
      // ... more mock users
    ];

    User.getAll.mockResolvedValue(mockUsers);

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it("should create a new user with a 201 status code", async () => {
    const mockUser = {
      user_id: 1,
      first_name: "Brad",
      last_name: "Pitt",
      email: "handsome@example.com",
      password: "hashedPassword",
    };

    User.create.mockResolvedValue(mockUser);

    const response = await request(app).post("/users/register").send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  // Similar tests for other controller methods (login, update, destroy, show)
});
