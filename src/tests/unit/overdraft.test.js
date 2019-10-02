const overdraftController = require("../../controllers").overdraft;
const Overdraft = require("../../models").Overdraft;

describe("Overdrafts Controller", function() {
  describe("Overdraft list", () => {
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
  describe("Overdraft getByPk", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns Overdraft object on success", async () => {
      let req = { params: { id: 1 } };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };
      let overdraft = {
        userCPF: 1234,
        status: false,
        limit: 200,
        limitMax: 200,
        limitUsed: 0,
        firstUseDate: null,
        createdAt: Math.floor(new Date().getTime() / 1000),
        updatedAt: Math.floor(new Date().getTime() / 1000),
        id: 1
      };
      jest
        .spyOn(Overdraft, "findByPk")
        .mockImplementation(() => Promise.resolve(overdraft));

      await overdraftController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith(overdraft);
    });
    it("returns 404 if overdraft not found", async () => {
      let req = { params: { id: 1 } };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(Overdraft, "findByPk")
        .mockImplementation(() => Promise.resolve(null));

      await overdraftController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(send).toHaveBeenCalledWith({
        message: "Overdraft Not Found"
      });
    });
    it("returns 400 on error", async () => {
      let req = { params: { id: 1 } };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(Overdraft, "findByPk")
        .mockImplementation(() => Promise.reject("eeror"));

      await overdraftController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith("error");
    });
  });
});
