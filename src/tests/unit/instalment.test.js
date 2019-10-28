const instalmentController = require("../../controllers").instalment;
const Instalment= require("../../models").Instalment;
describe("Instalment Controller", function () {
    describe("Instalment Update", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("Return 400 error when there's a problem in findByPk ", async ()=>{
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };
            const req = {
                params:{
                    id:1
                }
            }
            jest.spyOn(Instalment, "findByPk").mockImplementation(id=>{
                return Promise.reject("Erro")
            })
            await instalmentController.payInstalment(req, res)
            expect(status).toHaveBeenCalledWith(400)
            expect(send).toHaveBeenCalledWith("Erro")
        })
        it("Return 404 error when instalment is null", async()=>{
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };
            const req = {
                params:{
                    id:1
                }
            }
            jest.spyOn(Instalment, "findByPk").mockImplementation(id=>{
                return Promise.resolve(null)
            })
            await instalmentController.payInstalment(req, res)
            expect(status).toHaveBeenCalledWith(404)
            expect(send).toHaveBeenCalledWith({
                message:"Instalment Not Found"
            })
        })
        it("Return status 200 when instalment is payed", async()=>{
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };
            const req = {
                params:{
                    id:1
                }
            }
            const date=new Date()
            jest.spyOn(Instalment, "findByPk").mockImplementation(id=>{
                return Promise.resolve({
                    isPaid:false,
                    value:10,
                    dueDate:date,
                    id:id,
                    update:()=>{
                        return Promise.resolve({
                            isPaid:true,
                            value:10,
                            dueDate:date,
                            id:id
                        })
                    }
                })
            })
            await instalmentController.payInstalment(req, res)
            expect(status).toHaveBeenCalledWith(200)
            expect(send).toHaveBeenCalledWith({
                isPaid:true,
                value:10,
                dueDate:date,
                id:1
            })
        })
        it("Return error 400 when there's an error in update", async()=>{
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };
            const req = {
                params:{
                    id:1
                }
            }
            const date=new Date()
            jest.spyOn(Instalment, "findByPk").mockImplementation(id=>{
                return Promise.resolve({
                    isPaid:false,
                    value:10,
                    dueDate:date,
                    id:id,
                    update:()=>{
                        return Promise.reject("Erro")
                    }
                })
            })
            await instalmentController.payInstalment(req, res)
            expect(status).toHaveBeenCalledWith(400)
            expect(send).toHaveBeenCalledWith("Erro")
        })
    })
    })