CREATE TABLE [dbo].[RptLG_YRdy] (
    [TxnId]        INT             IDENTITY (1, 1) NOT NULL,
    [RptId]        INT             NULL,
    [ReadyStockId] INT             NULL,
    [StkDesc]      NVARCHAR (500)  NULL,
    [TariffCode]   VARCHAR (50)    NULL,
    [Qty]          INT             NULL,
    [Cost]         DECIMAL (18, 2) NULL,
    [DutyImpRate]  DECIMAL (18, 2) NULL,
    [DutyImpCost]  DECIMAL (18, 2) NULL,
    [GSTRate]      DECIMAL (18, 2) NULL,
    [GSTCost]      DECIMAL (18, 2) NULL,
    [TaxCost]      DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_RptLG_YRdyStk] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);












GO



CREATE TRIGGER [dbo].[RptLG_YRdy_Update]
       ON [dbo].[RptLG_YRdy]
AFTER UPDATE
AS
BEGIN
SET NOCOUNT ON;
    
	declare @RptId as int  
 
	SELECT @RptId = RptId 
	FROM inserted
  

	UPDATE RptLG_YRdy
	SET DutyImpCost = (isnull(Cost,0) * isnull(DutyImpRate,1)) 
	WHERE RptId = @RptId 

	UPDATE RptLG_YRdy
	SET GSTCost = (isnull(Cost,0) + isnull(DutyImpCost,0)) * isnull(GSTRate,1)  
	WHERE RptId = @RptId 


	UPDATE RptLG_YRdy
	SET TaxCost = (isnull(DutyImpCost,0) + isnull(GSTCost,0))  	 
	WHERE RptId = @RptId    


	declare @F_Rdy_Cost decimal(18, 2),
	@F_Rdy_DutyImpCost decimal(18, 2),
	@F_Rdy_GSTCost decimal(18, 2),
	@F_Rdy_TaxCost decimal(18, 2) 
	 
	select  
		@F_Rdy_Cost = sum(isnull(Qty,0)), 
		@F_Rdy_DutyImpCost = sum(isnull(Cost,0)), 
		@F_Rdy_GSTCost = sum(isnull(DutyImpCost,0)), 
		@F_Rdy_TaxCost = sum(isnull(GSTCost,0))  
	from RptLG_YRdy with (nolock)
	where RptId = @RptId 
	 
   update RptLG
	set  
		F_Rdy_Cost = @F_Rdy_Cost, 
		F_Rdy_DutyImpCost = @F_Rdy_DutyImpCost, 
		F_Rdy_GSTCost = @F_Rdy_GSTCost, 
		F_Rdy_TaxCost = @F_Rdy_TaxCost 
	where RptId = @RptId  

END