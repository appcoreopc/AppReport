
CREATE PROCEDURE [dbo].[UpdRptSK]
@RptId int,
@RptStatusId int,
@RptDate datetime,
@RefNo varchar(20),
@LetterDate datetime,
@LRcptDept nvarchar(50),
@LRcptBr nvarchar(50),
@LRcptAdd1 nvarchar(100),
@LRcptAdd2 nvarchar(100),
@LRcptAdd3 nvarchar(100),
@LRcptAdd4 nvarchar(100),
@SignedByEmpId int,
@SignedByPos as nvarchar(50),
@SignedByName as nvarchar(50),
@SignedByIDNo as nvarchar(20), 
@SignedDate datetime, 
@SignedByName_Imp nvarchar(50),
@SignedByIDNo_Imp varchar(20),
@SignedByPos_Imp nvarchar(50),
@UserId int
AS


--declare 
--@RptId int,
--@RptStatusId int,
--@RptDate datetime,
--@RefNo varchar(20),
--@LetterDate datetime,
--@LRcptDept nvarchar(50),
--@LRcptBr nvarchar(50),
--@LRcptAdd1 nvarchar(100),
--@LRcptAdd2 nvarchar(100),
--@LRcptAdd3 nvarchar(100),
--@LRcptAdd4 nvarchar(100),
--@SignedByEmpId int,
--@SignedByPos as nvarchar(50),
--@SignedByName as nvarchar(50),
--@SignedByIDNo as nvarchar(20), 
--@SignedDate date, 
--@SignedByName_Imp nvarchar(50),
--@SignedByIDNo_Imp varchar(20),
--@SignedByPos_Imp nvarchar(50),
--@UserId int

		     
declare @CurrentDT datetime =  getdate()


if(@RptId > 0)
begin
   UPDATE [dbo].[RptSK]
   SET RptStatusId = @RptStatusId,
   RptDate = @RptDate,
   RefNo =  @RefNo,
   LetterDate =  @LetterDate,
   LRcptDept =  @LRcptDept,
   LRcptBr =  @LRcptBr,
   LRcptAdd1 =  @LRcptAdd1,
   LRcptAdd2 =  @LRcptAdd2,
   LRcptAdd3 =  @LRcptAdd3,
   LRcptAdd4 =  @LRcptAdd4,
   SignedByEmpId =  @SignedByEmpId,
   SignedByPos =  @SignedByPos,
   SignedByName =  @SignedByName,
   SignedByIDNo =  @SignedByIDNo,
   SignedDate =  @SignedDate,
   SignedByName_Imp =  @SignedByName_Imp,
   SignedByIDNo_Imp =  @SignedByIDNo_Imp,
   SignedByPos_Imp =  @SignedByPos_Imp,
   EditedByUserId =  @UserId,
   EditedDT =  @CurrentDT
   WHERE RptId = @RptId

	return @RptId
end
else
begin
	INSERT INTO [dbo].[RptSK]
			   ([RptStatusId],
			   [RptDate],
			   [RefNo],
			   [LetterDate],
			   [LRcptDept],
			   [LRcptBr],
			   [LRcptAdd1],
			   [LRcptAdd2],
			   [LRcptAdd3],
			   [LRcptAdd4],
			   [SignedByEmpId],
			   [SignedByPos],
			   [SignedByName],
			   [SignedByIDNo],
			   [SignedDate],
			   [SignedByName_Imp],
			   [SignedByIDNo_Imp],
			   [SignedByPos_Imp],
			   [CreatedByUserId],
			   [CreatedDT])
     VALUES
           (@RptStatusId,
           @RptDate,
           @RefNo,
           @LetterDate,
           @LRcptDept,
           @LRcptBr,
           @LRcptAdd1,
           @LRcptAdd2,
           @LRcptAdd3,
           @LRcptAdd4,
           @SignedByEmpId,
           @SignedByPos,
           @SignedByName,
           @SignedByIDNo,
           @SignedDate,
           @SignedByName_Imp,
           @SignedByIDNo_Imp,
           @SignedByPos_Imp,
           @UserId,
           @CurrentDT)

	return SCOPE_IDENTITY()

end