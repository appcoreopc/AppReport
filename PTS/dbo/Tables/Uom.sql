CREATE TABLE [dbo].[Uom] (
    [UomId]     INT           NOT NULL,
    [UomCode]   NVARCHAR (10) NULL,
    [UomName]   NVARCHAR (50) NULL,
    [UomTypeId] INT           NULL,
    CONSTRAINT [PK_Uom] PRIMARY KEY CLUSTERED ([UomId] ASC)
);

