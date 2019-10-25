const InstalmentUtils = require("../../utils/instalmentUtils");
const OverdraftDebt = require("../../models").OverdraftDebt;
const Instalment = require("../../models").Instalment;


describe("InstalmentUtils", function () {

    describe("InstalmentUtils createInstalment", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
    })
    it("returns created instalment", async () => {
        let value = 100;
        let dueDate = new Date;
        dueDate.setDate(dueDate.getDate()-1);
        let OverdraftDebtId=1

       

        jest.spyOn(OverdraftDebt, "findOne").mockImplementation(query =>
            Promise.resolve({
                 id:1
                
            })



        );
        
        let instalment = {
            isPaid: false,
            dueDate: dueDate,
            overdraftDebtId: OverdraftDebtId,
            value:value,
        }
    /*    jest.spyOn(Instalment, "create").mockImplementation(query =>{
            Promise.resolve({
                isPaid: false,
            dueDate: dueDate,
            overdraftDebtId: OverdraftDebtId,
            value:value,
           })


        })*/

        await InstalmentUtils.creatInstalment(value,dueDate,OverdraftDebtId);

        expect(await InstalmentUtils.creatInstalment(value,dueDate,OverdraftDebtId) ).toBe(instalment);







    })




})
