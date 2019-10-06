const accountController = require("../../controllers").account;
const Account = require("../../models").Account;

describe("Account Controller", function () {
    describe("Account create", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns account create on sucess", async () => {
            let req = {
                body: {
                    userCPF: 1234,
                    agency: 1,
                    number: 12345,
                    balance: 100
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest.spyOn(Account, "create").mockImplementation(data => {
                data.id = 1;
                data.updatedAt = Math.floor(new Date().getTime() / 1000);
                data.createdAt = Math.floor(new Date().getTime() / 1000);
                return Promise.resolve(data);
            });

            await accountController.create(req, res);

            expect(status).toHaveBeenCalledWith(201);
            let account = Object.assign(req.body, {
                id: 1,
                updatedAt: Math.floor(new Date().getTime() / 1000),
                createdAt: Math.floor(new Date().getTime() / 1000)
            });
            expect(send).toHaveBeenCalledWith(account);
        });
        it("returns an error when fails", async () => {
            let req = {
                body: {
                    userCPF: 1234,
                    agency: 1,
                    number: 12345,
                    balance: 100
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(Account, "create")
                .mockImplementation(data => Promise.reject("error"));

            await accountController.create(req, res);

            expect(status).toHaveBeenCalledWith(400);

            expect(send).toHaveBeenCalledWith("error");
        });
    });
    describe("Account get by primary key", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns 404 when account not found", async () => {
            let req = {
                params: { id: 1 }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(Account, "findByPk")
                .mockImplementation(pk => Promise.resolve(null));

            await accountController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({
                message: "Account Not Found"
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
                .spyOn(Account, "findByPk")
                .mockImplementation(pk => Promise.reject("error"));

            await accountController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith("error");
        });
        it("returns a Account object", async () => {
            let req = {
                params: { id: 1 },
                body: {
                    userCPF: 1234,
                    agency: 1,
                    number: 12345,
                    balance: 100
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest.spyOn(Account, "findByPk").mockImplementation(pk =>
                Promise.resolve({
                    userCPF: req.body.userCPF,
                    agency: req.body.agency,
                    number: req.body.number,
                    balance: req.body.balance,
                    updatedAt: Math.floor(new Date().getTime() / 1000),
                    createdAt: Math.floor(new Date().getTime() / 1000)
                })
            );

            await accountController.getByPk(req, res);
            let account = Object.assign(req.body, {
                updatedAt: Math.floor(new Date().getTime() / 1000),
                createdAt: Math.floor(new Date().getTime() / 1000)
            });
            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith(account);
        });
    });
    describe("Account update", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns account update on sucess", async () => {
            let req = {
                body: {
                    userCPF: 1234,
                    agency: 1,
                    number: 12345,
                    balance: 100
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

            jest.spyOn(Account, "findByPk").mockImplementation(pk =>
                Promise.resolve({
                    userCPF: req.body.userCPF,
                    agency: req.body.agency,
                    number: req.body.number,
                    balance: req.body.balance,
                    updatedAt: Math.floor(new Date().getTime() / 1000),
                    createdAt: Math.floor(new Date().getTime() / 1000),
                    update: data =>
                        Promise.resolve({
                            userCPF: req.body.userCPF,
                            agency: req.body.agency,
                            number: req.body.number,
                            balance: req.body.balance,
                            updatedAt: Math.floor(new Date().getTime() / 1000),
                            createdAt: Math.floor(new Date().getTime() / 1000)
                        })
                })
            );

            await accountController.update(req, res);

            expect(status).toHaveBeenCalledWith(200);
            let account = {
                userCPF: req.body.userCPF,
                agency: req.body.agency,
                number: req.body.number,
                balance: req.body.balance,
                updatedAt: Math.floor(new Date().getTime() / 1000),
                createdAt: Math.floor(new Date().getTime() / 1000)
            };
            expect(send).toHaveBeenCalledWith(account);
        });
        it("returns error 404 when account not found", async () => {
            let req = {
                body: {
                    userCPF: 1234,
                    agency: 1,
                    number: 12345,
                    balance: 100
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
                .spyOn(Account, "findByPk")
                .mockImplementation(pk => Promise.resolve(null));

            await accountController.update(req, res);

            expect(status).toHaveBeenCalledWith(404);

            expect(send).toHaveBeenCalledWith({
                message: "Account Not Found"
            });
        });
        it("returns error 400 when error on find account by pk", async () => {
            let req = {
                body: {
                    userCPF: 1234,
                    agency: 1,
                    number: 12345,
                    balance: 100
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
                .spyOn(Account, "findByPk")
                .mockImplementation(pk => Promise.reject("error"));

            await accountController.update(req, res);

            expect(status).toHaveBeenCalledWith(400);

            expect(send).toHaveBeenCalledWith("error");
        });
        it("returns error 400 when error on update account", async () => {
            let req = {
                body: {
                    userCPF: 1234,
                    agency: 1,
                    number: 12345,
                    balance: 100
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

            jest.spyOn(Account, "findByPk").mockImplementation(pk =>
                Promise.resolve({
                    update: data => Promise.reject("error")
                })
            );

            await accountController.update(req, res);

            expect(status).toHaveBeenCalledWith(400);

            expect(send).toHaveBeenCalledWith("error");
        });
    });
});
