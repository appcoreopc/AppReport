CREATE TABLE [dbo].[Component] (
    [ComponentId]     INT            NOT NULL,
    [ComponentName]   NVARCHAR (200) NULL,
    [CreatedByUserId] INT            NULL,
    [CreatedDT]       DATETIME       NULL,
    [EditedByUserId]  INT            NULL,
    [EditedDT]        DATETIME       NULL,
    CONSTRAINT [PK_Component] PRIMARY KEY CLUSTERED ([ComponentId] ASC)
);

