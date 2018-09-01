CREATE TABLE [dbo].[FactoryStatus] (
    [FactoryStatusId]   INT           NOT NULL,
    [FactoryStatusName] NVARCHAR (50) NULL,
    CONSTRAINT [PK_FactoryStatus] PRIMARY KEY CLUSTERED ([FactoryStatusId] ASC)
);

