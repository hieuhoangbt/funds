$(document).ready(function () {
    var SM_ABI = [
        {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "nguoinhan",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "tien",
                    type: "uint256",
                },
            ],
            name: "Admin_ChuyenTienThanhCong",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "tongTien",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "vi",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "tien",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "string",
                    name: "hoten",
                    type: "string",
                },
            ],
            name: "CoHocSinhVuaNapTien",
            type: "event",
        },
        {
            inputs: [
                {
                    internalType: "string",
                    name: "hoten",
                    type: "string",
                },
            ],
            name: "napTien",
            outputs: [],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address payable",
                    name: "nguoinhan",
                    type: "address",
                },
            ],
            name: "rutTien",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            name: "arrayHocsinh",
            outputs: [
                {
                    internalType: "address",
                    name: "_Address",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_Tien",
                    type: "uint256",
                },
                {
                    internalType: "string",
                    name: "_HoTen",
                    type: "string",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "thuTu",
                    type: "uint256",
                },
            ],
            name: "get_one_Hocsinh",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
                {
                    internalType: "string",
                    name: "",
                    type: "string",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "hocSinhCounter",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "overview",
            outputs: [
                {
                    internalType: "uint256",
                    name: "_TongTien",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "_TongSoHocSinh",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "tongTien",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
    ];
    var SM_Address = "0xb03c3DC7691C35F818da816A1A2d07E4F4271123";
    var currentAccount = null;
    var tongtien = 0;
    var hsCounter = 0;

    checkMetaMaskInstalled();

    // contract MM
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    var contract_MM = web3.eth.Contract(SM_ABI, SM_Address);
    // console.log("Contract MM", contract_MM);

    // contract Infura
    var provider = new Web3.providers.WebsocketProvider(
        "wss://rinkeby.infura.io/ws/v3/331ad82819864323bf98c521154031a3"
    );
    var web3_infura = new Web3(provider);
    var contract_infura = web3_infura.eth.Contract(SM_ABI, SM_Address);
    // console.log("Contract Infura", contract_infura);
    contract_infura.events.CoHocSinhVuaNapTien(
        {
            filter: {},
            fromBlock: "latest",
        },
        (err, data) => {
            if (err) {
                $("#notification").html(err);
                return;
            }
            console.log("DATA", data);
            $("#balance").html(
                web3.utils.fromWei(
                    data.returnValues.tongTien.toString(),
                    "ether"
                ) + "ETH"
            );
            var tr = "<tr>";
            tr += "<td>" + data.returnValues.hoten + "</td>";
            tr += "<td>" + data.returnValues.vi + "</td>";
            tr +=
                "<td>" +
                web3.utils.fromWei(data.returnValues.tien.toString(), "ether") +
                "ETH </td>";
            tr += "</tr>";

            $("#dsHs").append(tr);
            hsCounter += 1;
            $("#counter").html(hsCounter);
        }
    );

    contract_infura.events.Admin_ChuyenTienThanhCong(
        {
            filter: {},
            fromBlock: "latest",
        },
        (err, data) => {
            if (err) {
                $("#withdraw_result").html(err);
                return;
            }
            console.log("DATA", data);
            $("#balance").html("0 ETH");
        }
    );

    $("#bt_connectMM").click(function () {
        connect_MM()
            .then((data) => {
                console.log("Current account is: ", data[0]);
                currentAccount = data[0];
                $("#curAddress").html(currentAccount);
            })
            .catch((err) => console.log(err));
    });

    $("#btn_Send").click(function () {
        // contract_MM send() call()
        if (!currentAccount) {
            alert("Please connect MetaMask first!");
        }
        var hoten = $("#txt_HoTen").val();
        var tien = parseFloat($("#txt_Tien").val()) + "";
        contract_MM.methods
            .napTien(hoten)
            .send({
                from: currentAccount,
                value: web3.utils.toWei(tien, "ether"), //tien * Math.pow(10, 18)
            })
            .then((data) => console.log(data))
            .catch((err) => {
                console.log("ERR", err.message);
                $("#notification").html(err.message);
            });
    });

    $("#btn_Withdraw").click(function () {
        const receiver = $("#txt_vi").val();
        if (currentAccount) {
            contract_MM.methods
                .rutTien(receiver)
                .send({
                    from: currentAccount,
                })
                .catch((err) => console.log(err));
        }
    });

    window.ethereum.on("accountsChanged", function (accounts) {
        console.log("Current account is: ", accounts[0]);
        currentAccount = accounts[0];
        $("#curAddress").html(currentAccount);
    });

    load_dsHs();
    function load_dsHs() {
        contract_MM.methods
            .hocSinhCounter()
            .call()
            .then((data) => {
                hsCounter = data[1].toNumber();
                tongtien = data[0].toNumber();

                let i = 0;
                console.log("load_dsHS", hsCounter);
                console.log(
                    "load_dsHS",
                    web3.utils.fromWei(tongtien.toString(), "ether")
                );
                $("#counter").html(hsCounter);
                $("#balance").html(
                    web3.utils.fromWei(tongtien.toString(), "ether") + "ETH"
                );
                while (i < hsCounter) {
                    contract_MM.methods
                        .get_one_Hocsinh(i)
                        .call()
                        .then((data) => {
                            console.log("HS", data);
                            var tr = "<tr>";
                            tr += "<td>" + data[2] + "</td>";
                            tr += "<td>" + data[0] + "</td>";
                            tr +=
                                "<td>" +
                                web3.utils.fromWei(
                                    data[1].toString(),
                                    "ether"
                                ) +
                                "ETH </td>";
                            tr += "</tr>";

                            $("#dsHs").append(tr);
                        })
                        .catch((err) => {
                            console.log("ERR", err);
                        });
                    i++;
                }
            })
            .catch((err) => {});
    }
});

async function connect_MM() {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    // const account = accounts[0];
    return accounts;
}

function checkMetaMaskInstalled() {
    if (typeof window.ethereum === "undefined") {
        console.log("MetaMask is not installed!");
        $("#info").hide();
        $("#install").show();
    } else {
        $("#info").show();
        $("#install").hide();
    }
}
