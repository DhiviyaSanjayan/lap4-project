const User = require("../../../models/User");

const db = require("../../../database/connect");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("getAll", () => {
    test("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [
          {
            user_id: 1,
            first_name: "Nastasia",
            last_name: "Smith'",
            email: "nsm@mail.com",
            password: "hashedPassword",
          },
          // ... other user data
        ],
      });

      const all = await User.getAll();
      expect(all).toHaveLength(1); // Update with the expected number of users
    });
  });

  describe("getOneById", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        user_id: 1,
        first_name: "Nastasia",
        last_name: "Smith'",
        email: "nsm@mail.com",
        password: "hashedPassword",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });

      const result = await User.getOneById(1);
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(1);
    });
  });

  describe("create", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        user_id: 1,
        first_name: "Nastasia",
        last_name: "Smith'",
        email: "nsm@mail.com",
        password: "hashedPassword",
      };
      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...userData }] });
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });

      const result = await User.create(userData);
      expect(result).toHaveProperty("first_name", "Nastasia");
      // ... other assertions
    });
  });

  // Add more test cases for other User methods
});
