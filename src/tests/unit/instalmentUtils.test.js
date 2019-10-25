const InstalmentUtils = require("../../utils/instalmentUtils");

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
//dueDate.setMonth(dueDate.getMonth + 1);
        let instalment = {
            isPaid: false,
            value: value,
            dueDate: dueDate,
            overdraftId: 1,
        }

        await InstalmentUtils.creatInstalment(value,dueDate,1);

        expect(await InstalmentUtils.creatInstalment(value,dueDate,1) ).toBe(instalment);







    })




})
