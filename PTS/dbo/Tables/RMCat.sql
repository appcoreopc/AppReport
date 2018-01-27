CREATE TABLE [dbo].[RMCat] (
    [RMCatId]         INT           NOT NULL,
    [RMCatName]       NVARCHAR (50) NULL,
    [CreatedByUserId] INT           NULL,
    [CreatedDT]       DATETIME      NULL,
    [EditedByUserId]  INT           NULL,
    [EditedDT]        DATETIME      NULL,
    CONSTRAINT [PK_RMCat] PRIMARY KEY CLUSTERED ([RMCatId] ASC)
);



