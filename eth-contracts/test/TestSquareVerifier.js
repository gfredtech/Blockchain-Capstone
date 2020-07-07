var SquareVerifier = artifacts.require("Verifier");

contract('TestSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

         let proof = {
            a: ["0x2ea377caf7635203e02a1c3e0e48b73cc7bcdab40449275f884a248e2302d598", "0x1ac3d8199aebe63c36d867942bb8a62361973e51390c41d7c27283dbd02076a9"],
            b: [["0x030dc19cb238db5cf3ef90c463e6d8d5ba06f452dc443e49fdfa2f5e878e46fd", "0x27f7b46b36f968d5f4dab8b8b15f7fa63766325646403aa3a89ce584dde0898f"], ["0x12e5a0601c9906932350d2c1fb34faa270591fe7d5b29a8b399f7622c03cdc9f", "0x0757e81a7a3240939c9ebb724695f5696b9b89c5fd734028bfaf6160de218fbd"]],
            c: ["0x22557b4a1d67dcc661a1a689c62e1b0200cc847daac959df352d85b03c0049bf", "0x02f47002c238a84d04da2eddb26c62655682f2f141085ef8b3247b324851fc3c"],
        inputs: ["0x000000000000000000000000000000000000000000000000000000000001bba1", "0x0000000000000000000000000000000000000000000000000000000000000001"],
        };


    describe('testing Verifier', function () {
        beforeEach(async function () {
            this.contract = await SquareVerifier.new({
                from: account_one
            });

        })

        // Test verification with correct proof
        // - use the contents from proof.json generated from zokrates steps
        it('with correct proof', async function () {

            let result = await this.contract.verifyTx.call(proof.a, proof.b, proof.c, proof.inputs)

            assert.equal(result, true, "Correct proof marked as incorrect")
        })

        // Test verification with incorrect proof
        it('with incorrect proof', async function () {

            let result = await this.contract.verifyTx.call(proof.a, proof.b, proof.c, [9,0])

            assert.equal(result, false, "Incorrect proof marked as correct");
        });

    });
});