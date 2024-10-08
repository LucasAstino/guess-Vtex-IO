query getShippingEstimates(
  $items: [ShippingItem]
  $postalCode: String
  $country: String
) {
  shipping(items: $items, postalCode: $postalCode, country: $country) {
    logisticsInfo {
      itemIndex
      slas {
        id
        friendlyName
        price
        shippingEstimate
        shippingEstimateDate
      }
    }
  }
}