export const investmentAbi = [
  "function acceptedTerms(address) view returns (bool)",
  "function acceptTerms()",
  "function issueAfterPayment(bytes32,bytes32,address,uint256,uint256,bytes32)",
  "function issuedPurchase(bytes32) view returns (bool)",
  "event PurchaseIssued(bytes32 indexed purchaseId,address indexed investor,bytes32 indexed paymentReference,uint256 units,uint256 grossMinor,uint256 platformFeeMinor,uint256 trustNetMinor,bytes32 evidenceHash)",
] as const;
export const academicTokenAbi = [
  "function projectStatus() view returns (uint8)",
  "function setProjectStatus(uint8)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function maxSupply() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function paused() view returns (bool)",
  "function isFrozen(address) view returns (bool)",
  "function withdrawableRevenueOf(address) view returns (uint256)",
  "function withdrawnRevenueOf(address) view returns (uint256)",
  "function claimRevenue() returns (uint256)",
  "function distributedPeriod(uint32) view returns (bool)",
  "function distributeMonthly(uint32,uint256)",
  "event MonthlyRevenueDistributed(uint32 indexed period,uint256 amount,uint256 supplyAtDistribution)",
  "event RevenueClaimed(address indexed holder,uint256 amount)",
] as const;
export const registryAbi = [
  "function isVerified(address) view returns (bool)",
  "function contains(address) view returns (bool)",
  "function registerIdentity(address,address,uint16)",
] as const;
export const paymentAbi = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address,uint256) returns (bool)",
  "function allowance(address,address) view returns (uint256)",
] as const;
export const projectStatusLabels = [
  "Borrador",
  "Publicada",
  "En operación",
  "Cerrada",
] as const;
