import app from "./app";
const PORT = process.env.PORT || 5000;

(app.listen as any)(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

