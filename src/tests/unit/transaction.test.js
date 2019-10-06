const transactionController = require("../../controllers").transaction;
const Transaction = require("../../models").Transaction;
const User = require("../../models").User;

describe("Transactions Controller", function() {
  describe("Transaction list", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns empty list if there is no transaction", async () => {
      let req = {};
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(Transaction, "findAll")
        .mockImplementation(() => Promise.resolve([]));

      await transactionController.list(req, res);

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
        .spyOn(Transaction, "findAll")
        .mockImplementation(() => Promise.reject("error"));

      await transactionController.list(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith("error");
    });
  });

  describe("Transaction getByPk", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns Transaction object on success", async () => {
      let req = { params: { id: 1 } };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };
      let transaction = {
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
        .spyOn(Transaction, "findByPk")
        .mockImplementation(() => Promise.resolve(transaction));

      await transactionController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith(transaction);
    });
    it("returns 404 if transaction not found", async () => {
      let req = { params: { id: 1 } };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(Transaction, "findByPk")
        .mockImplementation(() => Promise.resolve(null));

      await transactionController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(send).toHaveBeenCalledWith({
        message: "Transaction Not Found"
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
        .spyOn(Transaction, "findByPk")
        .mockImplementation(() => Promise.reject("eeror"));

      await transactionController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith("error");
    });
  });
});
