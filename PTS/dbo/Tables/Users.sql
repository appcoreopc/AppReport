CREATE TABLE [dbo].[Users] (
    [UserId]          INT          IDENTITY (1, 1) NOT NULL,
    [UserTypeId]      INT          NULL,
    [Username]        VARCHAR (20) NULL,
    [Password]        VARCHAR (20) NULL,
    [CreatedByUserId] INT          NULL,
    [CreatedDT]       DATETIME     NULL,
    [EditedByUserId]  INT          NULL,
    [EditedDT]        DATETIME     NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserId] ASC)
);

