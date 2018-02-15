CREATE TABLE [dbo].[STNCustom] (
    [STNCustomId]     INT           IDENTITY (1, 1) NOT NULL,
    [STNCustomName]   NVARCHAR (20) NULL,
    [IsLocal]         BIT           NULL,
    [CreatedByUserId] INT           NULL,
    [CreatedDT]       DATETIME      NULL,
    [EditedByUserId]  INT           NULL,
    [EditedDT]        DATETIME      NULL,
    CONSTRAINT [PK_STNCustom] PRIMARY KEY CLUSTERED ([STNCustomId] ASC)
);



