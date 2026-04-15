export type CardTone = "dark" | "light";

export type WalletCard = {
  id: string;
  balance: number;
  holder: string;
  last4: string;
  exp: string;
  brand: "VISA" | "MASTERCARD";
  theme: "black" | "graphite" | "pearl";
  tone: CardTone;
};

export const WALLET_CARDS: WalletCard[] = [
  {
    id: "card_1",
    balance: 3009.94,
    holder: "ALEX CARTER",
    last4: "7890",
    exp: "09/26",
    brand: "VISA",
    theme: "black",
    tone: "dark",
  },
  {
    id: "card_2",
    balance: 1240.0,
    holder: "ALEX CARTER",
    last4: "5678",
    exp: "12/25",
    brand: "MASTERCARD",
    theme: "graphite",
    tone: "dark",
  },
  {
    id: "card_3",
    balance: 560.25,
    holder: "ALEX CARTER",
    last4: "1385",
    exp: "10/24",
    brand: "VISA",
    theme: "pearl",
    tone: "light",
  },
];