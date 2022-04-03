export function shortenAddress(address) {
    return `${address.slice(0, 4)}...${address.slice(address.length - 2)}`;
}
