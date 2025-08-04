import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },

  // Header
  headerContainer: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 8,
  },

  // Time Range Selector
  timeRangeContainer: {
    marginBottom: 30,
  },
  timeRangeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
  },
  timeRangeScroll: {
    flexDirection: 'row',
    gap: 10,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeRangeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  timeRangeButtonInactive: {
    backgroundColor: COLORS.card,
  },
  timeRangeButtonText: {
    fontWeight: '600',
  },
  timeRangeButtonTextActive: {
    color: COLORS.white,
  },
  timeRangeButtonTextInactive: {
    color: COLORS.primary,
  },

  // Summary Cards
  summaryContainer: {
    marginBottom: 30,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryCardFull: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryCardLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textLight,
  },
  summaryCardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryCardAmountLarge: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryCardAmountIncome: {
    color: COLORS.income,
  },
  summaryCardAmountExpense: {
    color: COLORS.expense,
  },
  summaryCardAmountNet: {
    color: COLORS.income, // Will be overridden based on netFlow
  },

  // Chart Type Selector
  chartTypeContainer: {
    marginBottom: 30,
  },
  chartTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
  },
  chartTypeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chartTypeButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  chartTypeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  chartTypeButtonInactive: {
    backgroundColor: COLORS.card,
  },
  chartTypeButtonText: {
    fontWeight: '600',
    fontSize: 12,
  },
  chartTypeButtonTextActive: {
    color: COLORS.white,
  },
  chartTypeButtonTextInactive: {
    color: COLORS.primary,
  },

  // Charts
  chartsContainer: {
    marginBottom: 30,
  },
  chartCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
  },
  chartStyle: {
    borderRadius: 16,
  },

  // Debug Info
  debugContainer: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  debugTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  debugText: {
    fontSize: 14,
    color: '#374151',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    padding: 20,
  },
  emptyHeader: {
    marginBottom: 30,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.text,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: COLORS.text,
  },
  emptyDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyButtonText: {
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: 'bold',
  },

  // Login Required
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.text,
  },
});
