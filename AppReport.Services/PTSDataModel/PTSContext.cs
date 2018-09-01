using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class PTSContext : DbContext
    {
        public virtual DbSet<Component> Component { get; set; }
        public virtual DbSet<Config> Config { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Currency> Currency { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<FactoryStatus> FactoryStatus { get; set; }
        public virtual DbSet<Grn> Grn { get; set; }
        public virtual DbSet<JobTitle> JobTitle { get; set; }
        public virtual DbSet<Module> Module { get; set; }
        public virtual DbSet<ReadyStock> ReadyStock { get; set; }
        public virtual DbSet<Report> Report { get; set; }
        public virtual DbSet<Rmaterial> Rmaterial { get; set; }
        public virtual DbSet<Rmcat> Rmcat { get; set; }
        public virtual DbSet<RptLg> RptLg { get; set; }
        public virtual DbSet<RptLgYbgt> RptLgYbgt { get; set; }
        public virtual DbSet<RptLgYexp> RptLgYexp { get; set; }
        public virtual DbSet<RptLgYimp> RptLgYimp { get; set; }
        public virtual DbSet<RptLgYrdy> RptLgYrdy { get; set; }
        public virtual DbSet<RptM1> RptM1 { get; set; }
        public virtual DbSet<RptM1Mstk> RptM1Mstk { get; set; }
        public virtual DbSet<RptM1MstkInv> RptM1MstkInv { get; set; }
        public virtual DbSet<RptSk> RptSk { get; set; }
        public virtual DbSet<RptSkMimp> RptSkMimp { get; set; }
        public virtual DbSet<RptStatus> RptStatus { get; set; }
        public virtual DbSet<Stncustom> Stncustom { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }
        public virtual DbSet<Uom> Uom { get; set; }
        public virtual DbSet<UomType> UomType { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=DESKTOP-AM4N82T\SQLEXPRESS;Database=PTS;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Component>(entity =>
            {
                entity.Property(e => e.ComponentId).ValueGeneratedNever();

                entity.Property(e => e.ComponentName).HasMaxLength(200);

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Config>(entity =>
            {
                entity.HasKey(e => e.ConfigId);

                entity.Property(e => e.ConfigKey)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.Property(e => e.CountryId).ValueGeneratedNever();

                entity.Property(e => e.CountryName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Currency>(entity =>
            {
                entity.Property(e => e.CurrencyId).ValueGeneratedNever();

                entity.Property(e => e.CurrencyCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CurrencyName).HasMaxLength(20);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmpId);

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EmpAd1).HasMaxLength(100);

                entity.Property(e => e.EmpAd2).HasMaxLength(100);

                entity.Property(e => e.EmpAd3).HasMaxLength(100);

                entity.Property(e => e.EmpIdno)
                    .HasColumnName("EmpIDNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.EmpName).HasMaxLength(50);
            });

            modelBuilder.Entity<FactoryStatus>(entity =>
            {
                entity.Property(e => e.FactoryStatusId).ValueGeneratedNever();

                entity.Property(e => e.FactoryStatusName).HasMaxLength(50);
            });

            modelBuilder.Entity<Grn>(entity =>
            {
                entity.ToTable("GRN");

                entity.Property(e => e.Grnid).HasColumnName("GRNId");

                entity.Property(e => e.Amt).HasColumnName("AMT");

                entity.Property(e => e.CargoPrmt)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Cif).HasColumnName("CIF");

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.CurrencyAdj)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomDate).HasColumnType("date");

                entity.Property(e => e.CustomNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DocRefNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Dom)
                    .HasColumnName("DOM")
                    .HasColumnType("date");

                entity.Property(e => e.Dono)
                    .HasColumnName("DONo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Edifee).HasColumnName("EDIFee");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.ExRate).HasColumnType("decimal(24, 14)");

                entity.Property(e => e.Forwarder).HasMaxLength(50);

                entity.Property(e => e.FreightGst).HasColumnName("FreightGST");

                entity.Property(e => e.FwdInvNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Grndate)
                    .HasColumnName("GRNDate")
                    .HasColumnType("date");

                entity.Property(e => e.Gst).HasColumnName("GST");

                entity.Property(e => e.Height).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.HeightUom).HasColumnName("HeightUOM");

                entity.Property(e => e.InvoiceNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Kaswgt)
                    .HasColumnName("KASWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Lotno)
                    .HasColumnName("LOTNo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Otdlate)
                    .HasColumnName("OTDLate")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Pono)
                    .HasColumnName("PONo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rmid).HasColumnName("RMId");

                entity.Property(e => e.RollUom).HasColumnName("RollUOM");

                entity.Property(e => e.StncustomId).HasColumnName("STNCustomId");

                entity.Property(e => e.Thick).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.ThickUom).HasColumnName("ThickUOM");

                entity.Property(e => e.TotalFreightRmcost).HasColumnName("TotalFreightRMCost");

                entity.Property(e => e.Vcarno)
                    .HasColumnName("VCARNo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Wgt).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Width).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.WidthUom).HasColumnName("WidthUOM");
            });

            modelBuilder.Entity<JobTitle>(entity =>
            {
                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.JobTitleName).HasMaxLength(50);
            });

            modelBuilder.Entity<Module>(entity =>
            {
                entity.Property(e => e.ModuleId).ValueGeneratedNever();

                entity.Property(e => e.ModuleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ReadyStock>(entity =>
            {
                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.Gstrate).HasColumnName("GSTRate");

                entity.Property(e => e.ReadyStockDesc).HasMaxLength(500);

                entity.Property(e => e.TariffCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Uomid).HasColumnName("UOMId");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.Property(e => e.ReportId).ValueGeneratedNever();

                entity.Property(e => e.ReportCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ReportName).HasMaxLength(200);
            });

            modelBuilder.Entity<Rmaterial>(entity =>
            {
                entity.HasKey(e => e.Rmid);

                entity.ToTable("RMaterial");

                entity.Property(e => e.Rmid).HasColumnName("RMId");

                entity.Property(e => e.CountryList)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.Gstrate).HasColumnName("GSTRate");

                entity.Property(e => e.RmcatId).HasColumnName("RMCatId");

                entity.Property(e => e.Rmcode)
                    .HasColumnName("RMCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rmdesc)
                    .HasColumnName("RMDesc")
                    .HasMaxLength(500);

                entity.Property(e => e.Uomid).HasColumnName("UOMId");
            });

            modelBuilder.Entity<Rmcat>(entity =>
            {
                entity.ToTable("RMCat");

                entity.Property(e => e.RmcatId).HasColumnName("RMCatId");

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.Gstrate).HasColumnName("GSTRate");

                entity.Property(e => e.RmcatName)
                    .HasColumnName("RMCatName")
                    .HasMaxLength(50);

                entity.Property(e => e.TariffCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Uomid).HasColumnName("UOMId");
            });

            modelBuilder.Entity<RptLg>(entity =>
            {
                entity.HasKey(e => e.RptId);

                entity.ToTable("RptLG");

                entity.Property(e => e.AppAdd1).HasMaxLength(100);

                entity.Property(e => e.AppAdd2).HasMaxLength(100);

                entity.Property(e => e.AppAdd3).HasMaxLength(100);

                entity.Property(e => e.AppAdd4).HasMaxLength(100);

                entity.Property(e => e.AppByIdno)
                    .HasColumnName("AppByIDNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AppByName).HasMaxLength(50);

                entity.Property(e => e.AppByPos).HasMaxLength(50);

                entity.Property(e => e.AppCoName).HasMaxLength(50);

                entity.Property(e => e.AppDate).HasColumnType("date");

                entity.Property(e => e.BgtLocSalesRate).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.BgtMktExpRate).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.BgtRmcost).HasColumnName("BgtRMCost");

                entity.Property(e => e.BrcptAdd1)
                    .HasColumnName("BRcptAdd1")
                    .HasMaxLength(100);

                entity.Property(e => e.BrcptAdd2)
                    .HasColumnName("BRcptAdd2")
                    .HasMaxLength(100);

                entity.Property(e => e.BrcptAdd3)
                    .HasColumnName("BRcptAdd3")
                    .HasMaxLength(100);

                entity.Property(e => e.BrcptAdd4)
                    .HasColumnName("BRcptAdd4")
                    .HasMaxLength(100);

                entity.Property(e => e.BrcptBr)
                    .HasColumnName("BRcptBr")
                    .HasMaxLength(50);

                entity.Property(e => e.BrcptDept)
                    .HasColumnName("BRcptDept")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.FBgtCostImp).HasColumnName("F_Bgt_Cost_Imp");

                entity.Property(e => e.FBgtCostLoc).HasColumnName("F_Bgt_Cost_Loc");

                entity.Property(e => e.FBgtDutyImpCostImp).HasColumnName("F_Bgt_DutyImpCost_Imp");

                entity.Property(e => e.FBgtDutyImpCostLoc).HasColumnName("F_Bgt_DutyImpCost_Loc");

                entity.Property(e => e.FBgtGstcostImp).HasColumnName("F_Bgt_GSTCost_Imp");

                entity.Property(e => e.FBgtGstcostLoc).HasColumnName("F_Bgt_GSTCost_Loc");

                entity.Property(e => e.FBgtQtyImp).HasColumnName("F_Bgt_Qty_Imp");

                entity.Property(e => e.FBgtQtyLoc).HasColumnName("F_Bgt_Qty_Loc");

                entity.Property(e => e.FBgtTaxCostImp).HasColumnName("F_Bgt_TaxCost_Imp");

                entity.Property(e => e.FBgtTaxCostLoc).HasColumnName("F_Bgt_TaxCost_Loc");

                entity.Property(e => e.FCoAdd1)
                    .HasColumnName("F_CoAdd1")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd2)
                    .HasColumnName("F_CoAdd2")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd3)
                    .HasColumnName("F_CoAdd3")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd4)
                    .HasColumnName("F_CoAdd4")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoEmail)
                    .HasColumnName("F_CoEmail")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoFax)
                    .HasColumnName("F_CoFax")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoLogo)
                    .HasColumnName("F_CoLogo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FCoName)
                    .HasColumnName("F_CoName")
                    .HasMaxLength(50);

                entity.Property(e => e.FCoRegNo)
                    .HasColumnName("F_CoRegNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoTel)
                    .HasColumnName("F_CoTel")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoWebsite)
                    .HasColumnName("F_CoWebsite")
                    .HasMaxLength(50);

                entity.Property(e => e.FExpCloseCostY1).HasColumnName("F_Exp_CloseCost_Y1");

                entity.Property(e => e.FExpCloseCostY2).HasColumnName("F_Exp_CloseCost_Y2");

                entity.Property(e => e.FExpCloseQtyY1)
                    .HasColumnName("F_Exp_CloseQty_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpCloseQtyY2)
                    .HasColumnName("F_Exp_CloseQty_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpCostY1).HasColumnName("F_Exp_Cost_Y1");

                entity.Property(e => e.FExpCostY2).HasColumnName("F_Exp_Cost_Y2");

                entity.Property(e => e.FExpDamagedCostY1).HasColumnName("F_Exp_DamagedCost_Y1");

                entity.Property(e => e.FExpDamagedCostY2).HasColumnName("F_Exp_DamagedCost_Y2");

                entity.Property(e => e.FExpDamagedQtyY1)
                    .HasColumnName("F_Exp_DamagedQty_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpDamagedQtyY2)
                    .HasColumnName("F_Exp_DamagedQty_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpLocSalesCostY1).HasColumnName("F_Exp_LocSalesCost_Y1");

                entity.Property(e => e.FExpLocSalesCostY2).HasColumnName("F_Exp_LocSalesCost_Y2");

                entity.Property(e => e.FExpLocSalesQtyY1)
                    .HasColumnName("F_Exp_LocSalesQty_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpLocSalesQtyY2)
                    .HasColumnName("F_Exp_LocSalesQty_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpMadeCostY1).HasColumnName("F_Exp_MadeCost_Y1");

                entity.Property(e => e.FExpMadeCostY2).HasColumnName("F_Exp_MadeCost_Y2");

                entity.Property(e => e.FExpMadeQtyY1)
                    .HasColumnName("F_Exp_MadeQty_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpMadeQtyY2)
                    .HasColumnName("F_Exp_MadeQty_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpOpenBalCostY1).HasColumnName("F_Exp_OpenBalCost_Y1");

                entity.Property(e => e.FExpOpenBalCostY2).HasColumnName("F_Exp_OpenBalCost_Y2");

                entity.Property(e => e.FExpOpenBalQtyY1)
                    .HasColumnName("F_Exp_OpenBalQty_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpOpenBalQtyY2)
                    .HasColumnName("F_Exp_OpenBalQty_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpQtyY1)
                    .HasColumnName("F_Exp_Qty_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FExpQtyY2)
                    .HasColumnName("F_Exp_Qty_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpCloseBalCostY1).HasColumnName("F_Imp_CloseBalCost_Y1");

                entity.Property(e => e.FImpCloseBalCostY2).HasColumnName("F_Imp_CloseBalCost_Y2");

                entity.Property(e => e.FImpCloseBalWgtY1)
                    .HasColumnName("F_Imp_CloseBalWgt_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpCloseBalWgtY2)
                    .HasColumnName("F_Imp_CloseBalWgt_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpImpRmcostY1).HasColumnName("F_Imp_ImpRMCost_Y1");

                entity.Property(e => e.FImpImpRmwgtY1)
                    .HasColumnName("F_Imp_ImpRMWgt_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpLocRmcostY1).HasColumnName("F_Imp_LocRMCost_Y1");

                entity.Property(e => e.FImpLocRmcostY2).HasColumnName("F_Imp_LocRMCost_Y2");

                entity.Property(e => e.FImpLocRmwgtY1)
                    .HasColumnName("F_Imp_LocRMWgt_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpLocRmwgtY2)
                    .HasColumnName("F_Imp_LocRMWgt_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpOpenBalCostY1).HasColumnName("F_Imp_OpenBalCost_Y1");

                entity.Property(e => e.FImpOpenBalCostY2).HasColumnName("F_Imp_OpenBalCost_Y2");

                entity.Property(e => e.FImpOpenBalWgtY1)
                    .HasColumnName("F_Imp_OpenBalWgt_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpOpenBalWgtY2)
                    .HasColumnName("F_Imp_OpenBalWgt_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpReturnedWgtY1)
                    .HasColumnName("F_Imp_ReturnedWgt_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpReturnedWgtY2)
                    .HasColumnName("F_Imp_ReturnedWgt_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpRmcostY2).HasColumnName("F_ImpRMCost_Y2");

                entity.Property(e => e.FImpRmwgtY2)
                    .HasColumnName("F_ImpRMWgt_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpUsedRmcostY1).HasColumnName("F_Imp_UsedRMCost_Y1");

                entity.Property(e => e.FImpUsedRmcostY2).HasColumnName("F_Imp_UsedRMCost_Y2");

                entity.Property(e => e.FImpUsedRmwgtY1)
                    .HasColumnName("F_Imp_UsedRMWgt_Y1")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpUsedRmwgtY2)
                    .HasColumnName("F_Imp_UsedRMWgt_Y2")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FLocalSalesCost).HasColumnName("F_LocalSalesCost");

                entity.Property(e => e.FMktExpCost).HasColumnName("F_MktExpCost");

                entity.Property(e => e.FRdyCost).HasColumnName("F_Rdy_Cost");

                entity.Property(e => e.FRdyDutyImpCost).HasColumnName("F_Rdy_DutyImpCost");

                entity.Property(e => e.FRdyGoodCost).HasColumnName("F_RdyGoodCost");

                entity.Property(e => e.FRdyGstcost).HasColumnName("F_Rdy_GSTCost");

                entity.Property(e => e.FRdyTaxCost).HasColumnName("F_Rdy_TaxCost");

                entity.Property(e => e.FRmcost).HasColumnName("F_RMCost");

                entity.Property(e => e.IpcRdc)
                    .HasColumnName("IPC_RDC")
                    .HasMaxLength(200);

                entity.Property(e => e.Ldate)
                    .HasColumnName("LDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.LocalSalesRate).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.LrcptAdd1)
                    .HasColumnName("LRcptAdd1")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd2)
                    .HasColumnName("LRcptAdd2")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd3)
                    .HasColumnName("LRcptAdd3")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd4)
                    .HasColumnName("LRcptAdd4")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptBr)
                    .HasColumnName("LRcptBr")
                    .HasMaxLength(50);

                entity.Property(e => e.LrcptDept)
                    .HasColumnName("LRcptDept")
                    .HasMaxLength(50);

                entity.Property(e => e.MfdLicenseEdate)
                    .HasColumnName("MfdLicenseEDate")
                    .HasColumnType("date");

                entity.Property(e => e.MfdLicenseSdate)
                    .HasColumnName("MfdLicenseSDate")
                    .HasColumnType("date");

                entity.Property(e => e.MktExpRate).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.PbbcekNo)
                    .HasColumnName("PBBCekNo")
                    .HasMaxLength(50);

                entity.Property(e => e.RefNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RepairSvc).HasMaxLength(200);

                entity.Property(e => e.RptCoName).HasMaxLength(50);

                entity.Property(e => e.RptEdateY1)
                    .HasColumnName("RptEDate_Y1")
                    .HasColumnType("date");

                entity.Property(e => e.RptEdateY2)
                    .HasColumnName("RptEDate_Y2")
                    .HasColumnType("date");

                entity.Property(e => e.RptEdateY3)
                    .HasColumnName("RptEDate_Y3")
                    .HasColumnType("date");

                entity.Property(e => e.RptSdateY1)
                    .HasColumnName("RptSDate_Y1")
                    .HasColumnType("date");

                entity.Property(e => e.RptSdateY2)
                    .HasColumnName("RptSDate_Y2")
                    .HasColumnType("date");

                entity.Property(e => e.RptSdateY3)
                    .HasColumnName("RptSDate_Y3")
                    .HasColumnType("date");

                entity.Property(e => e.RptSignedByIdno)
                    .HasColumnName("RptSignedByIDNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.RptSignedByName).HasMaxLength(50);

                entity.Property(e => e.RptSignedByPos).HasMaxLength(50);

                entity.Property(e => e.SignedByName).HasMaxLength(50);

                entity.Property(e => e.SignedByPos).HasMaxLength(50);

                entity.Property(e => e.SignedDate).HasColumnType("date");

                entity.Property(e => e.SparePart).HasMaxLength(200);

                entity.Property(e => e.ValueAdded).HasMaxLength(200);
            });

            modelBuilder.Entity<RptLgYbgt>(entity =>
            {
                entity.HasKey(e => e.TxnId);

                entity.ToTable("RptLG_YBgt");

                entity.Property(e => e.FCost).HasColumnName("F_Cost");

                entity.Property(e => e.FCountryList)
                    .HasColumnName("F_CountryList")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FDutyImpCost).HasColumnName("F_DutyImpCost");

                entity.Property(e => e.FDutyImpRate).HasColumnName("F_DutyImpRate");

                entity.Property(e => e.FGstcost).HasColumnName("F_GSTCost");

                entity.Property(e => e.FGstrate).HasColumnName("F_GSTRate");

                entity.Property(e => e.FRmcatName)
                    .HasColumnName("F_RMCatName")
                    .HasMaxLength(100);

                entity.Property(e => e.FRmdesc)
                    .HasColumnName("F_RMDesc")
                    .HasMaxLength(500);

                entity.Property(e => e.FTariffCode)
                    .HasColumnName("F_TariffCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FTaxCost).HasColumnName("F_TaxCost");

                entity.Property(e => e.FUomcode)
                    .HasColumnName("F_UOMCode")
                    .HasMaxLength(10);

                entity.Property(e => e.Rmid).HasColumnName("RMId");
            });

            modelBuilder.Entity<RptLgYexp>(entity =>
            {
                entity.HasKey(e => e.TxnId);

                entity.ToTable("RptLG_YExp");

                entity.Property(e => e.CloseBalQty).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.DamagedQty).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.ExpQty).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.LocSalesQty).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.MadeQty).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.OpenBalQty).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.StkDesc).HasMaxLength(500);

                entity.Property(e => e.TariffCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RptLgYimp>(entity =>
            {
                entity.HasKey(e => e.TxnId);

                entity.ToTable("RptLG_YImp");

                entity.Property(e => e.FCloseBalCost).HasColumnName("F_CloseBalCost");

                entity.Property(e => e.FCloseBalWgt)
                    .HasColumnName("F_CloseBalWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FImpRmcost).HasColumnName("F_ImpRMCost");

                entity.Property(e => e.FImpRmwgt)
                    .HasColumnName("F_ImpRMWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FLocRmcost).HasColumnName("F_LocRMCost");

                entity.Property(e => e.FLocRmwgt)
                    .HasColumnName("F_LocRMWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FOpenBalCost).HasColumnName("F_OpenBalCost");

                entity.Property(e => e.FOpenBalWgt)
                    .HasColumnName("F_OpenBalWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FRmcatName)
                    .HasColumnName("F_RMCatName")
                    .HasMaxLength(100);

                entity.Property(e => e.FRmdesc)
                    .HasColumnName("F_RMDesc")
                    .HasMaxLength(500);

                entity.Property(e => e.FTariffCode)
                    .HasColumnName("F_TariffCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FUomcode)
                    .HasColumnName("F_UOMCode")
                    .HasMaxLength(10);

                entity.Property(e => e.ReturnedWgt).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Rmid).HasColumnName("RMId");

                entity.Property(e => e.UsedRmcost).HasColumnName("UsedRMCost");

                entity.Property(e => e.UsedRmwgt)
                    .HasColumnName("UsedRMWgt")
                    .HasColumnType("decimal(10, 2)");
            });

            modelBuilder.Entity<RptLgYrdy>(entity =>
            {
                entity.HasKey(e => e.TxnId);

                entity.ToTable("RptLG_YRdy");

                entity.Property(e => e.Gstcost).HasColumnName("GSTCost");

                entity.Property(e => e.Gstrate).HasColumnName("GSTRate");

                entity.Property(e => e.StkDesc).HasMaxLength(500);

                entity.Property(e => e.TariffCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RptM1>(entity =>
            {
                entity.HasKey(e => e.RptId);

                entity.Property(e => e.AppdByIdno)
                    .HasColumnName("AppdByIDNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AppdByName).HasMaxLength(50);

                entity.Property(e => e.AppdByPos).HasMaxLength(50);

                entity.Property(e => e.CreatedByIdno)
                    .HasColumnName("CreatedByIDNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedByName).HasMaxLength(50);

                entity.Property(e => e.CreatedByPos).HasMaxLength(50);

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EqGst).HasColumnName("EqGST");

                entity.Property(e => e.ExpQuota).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.FCloseBal)
                    .HasColumnName("F_CloseBal")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FCoAdd1)
                    .HasColumnName("F_CoAdd1")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd2)
                    .HasColumnName("F_CoAdd2")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd3)
                    .HasColumnName("F_CoAdd3")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd4)
                    .HasColumnName("F_CoAdd4")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoEmail)
                    .HasColumnName("F_CoEmail")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoFax)
                    .HasColumnName("F_CoFax")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoLogo)
                    .HasColumnName("F_CoLogo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FCoName)
                    .HasColumnName("F_CoName")
                    .HasMaxLength(50);

                entity.Property(e => e.FCoRegNo)
                    .HasColumnName("F_CoRegNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoTel)
                    .HasColumnName("F_CoTel")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoWebsite)
                    .HasColumnName("F_CoWebsite")
                    .HasMaxLength(50);

                entity.Property(e => e.FEqTaxLost).HasColumnName("F_EqTaxLost");

                entity.Property(e => e.FImpFreightCost).HasColumnName("F_ImpFreightCost");

                entity.Property(e => e.FImpWgt)
                    .HasColumnName("F_ImpWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FLocalFreightCost).HasColumnName("F_LocalFreightCost");

                entity.Property(e => e.FLocalWgt)
                    .HasColumnName("F_LocalWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FOpenBal)
                    .HasColumnName("F_OpenBal")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FRmtaxLost).HasColumnName("F_RMTaxLost");

                entity.Property(e => e.FSumDutyExcise).HasColumnName("F_SumDutyExcise");

                entity.Property(e => e.FSumDutyImp).HasColumnName("F_SumDutyImp");

                entity.Property(e => e.FSumGst).HasColumnName("F_SumGST");

                entity.Property(e => e.FSumTaxLost).HasColumnName("F_SumTaxLost");

                entity.Property(e => e.FTotalRm)
                    .HasColumnName("F_TotalRM")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FUsedCost).HasColumnName("F_UsedCost");

                entity.Property(e => e.FWastedCost).HasColumnName("F_WastedCost");

                entity.Property(e => e.Gpbdate)
                    .HasColumnName("GPBDate")
                    .HasColumnType("date");

                entity.Property(e => e.LetterDate).HasColumnType("datetime");

                entity.Property(e => e.LicenseNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LocalSalesQuota).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.LrcptAdd1)
                    .HasColumnName("LRcptAdd1")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd2)
                    .HasColumnName("LRcptAdd2")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd3)
                    .HasColumnName("LRcptAdd3")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd4)
                    .HasColumnName("LRcptAdd4")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptBr)
                    .HasColumnName("LRcptBr")
                    .HasMaxLength(50);

                entity.Property(e => e.LrcptDept)
                    .HasColumnName("LRcptDept")
                    .HasMaxLength(50);

                entity.Property(e => e.PurchRm).HasColumnName("PurchRM");

                entity.Property(e => e.RefNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RmdutyExcise).HasColumnName("RMDutyExcise");

                entity.Property(e => e.RmdutyImp).HasColumnName("RMDutyImp");

                entity.Property(e => e.Rmgst).HasColumnName("RMGST");

                entity.Property(e => e.RptDate).HasColumnType("date");

                entity.Property(e => e.SalesFiz).HasColumnName("SalesFIZ");

                entity.Property(e => e.SalesGpb).HasColumnName("SalesGPB");

                entity.Property(e => e.SignedByIdno)
                    .HasColumnName("SignedByIDNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SignedByName).HasMaxLength(50);

                entity.Property(e => e.SignedByPos).HasMaxLength(50);

                entity.Property(e => e.SignedDate).HasColumnType("date");
            });

            modelBuilder.Entity<RptM1Mstk>(entity =>
            {
                entity.HasKey(e => e.MstkId);

                entity.ToTable("RptM1_MStk");

                entity.Property(e => e.MstkId).HasColumnName("MStkId");

                entity.Property(e => e.FCloseBal)
                    .HasColumnName("F_CloseBal")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FOpenBal)
                    .HasColumnName("F_OpenBal")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FRmcatName)
                    .HasColumnName("F_RMCatName")
                    .HasMaxLength(100);

                entity.Property(e => e.FRmdesc)
                    .HasColumnName("F_RMDesc")
                    .HasMaxLength(500);

                entity.Property(e => e.FTariffCode)
                    .HasColumnName("F_TariffCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FTotalRm)
                    .HasColumnName("F_TotalRM")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FUomcode)
                    .HasColumnName("F_UOMCode")
                    .HasMaxLength(10);

                entity.Property(e => e.Rmid).HasColumnName("RMId");
            });

            modelBuilder.Entity<RptM1MstkInv>(entity =>
            {
                entity.HasKey(e => e.MstkInvId);

                entity.ToTable("RptM1_MStkInv");

                entity.Property(e => e.MstkInvId).HasColumnName("MStkInvId");

                entity.Property(e => e.FImpFreightCost).HasColumnName("F_ImpFreightCost");

                entity.Property(e => e.FImpWgt)
                    .HasColumnName("F_ImpWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FLocFreightCost).HasColumnName("F_LocFreightCost");

                entity.Property(e => e.FLocWgt)
                    .HasColumnName("F_LocWgt")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.InvoiceNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MstkId).HasColumnName("MStkId");
            });

            modelBuilder.Entity<RptSk>(entity =>
            {
                entity.HasKey(e => e.RptId);

                entity.ToTable("RptSK");

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.FCoAdd1)
                    .HasColumnName("F_CoAdd1")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd2)
                    .HasColumnName("F_CoAdd2")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd3)
                    .HasColumnName("F_CoAdd3")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoAdd4)
                    .HasColumnName("F_CoAdd4")
                    .HasMaxLength(100);

                entity.Property(e => e.FCoEmail)
                    .HasColumnName("F_CoEmail")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoFax)
                    .HasColumnName("F_CoFax")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoGstno)
                    .HasColumnName("F_CoGSTNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoLogo)
                    .HasColumnName("F_CoLogo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FCoName)
                    .HasColumnName("F_CoName")
                    .HasMaxLength(50);

                entity.Property(e => e.FCoRegNo)
                    .HasColumnName("F_CoRegNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoSplno)
                    .HasColumnName("F_CoSPLNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoTel)
                    .HasColumnName("F_CoTel")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FCoWebsite)
                    .HasColumnName("F_CoWebsite")
                    .HasMaxLength(50);

                entity.Property(e => e.FGstcost).HasColumnName("F_GSTCost");

                entity.Property(e => e.FImpCost).HasColumnName("F_ImpCost");

                entity.Property(e => e.LetterDate).HasColumnType("datetime");

                entity.Property(e => e.LrcptAdd1)
                    .HasColumnName("LRcptAdd1")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd2)
                    .HasColumnName("LRcptAdd2")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd3)
                    .HasColumnName("LRcptAdd3")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptAdd4)
                    .HasColumnName("LRcptAdd4")
                    .HasMaxLength(100);

                entity.Property(e => e.LrcptBr)
                    .HasColumnName("LRcptBr")
                    .HasMaxLength(50);

                entity.Property(e => e.LrcptDept)
                    .HasColumnName("LRcptDept")
                    .HasMaxLength(50);

                entity.Property(e => e.RefNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RptDate).HasColumnType("datetime");

                entity.Property(e => e.SignedByEmpIdImp).HasColumnName("SignedByEmpId_Imp");

                entity.Property(e => e.SignedByIdno)
                    .HasColumnName("SignedByIDNo")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SignedByIdnoImp)
                    .HasColumnName("SignedByIDNo_Imp")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SignedByName).HasMaxLength(50);

                entity.Property(e => e.SignedByNameImp)
                    .HasColumnName("SignedByName_Imp")
                    .HasMaxLength(50);

                entity.Property(e => e.SignedByPos).HasMaxLength(50);

                entity.Property(e => e.SignedByPosImp)
                    .HasColumnName("SignedByPos_Imp")
                    .HasMaxLength(50);

                entity.Property(e => e.SignedDate).HasColumnType("date");
            });

            modelBuilder.Entity<RptSkMimp>(entity =>
            {
                entity.HasKey(e => e.TxnId);

                entity.ToTable("RptSK_MImp");

                entity.Property(e => e.FCustomNo)
                    .HasColumnName("F_CustomNo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FGstcost).HasColumnName("F_GSTCost");

                entity.Property(e => e.FImpCost).HasColumnName("F_ImpCost");

                entity.Property(e => e.FImpDate)
                    .HasColumnName("F_ImpDate")
                    .HasColumnType("date");

                entity.Property(e => e.FImpWgt)
                    .HasColumnName("F_ImpWgt")
                    .HasColumnType("decimal(10, 2)");
            });

            modelBuilder.Entity<RptStatus>(entity =>
            {
                entity.Property(e => e.RptStatusId).ValueGeneratedNever();

                entity.Property(e => e.RptStatusName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Stncustom>(entity =>
            {
                entity.ToTable("STNCustom");

                entity.Property(e => e.StncustomId).HasColumnName("STNCustomId");

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.StncustomName)
                    .HasColumnName("STNCustomName")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.Property(e => e.BankAccNo).HasMaxLength(100);

                entity.Property(e => e.BankAddress).HasMaxLength(100);

                entity.Property(e => e.BankName).HasMaxLength(100);

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.DeliveryTerms).HasMaxLength(100);

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.FaxNo).HasMaxLength(100);

                entity.Property(e => e.Forwarder).HasMaxLength(100);

                entity.Property(e => e.Gstno)
                    .HasColumnName("GSTNo")
                    .HasMaxLength(100);

                entity.Property(e => e.PaymentTerms).HasMaxLength(100);

                entity.Property(e => e.PhoneNo1).HasMaxLength(100);

                entity.Property(e => e.PhoneNo2).HasMaxLength(100);

                entity.Property(e => e.SupplierAd1).HasMaxLength(100);

                entity.Property(e => e.SupplierAd2).HasMaxLength(100);

                entity.Property(e => e.SupplierAd3).HasMaxLength(100);

                entity.Property(e => e.SupplierCode).HasMaxLength(100);

                entity.Property(e => e.SupplierName).HasMaxLength(100);

                entity.Property(e => e.Swift).HasMaxLength(100);
            });

            modelBuilder.Entity<Uom>(entity =>
            {
                entity.Property(e => e.UomId).ValueGeneratedNever();

                entity.Property(e => e.UomCode).HasMaxLength(10);

                entity.Property(e => e.UomName).HasMaxLength(50);
            });

            modelBuilder.Entity<UomType>(entity =>
            {
                entity.Property(e => e.UomTypeId).ValueGeneratedNever();

                entity.Property(e => e.UomTypeName).HasMaxLength(50);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.CreatedDt)
                    .HasColumnName("CreatedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.EditedDt)
                    .HasColumnName("EditedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.Password)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });
        }
    }
}
