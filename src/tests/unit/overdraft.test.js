const overdraftController = require("../../controllers").overdraft;
const Overdraft = require("../../models").Overdraft;

describe("Overdrafts Controller", function() {
  describe("User create", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns empty list if there is no overdraft", async () => {
      let req = {};
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(Overdraft, "findAll")
        .mockImplementation(() => Promise.resolve([]));

      await overdraftController.list(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith([]);
    });
    it("returns 400 on error", async () => {
      let req = {};
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(Overdraft, "findAll")
        .mockImplementation(() => Promise.reject("error"));

      await overdraftController.list(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith("error");
    });
  });
});
