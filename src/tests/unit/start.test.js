const startController = require("../../controllers").start;
const Account = require("../../models").Account;
const User = require("../../models").User;

describe("Start Controller", function () {
    describe("Start App", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns user and account on sucess", async () => {
            let req = {body: {
                name: "Ana"}
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            let date = new Date()
            jest.spyOn(User, "create").mockImplementation(data => {
                data.id = 1;
                data.updatedAt = date;
                data.createdAt = date;
                return Promise.resolve(data);
            });

            jest.spyOn(Account, "create").mockImplementation(data => {
                data.id = 1;
                data.updatedAt = date;
                data.createdAt = date;
                return Promise.resolve(data);
            });

            await startController.startApp(req, res);

            expect(status).toHaveBeenCalledWith(200);
            let user = {
                name: "Ana",
                cpf: "12345678900",
                email: "example@example.com",
                phone: "12345678900",
                monthlyIncome: 3000,
                id: 1,
                updatedAt: date,
                createdAt: date
            };
            let account = {
                userId: user.id,
                agency: 123456,
                number: 123456,
                balance: 100.00,
                id: 1,
                updatedAt: date,
                createdAt: date
            };
            expect(send).toHaveBeenCalledWith({user, account});
        });
        it("returns an error when user create fail", async () => {
            let req = {body: {
                name: "Ana"}
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest.spyOn(User, "create").mockImplementation(data => 
                Promise.reject("error"));

            await startController.startApp(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith({
                message: "Error creating user"
            });
        });
        it("returns an error when account create fail", async () => {
            let req = {body: {
                name: "Ana"}
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            let date = new Date()
            jest.spyOn(User, "create").mockImplementation(data => {
                data.id = 1;
                data.updatedAt = date;
                data.createdAt = date;
                return Promise.resolve(data);
            });

            jest.spyOn(Account, "create").mockImplementation(data =>
                Promise.reject("error"));

            await startController.startApp(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith({message: "Error creating account"});
        });
    });
});
