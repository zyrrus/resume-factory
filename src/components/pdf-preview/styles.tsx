import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 11,
    padding: "0.75in",
    // paddingVertical: "0.75in",
    // paddingHorizontal: "1in",
    lineHeight: 1.3,
  },

  bold: { fontWeight: "bold" },
  row: { display: "flex", flexDirection: "row" },

  h1: { fontSize: 18, fontWeight: "bold" },
  h2: {
    textTransform: "uppercase",
    borderBottom: 1,
    paddingBottom: 4,
    marginTop: 8,
    marginBottom: 4, // 4 here and 4 from items underneath
  },
  link: { color: "#1155CC" },

  experienceHeading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  listContainer: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
});
