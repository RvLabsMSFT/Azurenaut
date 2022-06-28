CREATE TABLE [dbo].[Product](
	[ProductID] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[ProductNumber] [nvarchar](25) NOT NULL,
	[Color] [nvarchar](15) NULL,
	[StandardCost] [money] NOT NULL,
	[ListPrice] [money] NOT NULL,
	[Size] [nvarchar](5) NULL,
	[Weight] [decimal](8, 2) NULL,
	[ProductCategoryID] [int] NULL,
	[ProductModelID] [int] NULL,
	[ModifiedDate] [datetime] NOT NULL
)