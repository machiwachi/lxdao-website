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
    address: "0x8f4c2c84bB47670D15c17c7C60f29c97dCF00b0b",
    abi: badgeAbi,
    chainId: 10
}

export const buidlerContract = {
    address: "0xd7F2995db07e87C870238E80bb45CD0957dd8D02",
    abi: buidlerCardAbi,
    chainId: 10
}

export const lxpContract = {
    address: "0xA798cbF127fCBeeBE3359254271Fc1074362a9A4",
    abi: lxpAbi,
    chainId: 10
}