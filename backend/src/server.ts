import app from "./app";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Hospital Booking System Server running on http://localhost:${PORT}`);
});
