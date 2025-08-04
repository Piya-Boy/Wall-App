import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Animated } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { useUser } from "@clerk/clerk-expo";
import { useTransactions } from "../../hooks/useTransactions";
import SafeScreen from "../../components/SafeScreen";
import PageLoader from "../../components/PageLoader";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import styles from "../../assets/styles/reports.styles";

const screenWidth = Dimensions.get("window").width;

const Reports = () => {
  const { user } = useUser();
  const { transactions, summary, balanceOverTime, isLoading, loadData, refreshData } = useTransactions(user?.id);
  const [selectedRange, setSelectedRange] = useState("This Month");
  const [selectedChart, setSelectedChart] = useState("balance");
  const router = useRouter();
  const fadeAnim = new Animated.Value(1); // Start with 1 to show immediately

  useEffect(() => {
    if (user?.id) {
      console.log("Reports - User ID:", user.id);
      loadData();
    }
  }, [user?.id]);

  // Refresh data every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      console.log("Reports screen focused - refreshing data");
      refreshData();
    }, [refreshData])
  );

  console.log("Reports - Is Loading:", isLoading);
  console.log("Current loading state:", isLoading);
  console.log("User exists:", !!user);
  console.log("Transactions exists:", !!transactions);
  console.log("Transactions length:", transactions?.length);

  const timeRanges = [
    { key: "This Month", label: "This Month", icon: "calendar" },
    { key: "This Year", label: "This Year", icon: "calendar-outline" },
    { key: "All Time", label: "All Time", icon: "time" },
  ];

  const chartTypes = [
    { key: "balance", label: "Balance", icon: "trending-up" },
    { key: "income", label: "Income", icon: "arrow-up" },
    { key: "expenses", label: "Expenses", icon: "arrow-down" },
  ];

  // Show loading if still loading
  if (isLoading) {
    console.log("Showing PageLoader");
    return <PageLoader />;
  }

  // Show message if no user
  if (!user) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Please log in to view reports</Text>
      </View>
    );
  }

  // Show empty state if no transactions
  if (!transactions || transactions.length === 0) {
    console.log("Showing empty state");
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyHeader}>
          <Text style={styles.emptyTitle}>Financial Reports</Text>
          <Text style={styles.emptySubtitle}>Track your money, grow your wealth</Text>
        </View>
        
        <View style={styles.emptyContent}>
          <Ionicons name="analytics-outline" size={100} color="#6366F1" style={styles.emptyIcon} />
          <Text style={styles.emptyMessage}>No Reports Available</Text>
          <Text style={styles.emptyDescription}>
            Start adding transactions to see beautiful charts and insights about your finances
          </Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={() => router.push("/create")}
          >
            <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            <Text style={styles.emptyButtonText}>Add Your First Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const processData = () => {
    const now = new Date();
    let filteredTransactions = transactions || [];

    console.log("Processing data for range:", selectedRange);
    console.log("Original transactions:", filteredTransactions.length);

    if (selectedRange === "This Month") {
      filteredTransactions = (transactions || []).filter(
        (t) => {
          try {
            return new Date(t.created_at).getMonth() === now.getMonth() &&
                   new Date(t.created_at).getFullYear() === now.getFullYear();
          } catch (error) {
            console.log("Error filtering by month:", error);
            return false;
          }
        }
      );
    } else if (selectedRange === "This Year") {
      filteredTransactions = (transactions || []).filter(
        (t) => {
          try {
            return new Date(t.created_at).getFullYear() === now.getFullYear();
          } catch (error) {
            console.log("Error filtering by year:", error);
            return false;
          }
        }
      );
    }

    console.log("Filtered transactions:", filteredTransactions.length);

    // Calculate summary from actual transactions
    let income = 0;
    let expenses = 0;

    filteredTransactions.forEach(t => {
      const amount = parseFloat(t.amount) || 0;
      if (amount > 0) {
        income += amount;
      } else {
        expenses += Math.abs(amount);
      }
    });

    const netFlow = income - expenses;

    console.log("Calculated income:", income);
    console.log("Calculated expenses:", expenses);
    console.log("Net flow:", netFlow);

    // Process balance over time data
    const safeBalanceOverTime = (balanceOverTime && Array.isArray(balanceOverTime)) ? balanceOverTime : [];
    console.log("Balance over time data:", safeBalanceOverTime);

    const balanceData = {
      labels: safeBalanceOverTime.length > 0 
        ? safeBalanceOverTime.map(d => {
            if (!d || !d.date) return "";
            try {
              return new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            } catch (error) {
              return "";
            }
          }).filter(label => label !== "")
        : ["Aug 1", "Aug 2", "Aug 3"],
      datasets: [
        {
          data: safeBalanceOverTime.length > 0 
            ? safeBalanceOverTime.map(d => {
                if (!d || typeof d.balance === 'undefined') return 0;
                try {
                  return parseFloat(d.balance) || 0;
                } catch (error) {
                  return 0;
                }
              })
            : [100, 150, 200],
          color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
          strokeWidth: 3
        },
      ],
      legend: ["Balance"]
    };

    const barData = {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [income, expenses],
        },
      ],
    };

    // Process expenses by category
    const expensesByCategory = filteredTransactions
      .filter((t) => parseFloat(t.amount) < 0)
      .reduce((acc, t) => {
        const category = t.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += Math.abs(parseFloat(t.amount) || 0);
        return acc;
      }, {});

    console.log("Expenses by category:", expensesByCategory);

    const pieData = Object.keys(expensesByCategory).length > 0 
      ? Object.keys(expensesByCategory).map((key, index) => ({
          name: key,
          amount: expensesByCategory[key],
          color: `hsl(${200 + index * 30}, 70%, 60%)`,
          legendFontColor: "#374151",
          legendFontSize: 12,
        }))
      : [
          {
            name: "No Expenses",
            amount: 1,
            color: "#E5E7EB",
            legendFontColor: "#374151",
            legendFontSize: 12,
          }
        ];

    return { income, expenses, netFlow, balanceData, barData, pieData };
  };

  const { income, expenses, netFlow, balanceData, barData, pieData } = processData();

  // Calculate expenses by category for Quick Insights
  const expensesByCategory = transactions
    .filter((t) => parseFloat(t.amount) < 0)
    .reduce((acc, t) => {
      const category = t.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(parseFloat(t.amount) || 0);
      return acc;
    }, {});

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    decimalPlaces: 2,
    style: {
      borderRadius: 16,
    },
  };

  console.log("Rendering main component");

  return (
    <SafeScreen>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Financial Reports</Text>
          <Text style={styles.headerSubtitle}>Track your money, grow your wealth</Text>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          <Text style={styles.timeRangeTitle}>Time Period</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.timeRangeScroll}>
              {timeRanges.map((range) => (
                <TouchableOpacity
                  key={range.key}
                  style={[
                    styles.timeRangeButton,
                    selectedRange === range.key ? styles.timeRangeButtonActive : styles.timeRangeButtonInactive
                  ]}
                  onPress={() => setSelectedRange(range.key)}
                >
                  <Ionicons 
                    name={range.icon} 
                    size={16} 
                    color={selectedRange === range.key ? '#ffffff' : '#6366F1'} 
                  />
                  <Text style={[
                    styles.timeRangeButtonText,
                    selectedRange === range.key ? styles.timeRangeButtonTextActive : styles.timeRangeButtonTextInactive
                  ]}>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryCardHeader}>
                <Ionicons name="arrow-up-circle" size={24} color="#10B981" />
                <Text style={styles.summaryCardLabel}>Income</Text>
              </View>
              <Text style={[styles.summaryCardAmount, styles.summaryCardAmountIncome]}>+${income.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryCard}>
              <View style={styles.summaryCardHeader}>
                <Ionicons name="arrow-down-circle" size={24} color="#EF4444" />
                <Text style={styles.summaryCardLabel}>Expenses</Text>
              </View>
              <Text style={[styles.summaryCardAmount, styles.summaryCardAmountExpense]}>-${expenses.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.summaryCardFull}>
            <View style={styles.summaryCardHeader}>
              <Ionicons 
                name={netFlow >= 0 ? "trending-up" : "trending-down"} 
                size={24} 
                color={netFlow >= 0 ? "#10B981" : "#EF4444"} 
              />
              <Text style={styles.summaryCardLabel}>Net Flow</Text>
            </View>
            <Text style={[
              styles.summaryCardAmountLarge,
              { color: netFlow >= 0 ? "#10B981" : "#EF4444" }
            ]}>
              ${netFlow.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Chart Type Selector */}
        <View style={styles.chartTypeContainer}>
          <Text style={styles.chartTypeTitle}>Chart Type</Text>
          <View style={styles.chartTypeRow}>
            {chartTypes.map((chart) => (
              <TouchableOpacity
                key={chart.key}
                style={[
                  styles.chartTypeButton,
                  selectedChart === chart.key ? styles.chartTypeButtonActive : styles.chartTypeButtonInactive
                ]}
                onPress={() => setSelectedChart(chart.key)}
              >
                <Ionicons 
                  name={chart.icon} 
                  size={18} 
                  color={selectedChart === chart.key ? '#ffffff' : '#6366F1'} 
                />
                <Text style={[
                  styles.chartTypeButtonText,
                  selectedChart === chart.key ? styles.chartTypeButtonTextActive : styles.chartTypeButtonTextInactive
                ]}>
                  {chart.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Charts */}
        <View style={styles.chartsContainer}>
          {selectedChart === "balance" && (
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Balance Over Time</Text>
              <LineChart
                data={balanceData}
                width={screenWidth - 80}
                height={250}
                chartConfig={chartConfig}
                bezier
                style={styles.chartStyle}
              />
            </View>
          )}

          {selectedChart === "income" && (
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Income vs Expenses</Text>
              <BarChart
                data={barData}
                width={screenWidth - 80}
                height={250}
                chartConfig={chartConfig}
                yAxisLabel="$"
                fromZero
                style={styles.chartStyle}
              />
            </View>
          )}

          {selectedChart === "expenses" && (
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Expenses by Category</Text>
              <PieChart
                data={pieData}
                width={screenWidth - 80}
                height={250}
                chartConfig={chartConfig}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                style={styles.chartStyle}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default Reports;