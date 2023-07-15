import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/fontawesome/all.min.css";
import "./styles/master.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { remindNotNotifiedTasks } from "./Components/Notifications/AddNotification";

!localStorage.getItem("tasks") && localStorage.setItem("tasks", "[]");
!localStorage.getItem("notes") && localStorage.setItem("notes", "[]");
!localStorage.getItem("notifications") && localStorage.setItem("notifications", "[]");

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

remindNotNotifiedTasks();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
