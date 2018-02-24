CREATE TABLE [dbo].[RptLG_YBgt] (
    [TxnId]         INT             IDENTITY (1, 1) NOT NULL,
    [RptId]         INT             NULL,
    [IsLocal]       BIT             NULL,
    [RMId]          INT             NULL,
    [F_RMCatName]   NVARCHAR (100)  NULL,
    [F_RMDesc]      NVARCHAR (500)  NULL,
    [F_UOMCode]     NVARCHAR (10)   NULL,
    [F_TariffCode]  VARCHAR (50)    NULL,
    [F_CountryList] VARCHAR (50)    NULL,
    [Qty]           INT             NULL,
    [F_Cost]        DECIMAL (18, 2) NULL,
    [F_DutyImpRate] DECIMAL (5, 2)  NULL,
    [F_DutyImpCost] DECIMAL (18, 2) NULL,
    [F_GSTRate]     DECIMAL (5, 2)  NULL,
    [F_GSTCost]     DECIMAL (18, 2) NULL,
    [F_TaxCost]     DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_RptLG_YBgtStk] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);






GO

CREATE TRIGGER [dbo].[RptLG_YBgt_Update]
       ON [dbo].[RptLG_YBgt]
AFTER INSERT, UPDATE
AS
BEGIN
SET NOCOUNT ON;
   

	declare @RptId as int,
	@IsLocal bit   

	SELECT @RptId = RptId, @IsLocal = IsLocal
	FROM inserted
 
	
	UPDATE t
	SET t.F_DutyImpCost = (isnull(t.F_Cost,0) * isnull(o.DutyImpRate,1)),
	t.F_GSTCost = (isnull(t.F_Cost,0) + (isnull(t.F_Cost,0) * isnull(o.DutyImpRate,1))) 
	FROM RptLG_YBgt t with (nolock) 
	JOIN RMaterial o with (nolock) ON t.RMId = o.RMId 
	WHERE t.RptId = @RptId 
	 

	UPDATE t
	SET t.F_TaxCost = (isnull(t.F_DutyImpCost,0) + isnull(t.F_GSTCost,0))  	
	FROM RptLG_YBgt t with (nolock)  
	WHERE t.RptId = @RptId    


	declare @F_Bgt_Qty as int,
	@F_Bgt_Cost as decimal(18, 2),
	@F_Bgt_DutyImpCost as decimal(18, 2),
	@F_Bgt_GSTCost as decimal(18, 2),
	@F_Bgt_TaxCost as decimal(18, 2) 

	 
	select  
		@F_Bgt_Qty = sum(isnull(Qty,0)), 
		@F_Bgt_Cost = sum(isnull(F_Cost,0)), 
		@F_Bgt_DutyImpCost = sum(isnull(F_DutyImpCost,0)), 
		@F_Bgt_GSTCost = sum(isnull(F_GSTCost,0)), 
		@F_Bgt_TaxCost = sum(isnull(F_TaxCost,0))  
	from RptLG_YBgt with (nolock)
	where RptId = @RptId
	and IsLocal = @IsLocal
	 
	  
	if (@IsLocal = 1)
	begin
	   update RptLG
		set  
		 F_Bgt_Qty_Loc = @F_Bgt_Qty, 
		 F_Bgt_Cost_Loc = @F_Bgt_Cost, 
		 F_Bgt_DutyImpCost_Loc = @F_Bgt_DutyImpCost, 
		 F_Bgt_GSTCost_Loc = @F_Bgt_GSTCost, 
		 F_Bgt_TaxCost_Loc = @F_Bgt_TaxCost 
		where RptId = @RptId 
	end
	else
	begin
	   update RptLG
		set  
		 F_Bgt_Qty_Imp = @F_Bgt_Qty, 
		 F_Bgt_Cost_Imp = @F_Bgt_Cost, 
		 F_Bgt_DutyImpCost_Imp = @F_Bgt_DutyImpCost, 
		 F_Bgt_GSTCost_Imp = @F_Bgt_GSTCost, 
		 F_Bgt_TaxCost_Imp = @F_Bgt_TaxCost 
		where RptId = @RptId 
	end
	 
	  

END