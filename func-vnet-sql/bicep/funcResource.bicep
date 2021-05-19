targetScope = 'resourceGroup'

// general params
param location string = resourceGroup().location
param tags object

// App plan + function app params
param appName string

/* 
    sku.name = 'EP1'
    sku.tier = 'ElasticPremium'
*/
@allowed([
  'EP1'
])
param appSku string
param appSkuTier string

var appNameSuffix = uniqueString(appName)
var functionRuntime = 'dotnet'
var functionAppPlan = 'plan-${appNameSuffix}'
var functionAppName = 'func-${appNameSuffix}'

// App settings
param sqlConnString string

// Storage account
/* 
    sku.name = 'Standard_LRS'
    sku.tier = 'Standard'
    properties.accesstier = 'Hot'
*/
@allowed([
  'Standard_LRS'
])
param storageSku string
param storageSkuTier string
param storageAccessTier string

//remove dashes for storage account name
var storageAccountName = toLower('stg${format('{0}sta', replace(appNameSuffix, '-', ''))}')


// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-02-01' = {
  name: storageAccountName
  location: resourceGroup().location
  sku: {
    name: storageSku
    tier: storageSkuTier
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    accessTier: storageAccessTier
  }
  tags: tags
}

// App Service plan
resource functionPlan 'Microsoft.Web/serverFarms@2020-12-01' = {
  name: functionAppPlan
  location: resourceGroup().location
  kind: 'elastic'
  sku: {
    name: appSku
    tier: appSkuTier
  }
  properties: {
    maximumElasticWorkerCount: 1
  }
  tags: tags
}

// Function
resource functionApp 'Microsoft.Web/sites@2020-06-01' = {
  name: functionAppName
  location: resourceGroup().location
  kind: 'functionapp'
  properties: {
    serverFarmId: functionPlan.id
  }
  tags: tags
}

resource functionAppSettings 'Microsoft.Web/sites/config@2020-12-01' = {
  name: '${functionApp.name}/appsettings'
  properties: {
    'AzureWebJobsStorage': 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listkeys(storageAccount.id, '2019-06-01').keys[0].value}'
    'FUNCTIONS_EXTENSION_VERSION': '~3'
    'FUNCTIONS_WORKER_RUNTIME': functionRuntime
    'WEBSITE_RUN_FROM_PACKAGE': '1'
    'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING': 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listkeys(storageAccount.id, '2019-06-01').keys[0].value}'
    'WEBSITE_CONTENTSHARE': functionApp.name
  }
}
