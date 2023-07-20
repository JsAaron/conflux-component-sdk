export interface AddressInfo {
  hexAddress: Buffer;
  netId: number;
  type: string;
}

export declare const encode: (hexAddress: string | Buffer, netId: number, verbose?: boolean) => string;

export declare const decode: (address: string) => AddressInfo;

export declare const isValidCfxAddress: (address: string) => boolean;

export declare const verifyCfxAddress: (address: string) => boolean;

export declare const hasNetworkPrefix: (address: string) => boolean;

export declare const simplifyCfxAddress: (address: string) => string;

export declare const shortenCfxAddress: (address: string) => string;

export declare const isZeroAddress: (address: string) => boolean;

export declare const isInternalContractAddress: (address: string) => boolean;

export declare const isValidHexAddress: (address: string) => boolean;

export declare const isValidCfxHexAddress: (address: string) => boolean;

