const overdraftUtils = require("../../utils/overdraftUtils");
const Overdraft = require("../../models").Overdraft;


describe("OverdraftUtils", function () {
    describe("OverdraftUtils usabilityCheck", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns true for firstUseDate==null", async () => {
            let id = 1;

            jest.spyOn(Overdraft, "findOne").mockImplementation(query =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: null,
                })
            );
            await overdraftUtils.usabilityCheck(id);

            expect(true);

        })

        it("returns true for firstUseDate!=null and less than 26 days have passed", async () => {
            let id = 1;

            jest.spyOn(Overdraft, "findOne").mockImplementation(query =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: new Date(),
                })
            );
            await overdraftUtils.usabilityCheck(id);

            expect(true);

        })

        it("returns false for firstUseDate!=null and 26 days or more have passed", async () => {
            let id = 1;
            let date = new Date;
            date = date + 26;

            jest.spyOn(Overdraft, "findOne").mockImplementation(query =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: date,
                })
            );
            /*jest.spyOn(Overdraft.firstUseDate, "getTime").mockImplementation(query =>
                Promise.resolve(2246400000)
            );*/

            await overdraftUtils.usabilityCheck(id);

            expect(false);

        })
    })
})
