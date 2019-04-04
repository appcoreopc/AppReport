USE [PTS]
GO
/****** Object:  Trigger [dbo].[RptLG_YBgt_Update]    Script Date: 3/10/2019 1:19:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 

ALTER TRIGGER [dbo].[RptLG_YBgt_Update]
       ON [dbo].[RptLG_YBgt]
AFTER UPDATE
AS
BEGIN
SET NOCOUNT ON;
   
	declare @RptId as int,
	@IsLocal bit   

	SELECT @RptId = RptId, @IsLocal = IsLocal
	FROM inserted
 
	
	
	UPDATE RptLG_YBgt
	SET F_DutyImpCost = (isnull(F_Cost,0) * isnull(F_DutyImpRate,1)) 
	WHERE RptId = @RptId 

	UPDATE RptLG_YBgt
	SET F_GSTCost = (isnull(F_Cost,0) + isnull(F_DutyImpCost,0)) * isnull(F_GSTRate,1)  
	WHERE RptId = @RptId 


	UPDATE RptLG_YBgt
	SET F_TaxCost = (isnull(F_DutyImpCost,0) + isnull(F_GSTCost,0))  	 
	WHERE RptId = @RptId   


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