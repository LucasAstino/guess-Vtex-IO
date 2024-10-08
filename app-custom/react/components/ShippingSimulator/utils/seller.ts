export function getDefaultSeller(sellers?: any[]) {
    if (!sellers || sellers.length === 0) {
      return
    }
  
    const defaultSeller = sellers.find((seller) => seller.sellerDefault)
  
    if (defaultSeller) {
      return defaultSeller
    }
  
    return sellers[0]
  }