CREATE TABLE [dbo].[RptLG_YExp] (
    [TxnId]        INT             IDENTITY (1, 1) NOT NULL,
    [RptId]        INT             NULL,
    [RptY]         INT             NULL,
    [ReadyStockId] INT             NULL,
    [StkDesc]      NVARCHAR (500)  NULL,
    [TariffCode]   VARCHAR (50)    NULL,
    [OpenBalQty]   DECIMAL (10, 2) NULL,
    [OpenBalCost]  DECIMAL (18, 2) NULL,
    [MadeQty]      DECIMAL (10, 2) NULL,
    [MadeCost]     DECIMAL (18, 2) NULL,
    [ExpQty]       DECIMAL (10, 2) NULL,
    [ExpCost]      DECIMAL (18, 2) NULL,
    [LocSalesQty]  DECIMAL (10, 2) NULL,
    [LocSalesCost] DECIMAL (18, 2) NULL,
    [DamagedQty]   DECIMAL (10, 2) NULL,
    [DamagedCost]  DECIMAL (18, 2) NULL,
    [CloseBalQty]  DECIMAL (10, 2) NULL,
    [CloseBalCost] DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_ptLG_YExpStk] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);








GO



CREATE TRIGGER [dbo].[RptLG_YExp_Update]
       ON [dbo].[RptLG_YExp]
AFTER UPDATE
AS
BEGIN
SET NOCOUNT ON;
   

	declare @RptId as int  

	SELECT @RptId = RptId 
	FROM inserted
 
	
	UPDATE RptLG_YExp
	SET CloseBalQty = (isnull(OpenBalQty,0) + isnull(MadeQty,0)) 
	- (isnull(ExpQty,0) + isnull(LocSalesQty,0) + isnull(DamagedQty,0)), 
	CloseBalCost = (isnull(OpenBalCost,0) + isnull(MadeCost,0)) 
	- (isnull(ExpCost,0) + isnull(LocSalesCost,0) + isnull(DamagedCost,0))
	WHERE RptId = @RptId  
	 

	 declare @F_Exp_OpenBalQty_Y2 as decimal(10, 2),
	 @F_Exp_OpenBalCost_Y2 as decimal(18, 2),
	 @F_Exp_MadeQty_Y2 as decimal(10, 2),
	 @F_Exp_MadeCost_Y2 as decimal(18, 2),
	 @F_Exp_Qty_Y2 as decimal(10, 2),
	 @F_Exp_Cost_Y2 as decimal(18, 2),
	 @F_Exp_LocSalesQty_Y2 as decimal(10, 2),
	 @F_Exp_LocSalesCost_Y2 as decimal(18, 2),
	 @F_Exp_DamagedQty_Y2 as decimal(10, 2),
	 @F_Exp_DamagedCost_Y2 as decimal(18, 2),
	 @F_Exp_CloseQty_Y2 as decimal(10, 2),
	 @F_Exp_CloseCost_Y2 as decimal(18, 2)

	
	select 
	 @F_Exp_OpenBalQty_Y2 = sum(isnull(OpenBalQty,0)), 
	 @F_Exp_OpenBalCost_Y2 = sum(isnull(OpenBalCost,0)), 
	 @F_Exp_MadeQty_Y2 = sum(isnull(MadeQty,0)), 
	 @F_Exp_MadeCost_Y2 = sum(isnull(MadeCost,0)), 
	 @F_Exp_Qty_Y2 = sum(isnull(ExpQty,0)), 
	 @F_Exp_Cost_Y2  = sum(isnull(ExpCost,0)), 
	 @F_Exp_LocSalesQty_Y2 = sum(isnull(LocSalesQty,0)), 
	 @F_Exp_LocSalesCost_Y2 = sum(isnull(LocSalesCost,0)), 
	 @F_Exp_DamagedQty_Y2 = sum(isnull(DamagedQty,0)), 
	 @F_Exp_DamagedCost_Y2 = sum(isnull(DamagedCost,0)), 
	 @F_Exp_CloseQty_Y2 = sum(isnull(CloseBalQty,0)), 
	 @F_Exp_CloseCost_Y2 = sum(isnull(CloseBalCost,0))
	from RptLG_YExp with (nolock)
	where RptId = @RptId


	update RptLG
	set  
	 F_Exp_OpenBalQty_Y2 = @F_Exp_OpenBalQty_Y2, 
	 F_Exp_OpenBalCost_Y2 = @F_Exp_OpenBalCost_Y2, 
	 F_Exp_MadeQty_Y2 = @F_Exp_MadeQty_Y2, 
	 F_Exp_MadeCost_Y2 = @F_Exp_MadeCost_Y2, 
	 F_Exp_Qty_Y2 = @F_Exp_Qty_Y2, 
	 F_Exp_Cost_Y2  = @F_Exp_Cost_Y2, 
	 F_Exp_LocSalesQty_Y2 = @F_Exp_LocSalesQty_Y2, 
	 F_Exp_LocSalesCost_Y2 = @F_Exp_LocSalesCost_Y2, 
	 F_Exp_DamagedQty_Y2 = @F_Exp_DamagedQty_Y2, 
	 F_Exp_DamagedCost_Y2 = @F_Exp_DamagedCost_Y2, 
	 F_Exp_CloseQty_Y2 = @F_Exp_CloseQty_Y2, 
	 F_Exp_CloseCost_Y2 = @F_Exp_CloseCost_Y2  
	where RptId = @RptId
	  

END