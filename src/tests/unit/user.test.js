const userController = require("../../controllers").user;
const User = require("../../models").User;

describe("User Controller", function() {
  describe("User create", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns user create on sucess", async () => {
      let req = {
        body: {
          cpf: "123456789",
          name: "Ana",
          email: "ana@email.com",
          phone: "6112341234",
          monthly_income: "1000"
        }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest.spyOn(User, "create").mockImplementation(data => {
        data.id = 1;
        data.updatedAt = Math.floor(new Date().getTime() / 1000);
        data.createdAt = Math.floor(new Date().getTime() / 1000);
        return Promise.resolve(data);
      });

      await userController.create(req, res);

      expect(status).toHaveBeenCalledWith(201);
      let user = {
        cpf: "123456789",
        name: "Ana",
        email: "ana@email.com",
        phone: "6112341234",
        monthly_income: "1000",
        id: 1,
        updatedAt: Math.floor(new Date().getTime() / 1000),
        createdAt: Math.floor(new Date().getTime() / 1000)
      };
      expect(send).toHaveBeenCalledWith(user);
    });
    it("returns an error when fails", async () => {
      let req = {
        body: {
          cpf: "123456789",
          name: "Ana",
          email: "ana@email.com",
          phone: "6112341234",
          monthly_income: "1000"
        }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(User, "create")
        .mockImplementation(data => Promise.reject("error"));

      await userController.create(req, res);

      expect(status).toHaveBeenCalledWith(400);

      expect(send).toHaveBeenCalledWith("error");
    });
  });
  describe("User get by primary key", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns 404 when user not found", async () => {
      let req = {
        params: { id: 1 }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(User, "findByPk")
        .mockImplementation(pk => Promise.resolve(null));

      await userController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(send).toHaveBeenCalledWith({
        message: "User Not Found"
      });
    });
    it("returns 400 when error", async () => {
      let req = {
        params: { id: 1 }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest
        .spyOn(User, "findByPk")
        .mockImplementation(pk => Promise.reject("error"));

      await userController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith("error");
    });
    it("returns a User object", async () => {
      let req = {
        params: { id: 1 }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest.spyOn(User, "findByPk").mockImplementation(pk =>
        Promise.resolve({
          id: pk,
          cpf: "123456789",
          name: "Ana",
          email: "ana@email.com",
          phone: "6112341234",
          monthly_income: "1000",
          updatedAt: Math.floor(new Date().getTime() / 1000),
          createdAt: Math.floor(new Date().getTime() / 1000)
        })
      );

      await userController.getByPk(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith({
        id: req.params.id,
        cpf: "123456789",
        name: "Ana",
        email: "ana@email.com",
        phone: "6112341234",
        monthly_income: "1000",
        updatedAt: Math.floor(new Date().getTime() / 1000),
        createdAt: Math.floor(new Date().getTime() / 1000)
      });
    });
  });
  describe("User update", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it("returns user update on sucess", async () => {
      let req = {
        body: {
          cpf: "123456789",
          name: "Ana",
          email: "ana@email.com",
          phone: "6112341234",
          monthly_income: "1000"
        },
        params: {
          id: 1
        }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest.spyOn(User, "findByPk").mockImplementation(pk =>
        Promise.resolve({
          id: pk,
          cpf: "123456789",
          name: "Ana",
          email: "ana@email.com",
          phone: "6112341234",
          monthly_income: "1000",
          updatedAt: Math.floor(new Date().getTime() / 1000),
          createdAt: Math.floor(new Date().getTime() / 1000),
          update: data =>
            Promise.resolve({
              id: pk,
              cpf: "123456789",
              name: "Ana",
              email: "ana@email.com",
              phone: "6112341234",
              monthly_income: "1000",
              updatedAt: Math.floor(new Date().getTime() / 1000),
              createdAt: Math.floor(new Date().getTime() / 1000)
            })
        })
      );

      await userController.update(req, res);

      expect(status).toHaveBeenCalledWith(200);
      let user = {
        cpf: "123456789",
        name: "Ana",
        email: "ana@email.com",
        phone: "6112341234",
        monthly_income: "1000",
        id: req.params.id,
        updatedAt: Math.floor(new Date().getTime() / 1000),
        createdAt: Math.floor(new Date().getTime() / 1000)
      };
      expect(send).toHaveBeenCalledWith(user);
    });
    it("returns error 404 when user not found", async () => {
      let req = {
        body: {
          cpf: "123456789",
          name: "Ana",
          email: "ana@email.com",
          phone: "6112341234",
          monthly_income: "1000"
        },
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
        .mockImplementation(pk => Promise.resolve(null));

      await userController.update(req, res);

      expect(status).toHaveBeenCalledWith(404);

      expect(send).toHaveBeenCalledWith({
        message: "User Not Found"
      });
    });
    it("returns error 400 when error on find user by pk", async () => {
      let req = {
        body: {
          cpf: "123456789",
          name: "Ana",
          email: "ana@email.com",
          phone: "6112341234",
          monthly_income: "1000"
        },
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
        .mockImplementation(pk => Promise.reject("error"));

      await userController.update(req, res);

      expect(status).toHaveBeenCalledWith(400);

      expect(send).toHaveBeenCalledWith("error");
    });
    it("returns error 400 when error on update user", async () => {
      let req = {
        body: {
          cpf: "123456789",
          name: "Ana",
          email: "ana@email.com",
          phone: "6112341234",
          monthly_income: "1000"
        },
        params: {
          id: 1
        }
      };
      let send = jest.fn(data => ({ data }));
      let status = jest.fn(code => ({ send }));
      const res = {
        status
      };

      jest.spyOn(User, "findByPk").mockImplementation(pk =>
        Promise.resolve({
          update: data => Promise.reject("error")
        })
      );

      await userController.update(req, res);

      expect(status).toHaveBeenCalledWith(400);

      expect(send).toHaveBeenCalledWith("error");
    });
  });
});
