const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));
app.listen(3000);

app.get("/", function(req, res) {
    res.render("master");
});

////////

const SM_ABI = [
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
const SM_Address = '0xb03c3DC7691C35F818da816A1A2d07E4F4271123';

var Contract = require('web3-eth-contract');
Contract.setProvider("wss://rinkeby.infura.io/ws/v3/331ad82819864323bf98c521154031a3");

var contract = new Contract(SM_ABI, SM_Address);
contract.events.CoHocSinhVuaNapTien({filter: {}, fromBlock: "latest"}, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});