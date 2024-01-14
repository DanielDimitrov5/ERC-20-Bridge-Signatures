import { AddressLike, BigNumberish, Wallet, ethers } from 'ethers';

export async function signBridgeMintMessage(wallet: Wallet, tokenAddress: AddressLike, senderAddress: AddressLike, amount: BigNumberish, chainId: BigNumberish, nonce: BigNumberish) {
    const message = ethers.solidityPackedKeccak256(
        ['address', 'address', 'uint256', 'uint256', 'uint256'],
        [tokenAddress, senderAddress, amount, chainId, nonce]
    );
    const signature = await wallet.signMessage(ethers.getBytes(message));
    return signature;
}

export async function signBridgeReleaseMessage(wallet: Wallet, tokenAddress: AddressLike, senderAddress: AddressLike, amount: BigNumberish, nonce: BigNumberish) {
    const message = ethers.solidityPackedKeccak256(
        ['address', 'address', 'uint256', 'uint256'],
        [tokenAddress, senderAddress, amount, nonce]
    );
    const signature = await wallet.signMessage(ethers.getBytes(message));
    return signature;
}