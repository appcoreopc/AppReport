
CREATE PROCEDURE [dbo].[GetRptSKConfig]
 as

 select ConfigKey, ConfigData
 FROM Config 
  where ModuleId=1
  and id=3


/*
DECLARE @Tbl TABLE
( 
LetterRcptDept nvarchar(max),
LetterRcptBr nvarchar(max),
LetterRcptAdd1 nvarchar(max),
LetterRcptAdd2 nvarchar(max),
LetterRcptAdd3 nvarchar(max),
LetterRcptAdd4 nvarchar(max) 
)

insert into @Tbl values (null,null,null,null,null,null) 

SELECT LetterRcptDept = CASE WHEN ConfigKey = 'LetterRcptDept' THEN ConfigData ELSE NULL END,
LetterRcptBr = CASE WHEN ConfigKey = 'LetterRcptBr' THEN ConfigData ELSE NULL END,
LetterRcptAdd1 = CASE WHEN ConfigKey = 'LetterRcptAdd1' THEN ConfigData ELSE NULL END,
LetterRcptAdd2 = CASE WHEN ConfigKey = 'LetterRcptAdd2' THEN ConfigData ELSE NULL END,
LetterRcptAdd3 = CASE WHEN ConfigKey = 'LetterRcptAdd3' THEN ConfigData ELSE NULL END,
LetterRcptAdd4 = CASE WHEN ConfigKey = 'LetterRcptAdd4' THEN ConfigData ELSE NULL END 
into #temp1
FROM Config 
  where ModuleId=1
  and id=3


 UPDATE table2 
SET 
table2.LetterRcptDept = table1.LetterRcptDept, 
table2.LetterRcptBr = table1.LetterRcptBr,
table2.LetterRcptAdd1 = table1.LetterRcptAdd1,
table2.LetterRcptAdd2 = table1.LetterRcptAdd2,
table2.LetterRcptAdd3 = table1.LetterRcptAdd3,
table2.LetterRcptAdd4 = table1.LetterRcptAdd4 
FROM #temp1 as table1, @Tbl as table2  

select* from @Tbl

drop table #temp1*/