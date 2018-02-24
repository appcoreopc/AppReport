CREATE TABLE [dbo].[RptLG_YRdy] (
    [TxnId]        INT             IDENTITY (1, 1) NOT NULL,
    [RptId]        INT             NULL,
    [ReadyStockId] INT             NULL,
    [StkDesc]      NVARCHAR (500)  NULL,
    [TariffCode]   VARCHAR (50)    NULL,
    [Qty]          INT             NULL,
    [Cost]         DECIMAL (18, 2) NULL,
    [DutyImpRate]  DECIMAL (5, 2)  NULL,
    [DutyImpCost]  DECIMAL (18, 2) NULL,
    [GSTRate]      DECIMAL (5, 2)  NULL,
    [GSTCost]      DECIMAL (18, 2) NULL,
    [TaxCost]      DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_RptLG_YRdyStk] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);






GO

create TRIGGER [dbo].[RptLG_YRdy_Update]
       ON [dbo].[RptLG_YRdy]
AFTER INSERT, UPDATE
AS
BEGIN
SET NOCOUNT ON;
    
	declare @RptId as int  

	SELECT @RptId = RptId 
	FROM inserted
  

	UPDATE t
	SET t.DutyImpCost = (isnull(t.Cost,0) * isnull(o.DutyImpRate,1)),
	t.GSTCost = (isnull(t.Cost,0) + (isnull(t.Cost,0) * isnull(o.DutyImpRate,1)))  
	FROM RptLG_YRdy t with (nolock) 
	JOIN ReadyStock o with (nolock) ON t.ReadyStockId = o.ReadyStockId 
	WHERE t.RptId = @RptId 
	 

	UPDATE t
	SET t.TaxCost = (isnull(t.DutyImpCost,0) + isnull(t.GSTCost,0))  	
	FROM RptLG_YRdy t with (nolock)  
	WHERE t.RptId = @RptId    


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