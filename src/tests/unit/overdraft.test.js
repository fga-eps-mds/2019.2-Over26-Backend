const overdraftController = require("../../controllers").overdraft;
const Overdraft = require("../../models").Overdraft;
const User = require("../../models").User;

describe("Overdrafts Controller", function () {
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
    describe("Overdraft create", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns the Overdraft object created", async () => {
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
                    id: 1,
                    createOverdraft: data => {
                        data["id"] = 1;
                        data["updatedAt"] = Math.floor(new Date().getTime() / 1000);
                        data["createdAt"] = Math.floor(new Date().getTime() / 1000);
                        return Promise.resolve(data);
                    }
                })
            );

            await overdraftController.create(req, res);
            let overdraft = {
                userId: 1,
                status: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
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

            await overdraftController.create(req, res);

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
                    id: 1,
                    createOverdraft: data => Promise.reject("error")
                })
            );

            await overdraftController.create(req, res);

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
                userId: 1,
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
    describe("Overdraft delete", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns 204 on sucess", async () => {
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

            jest.spyOn(Overdraft, "findByPk").mockImplementation(pk =>
                Promise.resolve({
                    destroy: () => Promise.resolve()
                })
            );

            await overdraftController.delete(req, res);

            expect(status).toHaveBeenCalledWith(204);
            expect(send).toHaveBeenCalledWith();
        });
        it("returns 404 when overdraft not found", async () => {
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
                .spyOn(Overdraft, "findByPk")
                .mockImplementation(pk => Promise.resolve(null));

            await overdraftController.delete(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({
                message: "Overdraft Not Found"
            });
        });
        it("returns 400 when error on find overdraft", async () => {
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
                .spyOn(Overdraft, "findByPk")
                .mockImplementation(pk => Promise.reject("error"));

            await overdraftController.delete(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith("error");
        });
        it("returns 400 when error on destoy overdraft", async () => {
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

            jest.spyOn(Overdraft, "findByPk").mockImplementation(pk =>
                Promise.resolve({
                    destroy: () => Promise.reject("error")
                })
            );

            await overdraftController.delete(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith("error");
        });
    });
});