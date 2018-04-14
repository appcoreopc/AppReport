CREATE TABLE [dbo].[RMCat] (
    [RMCatId]         INT           IDENTITY (1, 1) NOT NULL,
    [RMCatName]       NVARCHAR (50) NULL,
    [CreatedByUserId] INT           NULL,
    [CreatedDT]       DATETIME      NULL,
    [EditedByUserId]  INT           NULL,
    [EditedDT]        DATETIME      NULL,
    [TariffCode]      VARCHAR (50)  NULL,
    CONSTRAINT [PK_RMCat] PRIMARY KEY CLUSTERED ([RMCatId] ASC)
);







