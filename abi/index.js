import { abi as anniversaryAbi } from './anniversary';
// import { abi as myFirstLayer2BadgeAbi } from './myFirstLayer2';
// import { abi as myFirstNFTAbi } from './myFirstNFT';
import { abi as badgeAbi } from './badge.js'
import { abi as buidlerCardAbi } from './buidlerCard.js'
import { abi as lxpAbi } from './lxp.js'
import { abi as voteAbi } from './vote.js'

const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) || 10

const addressConfig = {
    10: {
        badge: "0x8f4c2c84bB47670D15c17c7C60f29c97dCF00b0b",
        buidler: "0xd7F2995db07e87C870238E80bb45CD0957dd8D02",
        lxp: "0xA798cbF127fCBeeBE3359254271Fc1074362a9A4",
        vote: '0x158C23A40208EefaEDbe9C80502B59e88755c9a5'
    },
    11155420: {
        badge: "0x07F56634C09BaFd8F1029DC98aD11090533Ff8A6",
        buidler: "0xa94eB22Bfc57A12576F5c2BEC6041D5ac88177e3",
        lxp: "0x700b875D8F55b2607F12b11d70f411FB326FF254",
        vote: '0x158C23A40208EefaEDbe9C80502B59e88755c9a5'
    }
}
const addresses = addressConfig[CHAIN_ID];

export const anniversaryContract = {
    address: "0x96682f486b4C641C1625cEd12D9AF54B4c6a1B52",
    abi: anniversaryAbi,
    chainId: 10,
};

export const badgeContract = {
    address: addresses.badge,
    abi: badgeAbi,
    chainId: CHAIN_ID
}

export const buidlerContract = {
    address: addresses.buidler,
    abi: buidlerCardAbi,
    chainId: CHAIN_ID
}

export const lxpContract = {
    address: addresses.lxp,
    abi: lxpAbi,
    chainId: CHAIN_ID
}

export const voteContract = {
    address: addresses.vote,
    abi: voteAbi,
    chainId: CHAIN_ID
}