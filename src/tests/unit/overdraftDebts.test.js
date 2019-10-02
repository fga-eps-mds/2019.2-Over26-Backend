const overdraftDebtController = require("../../controllers").overdraftDebt;
const OverdraftDebt = require("../../models").OverdraftDebt;
const User = require("../../models").User;

describe("OverdraftDebts Controller", function() {
  describe("OverdraftDebt create", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns the OverdraftDebt object created", async () => {
      let req = {
        params: {
          id: 1
        }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest.spyOn(User, "findByPk").mockImplementation(id =>
        Promise.resolve({
          cpf: 1234,
          createOverdraftDebt: data => {
            data["id"] = 1;
            data["entryDate"] = Math.floor(new Date().getTime() / 1000);
            data["updatedAt"] = Math.floor(new Date().getTime() / 1000);
            data["createdAt"] = Math.floor(new Date().getTime() / 1000);
            return Promise.resolve(data);
          }
        })
      );

      await overdraftDebtController.create(req, res);
      let overdraft = {
        userCPF: 1234,
        entryDate: Math.floor(new Date().getTime() / 1000),
        amount: 0,
        rate: 0.1,
        wasDivided: false,
        createdAt: Math.floor(new Date().getTime() / 1000),
        updatedAt: Math.floor(new Date().getTime() / 1000),
        id: 1
      };
      expect(status).toHaveBeenCalledWith(201);
      expect(send).toHaveBeenCalledWith(overdraft);
    });
    it("returns 400 on fails on find user", async () => {
      let req = {
        params: {
          id: 1
        }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(User, "findByPk")
        .mockImplementation(id => Promise.reject("error"));

      await overdraftDebtController.create(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith("error");
    });
    it("returns 400 on fails on create overdraft", async () => {
      let req = {
        params: {
          id: 1
        }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest.spyOn(User, "findByPk").mockImplementation(id =>
        Promise.resolve({
          cpf: 1234,
          createOverdraftDebt: data => Promise.reject("error")
        })
      );

      await overdraftDebtController.create(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith("error");
    });
  });
  describe("OverdraftDebt getByPk", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns OverdraftDebt object on success", async () => {
      let req = { params: { id: 1 } };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };
      let overdraftDebt = {
        userCPF: 1234,
        entryDate: Math.floor(new Date().getTime() / 1000),
        amount: 0,
        rate: 0.1,
        wasDivided: false,
        createdAt: Math.floor(new Date().getTime() / 1000),
        updatedAt: Math.floor(new Date().getTime() / 1000),
        id: 1
      };
      jest
        .spyOn(OverdraftDebt, "findByPk")
        .mockImplementation(() => Promise.resolve(overdraftDebt));

      await overdraftDebtController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith(overdraftDebt);
    });
    it("returns 404 if overdraft not found", async () => {
      let req = { params: { id: 1 } };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(OverdraftDebt, "findByPk")
        .mockImplementation(() => Promise.resolve(null));

      await overdraftDebtController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(send).toHaveBeenCalledWith({
        message: "OverdraftDebt Not Found"
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
        .spyOn(OverdraftDebt, "findByPk")
        .mockImplementation(() => Promise.reject("eeror"));

      await overdraftDebtController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith("error");
    });
  });
});
