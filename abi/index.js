import { abi as anniversaryAbi } from './anniversary';
import { abi as myFirstLayer2BadgeAbi } from './myFirstLayer2';
import { abi as myFirstNFTAbi } from './myFirstNFT';
import { abi as badgeAbi } from './badge.js'
import { abi as buidlerCardAbi } from './buidlerCard.js'
import { abi as lxpAbi } from './lxp.js'


export const anniversaryContract = {
    address: "0x96682f486b4C641C1625cEd12D9AF54B4c6a1B52",
    abi: anniversaryAbi,
    chainId: 10,
};

export const myFirstLayer2Badge = {
    address: "0x1188bd52703cc560a0349d5a80dad3d8c799e103",
    abi: myFirstLayer2BadgeAbi,
}

export const myFirstNFT = {
    address: "0xE1D831Ee54f88Ef03FD7F5a15dE943BAA4d19070",
    abi: myFirstNFTAbi,
}

export const badgeContract = {
    address: "0xd1192fEF62da46E246cb77A7B66E24ACaA879D90",
    abi: badgeAbi,
    chainId: 137
}

export const buidlerContract = {
    address: "0xbd7ABBee471f7a0ffe5FCC4cE176D92Ca3F4dFfe",
    abi: buidlerCardAbi,
    chainId: 1
}

export const lxpContract = {
    address: "0x1F0f012de0e0a20C856eF48867247C594Fb01dbC",
    abi: lxpAbi,
    chainId: 137
}