import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


// icon x


import SafeScreen from "../../components/SafeScreen";
import { styles } from "../../assets/styles/currency-selection.styles";
import { COLORS } from "../../constants/colors";

// Sample currency data - in a real app, this would come from a config or API
const CURRENCIES = [
  { code: "THB", name: "Thai Baht" },
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NZD", name: "New Zealand Dollar" },
];

const CurrencySelectionScreen = () => {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState("THB");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCurrencies = useMemo(() => {
    return CURRENCIES.filter(
      (currency) =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.currencyRow}
      onPress={() => setSelectedCurrency(item.code)}
    >
      <View style={styles.currencyInfo}>
        <Text style={styles.currencyCode}>{item.code}</Text>
        <Text style={styles.currencyName}>{item.name}</Text>
      </View>
      {selectedCurrency === item.code && (
        <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Primary Currency</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a currency..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredCurrencies}
        renderItem={renderItem}
        keyExtractor={(item) => item.code}
        style={styles.listContainer}
      />
    </SafeScreen>
  );
};

export default CurrencySelectionScreen;
