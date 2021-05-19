targetScope = 'resourceGroup'

param vnetName string
param snetName string
param vnetAddressPrefix string
param snetAddressPrefix string
param tags object


resource hubVnet 'Microsoft.Network/virtualNetworks@2020-07-01' = {
  name: vnetName
  location: resourceGroup().location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: [ 
        vnetAddressPrefix 
      ]
    }
    subnets: [
      {
        name: snetName
        properties: {
          addressPrefix: snetAddressPrefix
        }
      }
    ]
  }
}
