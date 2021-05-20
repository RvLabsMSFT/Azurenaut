targetScope = 'subscription'

// resource groups
@allowed([
  'eastus'
])
param location string = 'eastus'
param rgVnet string = 'connectivity-services-rg'
param rgApp string = 'app-services-rg'
param rgDb string = 'data-services-rg'

// vnet
param vnetName string = 'vnet-core-${uniqueString('vnet')}'
param vnetAddressPrefix string = '10.55.0.0/16'
param snetName string = 'snet-func-${uniqueString('snet')}'
param snetAddressPrefix string = '10.55.1.0/24'

// function
param funcAppName string = uniqueString('sampleapp')

@allowed([
  'EP1'
])
param appSku string = 'EP1'
param appSkuTier string = 'ElasticPremium'

// app settings for db connection
param sqlConnString string

//storage account
var storageSku = 'Standard_LRS'
var storageSkuTier = 'Standard'
var storageAccessTier = 'Hot'
var tags = {
  stage: 'Func Vnet integration sample'
  scenario: 'POC'
}

resource vnetRg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: rgVnet
  location: location
  tags: tags
}

resource funcAppRg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: rgApp
  location: location
  tags: tags
}

module vnetDeploy 'vnetResource.bicep' = {
  name: 'vnet-deploy'
  scope: vnetRg
  params: {
    vnetName: vnetName
    snetName: snetName
    tags: tags
    vnetAddressPrefix: vnetAddressPrefix
    snetAddressPrefix: snetAddressPrefix
  }
}

module funtionAppDeploy 'funcResource.bicep' = {
  scope: funcAppRg
  name:  'function-deploy'
  params: {
    appName: funcAppName
    appSku: appSku
    appSkuTier: appSkuTier
    sqlConnString: sqlConnString
    storageSku: storageSku
    storageSkuTier: storageSkuTier
    storageAccessTier: storageAccessTier
    tags: tags
  }
  
}
