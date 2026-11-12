import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

// Key used to identify the saved tasks in local storage
const STORAGE_KEY = "@lavender_days_tasks";

// Get the Monday date of the selected week
const getMonday = (date) => {
  const day = new Date(date);

  // Calculate how many days to subtract to reach Monday
  const difference = (day.getDay() + 6) % 7;

  day.setDate(day.getDate() - difference);
  day.setHours(0, 0, 0, 0);

  return day;
};

// Convert date into YYYY-MM-DD format
const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Format date for displaying on the screen
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function App() {
  // Get today's date
  const today = new Date();

  // Store all tasks
  const [tasks, setTasks] = useState([]);

  // Store the task title entered by the user
  const [title, setTitle] = useState("");

  // Store the ID of the task being edited
  const [editId, setEditId] = useState(null);

  // Store the currently selected date
  const [selectedDate, setSelectedDate] = useState(getDateKey(today));

  // Store the first day (Monday) of the displayed week
  const [weekStart, setWeekStart] = useState(getMonday(today));

  // Check if saved tasks have finished loading
  const [isLoaded, setIsLoaded] = useState(false);

  // READ: Load saved tasks when the app starts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        // Get saved tasks from AsyncStorage
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

        // Convert the saved string back into an array
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        // Display an error if loading fails
        console.log("Loading error:", error);
        Alert.alert("Error", "Unable to load tasks.");
      } finally {
        // Allow the application to display after loading
        setIsLoaded(true);
      }
    };

    // Execute the function when the app first opens
    loadTasks();
  }, []);

  // SAVE: Store the updated task list on the device
  const saveTasks = async (updatedTasks) => {
    try {
      // Convert the array into a string before saving
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));

      // Update the displayed task list
      setTasks(updatedTasks);
    } catch (error) {
      // Display an error if saving fails
      console.log("Saving error:", error);
      Alert.alert("Error", "Unable to save tasks.");
    }
  };

  // Generate the seven dates from Monday to Sunday
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    return date;
  });

  // Display only the tasks belonging to the selected day
  const dailyTasks = tasks.filter((task) => task.date === selectedDate);

  // Get all tasks belonging to the displayed week
  const weeklyTasks = tasks.filter((task) =>
    weekDates.some((date) => getDateKey(date) === task.date),
  );

  // Count the completed tasks for the week
  const completedTasks = weeklyTasks.filter((task) => task.completed).length;

  // Calculate the weekly completion percentage
  const progress =
    weeklyTasks.length === 0
      ? 0
      : Math.round((completedTasks / weeklyTasks.length) * 100);

  // CREATE: Add a new task to the selected date
  const addTask = async () => {
    // Check if the input is empty
    if (!title.trim()) {
      Alert.alert("Empty Task", "Please enter a task.");
      return;
    }

    // Create a new task object
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      date: selectedDate,
      completed: false,
    };

    // Add the new task and save the updated list
    await saveTasks([...tasks, newTask]);

    // Clear the input field
    setTitle("");
  };

  // UPDATE: Edit the title of an existing task
  const updateTask = async () => {
    // Check if the input is empty
    if (!title.trim()) {
      Alert.alert("Empty Task", "Please enter a task.");
      return;
    }

    // Find the selected task and update its title
    const updatedTasks = tasks.map((task) =>
      task.id === editId ? { ...task, title: title.trim() } : task,
    );

    // Save the modified task list
    await saveTasks(updatedTasks);

    // Clear the input and editing ID
    setTitle("");
    setEditId(null);
  };

  // Load the selected task into the input field
  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task.id);
  };

  // DELETE: Remove a task from the list
  const deleteTask = (id) => {
    // Ask the user to confirm before deleting
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          // Keep all tasks except the selected task
          const updatedTasks = tasks.filter((task) => task.id !== id);

          // Save the updated list to AsyncStorage
          await saveTasks(updatedTasks);

          // Clear the editing fields if the deleted task was selected
          if (editId === id) {
            setTitle("");
            setEditId(null);
          }
        },
      },
    ]);
  };

  // UPDATE: Mark a task as completed or incomplete
  const toggleTask = async (id) => {
    // Change the completion status of the selected task
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    // Save the updated completion status
    await saveTasks(updatedTasks);
  };

  // Navigate to the previous or next week
  const changeWeek = (amount) => {
    const newStart = new Date(weekStart);

    // Move seven days forward or backward
    newStart.setDate(newStart.getDate() + amount * 7);

    // Update the displayed week and selected date
    setWeekStart(newStart);
    setSelectedDate(getDateKey(newStart));

    // Clear the input and editing mode
    setTitle("");
    setEditId(null);
  };

  // Cancel the current editing operation
  const cancelEdit = () => {
    setTitle("");
    setEditId(null);
  };

  // Display a loading screen while retrieving saved tasks
  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <Text style={styles.heading}>Lavender Days ♡</Text>
        <Text>Loading your tasks...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* HEADER: App title and welcome message */}
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Hello, Sunshine! ♡</Text>

          <Text style={styles.subtitle}>Let's make this week productive.</Text>
        </View>

        <Text style={styles.bow}>🎀</Text>
      </View>

      {/* WEEKLY PLANNER: Display Monday to Sunday */}
      <View style={styles.weekCard}>
        <View style={styles.weekHeader}>
          <Text style={styles.sectionTitle}>My Weekly Tasks</Text>

          {/* Buttons for changing weeks */}
          <View style={styles.weekButtons}>
            <TouchableOpacity onPress={() => changeWeek(-1)}>
              <Text style={styles.arrow}>‹</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeWeek(1)}>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Display the starting and ending dates */}
        <Text style={styles.weekLabel}>
          {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
        </Text>

        {/* Display the seven days of the week */}
        <View style={styles.daysContainer}>
          {weekDates.map((date) => {
            const key = getDateKey(date);
            const selected = key === selectedDate;

            return (
              <TouchableOpacity
                key={key}
                style={[styles.dayButton, selected && styles.selectedDay]}
                onPress={() => {
                  // Select a day and clear the input
                  setSelectedDate(key);
                  setTitle("");
                  setEditId(null);
                }}
              >
                <Text style={[styles.dayName, selected && styles.selectedText]}>
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </Text>

                <Text
                  style={[styles.dayNumber, selected && styles.selectedText]}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* PROGRESS TRACKER: Show weekly task completion */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>Weekly Progress ✨</Text>

          <Text style={styles.progressPercent}>{progress}%</Text>
        </View>

        {/* Progress bar based on completed tasks */}
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.progressText}>
          {completedTasks} of {weeklyTasks.length} tasks completed this week ♡
        </Text>
      </View>

      {/* ADD TASK: Input field and add/update button */}
      <View style={styles.taskInputCard}>
        <Text style={styles.sectionTitle}>
          {editId ? "Edit Your Task ♡" : "Add a New Task ♡"}
        </Text>

        {/* Display the currently selected date */}
        <Text style={styles.selectedDateText}>
          {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>

        {/* User enters a task here */}
        <TextInput
          style={styles.input}
          placeholder="What do you need to do?"
          placeholderTextColor="#B7A6C5"
          value={title}
          onChangeText={setTitle}
        />

        {/* Show the correct button depending on editing mode */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={editId ? updateTask : addTask}
        >
          <Text style={styles.addButtonText}>
            {editId ? "Save Changes ♡" : "+ Add Task"}
          </Text>
        </TouchableOpacity>

        {/* Show cancel button only when editing */}
        {editId && (
          <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* DAILY CHECKLIST: Display tasks for the selected day */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Today's Checklist ♡</Text>

        <Text style={styles.taskCount}>{dailyTasks.length} tasks</Text>
      </View>

      {/* Show an empty message if there are no tasks */}
      {dailyTasks.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🌷</Text>

          <Text style={styles.emptyText}>No tasks for this day!</Text>

          <Text style={styles.emptySubtext}>
            Enjoy your free time or add a new task.
          </Text>
        </View>
      ) : (
        // Display each saved task
        dailyTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            {/* Tap the checkbox area to complete a task */}
            <TouchableOpacity
              style={styles.taskContent}
              onPress={() => toggleTask(task.id)}
            >
              <View
                style={[styles.checkbox, task.completed && styles.checkedBox]}
              >
                {task.completed && <Text style={styles.checkMark}>✓</Text>}
              </View>

              {/* Strike through completed tasks */}
              <Text
                style={[
                  styles.taskTitle,
                  task.completed && styles.completedTask,
                ]}
              >
                {task.title}
              </Text>
            </TouchableOpacity>

            {/* Edit and delete buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => editTask(task)}
                style={styles.editButton}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteTask(task.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* FOOTER: App closing message */}
      <Text style={styles.footer}>
        Made with love and a little lavender magic ♡
      </Text>
    </ScrollView>
  );
}
