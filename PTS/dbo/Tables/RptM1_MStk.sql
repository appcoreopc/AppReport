CREATE TABLE [dbo].[RptM1_MStk] (
    [MStkId]       INT             IDENTITY (1, 1) NOT NULL,
    [RptId]        INT             NULL,
    [RMId]         INT             NULL,
    [F_RMCatName]  NVARCHAR (100)  NULL,
    [F_RMDesc]     NVARCHAR (500)  NULL,
    [F_UOMCode]    NVARCHAR (10)   NULL,
    [F_TariffCode] VARCHAR (50)    NULL,
    [F_OpenBal]    DECIMAL (10, 2) NULL,
    [UsedCost]     DECIMAL (18, 2) NULL,
    [WastedCost]   DECIMAL (18, 2) NULL,
    [F_TotalRM]    DECIMAL (10, 2) NULL,
    [F_CloseBal]   DECIMAL (10, 2) NULL,
    CONSTRAINT [PK_RptM1Trans] PRIMARY KEY CLUSTERED ([MStkId] ASC)
);










GO


CREATE TRIGGER [dbo].[RptM1_MStk_Update]
       ON [dbo].[RptM1_MStk]
AFTER UPDATE
AS
BEGIN
SET NOCOUNT ON;

	declare @RptId as int , 
	@F_WastedCost as decimal(18,2),  
	@F_UsedCost as decimal(18,2)   
  
	SELECT @RptId = RptId 
	FROM inserted
	 
	select @F_UsedCost = sum(isnull(UsedCost,0)), @F_WastedCost = sum(isnull(WastedCost,0))
	from RptM1_MStk with (nolock) 
	WHERE RptId = @RptId
	
	update RptM1 
	set F_WastedCost = @F_WastedCost, F_UsedCost = @F_UsedCost
	where RptId = @RptId 
	 

	UPDATE RptM1_MStk
	SET F_CloseBal = F_TotalRM - (WastedCost + UsedCost) 
	WHERE RptId = @RptId
	  

END