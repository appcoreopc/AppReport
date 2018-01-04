CREATE TABLE [dbo].[Config] (
    [ConfigId]        INT            IDENTITY (1, 1) NOT NULL,
    [ConfigKey]       VARCHAR (50)   NULL,
    [ConfigData]      NVARCHAR (MAX) NULL,
    [ModuleId]        INT            NULL,
    [Id]              INT            NULL,
    [CreatedByUserId] INT            NULL,
    [CreatedDT]       DATETIME       NULL,
    [EditedByUserId]  INT            NULL,
    [EditedDT]        DATETIME       NULL,
    CONSTRAINT [PK_Config] PRIMARY KEY CLUSTERED ([ConfigId] ASC)
);

