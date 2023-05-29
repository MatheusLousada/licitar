export type Auction = {
    id: string;
    name: string;
    description: string;
    minimumValue: string;
    lastBidValue: string;
    startDate: string;
    endDate: string;
    status: string;
    roomKey: string;
    product: {
        id: string;
        title: string;
        description: string;
        initialPrice: string;
        category: string;
    }
};
  