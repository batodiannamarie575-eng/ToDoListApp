import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Main screen background and spacing
  container: {
    flex: 1,
    backgroundColor: "#F8F3FC",
  },

  // Content spacing inside the scroll view
  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  // Loading screen while retrieving saved tasks
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F3FC",
  },

  // HEADER STYLES
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  // Main app heading
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#7952A3",
  },

  // Welcome message under the heading
  subtitle: {
    color: "#A28AB8",
    fontSize: 13,
    marginTop: 5,
  },

  // Decorative bow
  bow: {
    fontSize: 35,
  },

  // General section headings
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#7952A3",
  },

  // WEEKLY PLANNER STYLES
  weekCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 18,
  },

  // Planner heading and navigation buttons
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Previous and next week buttons
  weekButtons: {
    flexDirection: "row",
    gap: 18,
  },

  // Arrow button appearance
  arrow: {
    fontSize: 28,
    color: "#9875B9",
    fontWeight: "bold",
  },

  // Displays the week's date range
  weekLabel: {
    fontSize: 12,
    color: "#A28AB8",
    marginTop: 5,
    marginBottom: 15,
  },

  // Arranges Monday to Sunday horizontally
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Individual day buttons
  dayButton: {
    backgroundColor: "#F5EFFA",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    width: "13%",
  },

  // Background color of the selected day
  selectedDay: {
    backgroundColor: "#C8A2E8",
  },

  // Day name text
  dayName: {
    fontSize: 10,
    color: "#9276A9",
    fontWeight: "600",
  },

  // Day number text
  dayNumber: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7952A3",
    marginTop: 5,
  },

  // White text for the selected day
  selectedText: {
    color: "#FFFFFF",
  },

  // WEEKLY PROGRESS STYLES
  progressCard: {
    backgroundColor: "#EDE1F6",
    padding: 17,
    borderRadius: 18,
    marginBottom: 22,
  },

  // Progress title and percentage
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  // Percentage text
  progressPercent: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7952A3",
  },

  // Empty progress bar background
  progressBackground: {
    height: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
  },

  // Filled portion of the progress bar
  progressFill: {
    height: 10,
    backgroundColor: "#B69AD9",
    borderRadius: 10,
  },

  // Completed task information
  progressText: {
    fontSize: 12,
    color: "#9276A9",
    marginTop: 10,
  },

  // ADD TASK STYLES
  taskInputCard: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 18,
    marginBottom: 25,
  },

  // Currently selected date
  selectedDateText: {
    color: "#A28AB8",
    fontSize: 12,
    marginTop: 7,
    marginBottom: 12,
  },

  // Task input field
  input: {
    backgroundColor: "#FAF7FC",
    borderWidth: 1,
    borderColor: "#E6D6F5",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#7952A3",
    marginBottom: 12,
  },

  // Add and update button
  addButton: {
    backgroundColor: "#B69AD9",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  // Button text
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Cancel editing button
  cancelButton: {
    padding: 10,
    alignItems: "center",
  },

  // Cancel button text
  cancelText: {
    color: "#9276A9",
  },

  // DAILY CHECKLIST STYLES
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  // Number of tasks for the selected day
  taskCount: {
    color: "#A28AB8",
    fontSize: 12,
  },

  // Individual task card
  taskCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#C8A2E8",
  },

  // Task checkbox and title arrangement
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },

  // Empty checkbox appearance
  checkbox: {
    width: 21,
    height: 21,
    borderWidth: 1.5,
    borderColor: "#B69AD9",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  // Checkbox appearance when completed
  checkedBox: {
    backgroundColor: "#B69AD9",
  },

  // Checkmark inside the checkbox
  checkMark: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // Task title appearance
  taskTitle: {
    color: "#705C80",
    fontSize: 13,
    flexShrink: 1,
  },

  // Style applied to completed tasks
  completedTask: {
    textDecorationLine: "line-through",
    color: "#B6A9C1",
  },

  // Edit and delete button arrangement
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 8,
  },

  // Edit button appearance
  editButton: {
    backgroundColor: "#F1E8F8",
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 8,
  },

  // Edit button text
  editText: {
    color: "#7952A3",
    fontSize: 11,
    fontWeight: "bold",
  },

  // Delete button appearance
  deleteButton: {
    backgroundColor: "#FBEAF2",
    width: 29,
    height: 29,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  // Delete button symbol
  deleteText: {
    color: "#CB83A7",
    fontSize: 21,
    fontWeight: "bold",
  },

  // EMPTY TASK LIST STYLES
  emptyCard: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
  },

  // Decorative flower
  emptyIcon: {
    fontSize: 35,
    marginBottom: 10,
  },

  // Empty list message
  emptyText: {
    color: "#7952A3",
    fontWeight: "bold",
    fontSize: 15,
  },

  // Additional empty list message
  emptySubtext: {
    color: "#A28AB8",
    fontSize: 12,
    marginTop: 7,
    textAlign: "center",
  },

  // FOOTER STYLES
  footer: {
    textAlign: "center",
    color: "#B69AD9",
    fontSize: 11,
    marginTop: 30,
  },
});
