CREATE TABLE [dbo].[User] (
    [id]       INT          IDENTITY (1, 1) NOT NULL,
    [name]     VARCHAR (50) NULL,
    [username] VARCHAR (50) NULL,
    [password] VARCHAR (50) NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([id] ASC)
);

