// react custom hook file

import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

// const API_URL = "https://wallet-api-cxqp.onrender.com/api";
// const API_URL = "http://localhost:5001/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [balanceOverTime, setBalanceOverTime] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // console.log("Balance over time:", balanceOverTime);
  // console.log("Summary:", summary);
  // console.log("Transactions:", transactions);

  // useCallback is used for performance reasons, it will memoize the function
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      // console.log("Transactions data:", data);
      setTransactions(data); // Use full data, not data[0]
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  }, [userId]);

  const fetchBalanceOverTime = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/balance-over-time/${userId}`);
      const data = await response.json();
      // console.log("Balance over time data:", data);
      setBalanceOverTime(data); // Use full data, not data[0]
    } catch (error) {
      console.error("Error fetching balance over time:", error);
      setBalanceOverTime([]);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      // console.log("Summary data:", data);
      setSummary(data); // Use full data, not data[0]
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary({ balance: 0, income: 0, expenses: 0 });
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary(), fetchBalanceOverTime()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, fetchBalanceOverTime, userId]);

  // Add a refresh function that can be called to refresh data immediately
  const refreshData = useCallback(async () => {
    if (!userId) return;
    
    console.log("Refreshing transaction data...");
    await loadData();
  }, [loadData, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete transaction");

      // Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };

  return { transactions, summary, balanceOverTime, isLoading, loadData, refreshData, deleteTransaction };
};
