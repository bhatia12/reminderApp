import React from "react";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class RemindersList extends React.Component {
  componentWillMount() {
    clearInterval(this.interval);
  }
  componentDidMount() {
    // clearInterval(this.toast);
    console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
    this.interval = setInterval(
      this.forceUpdate.bind(this),
      parseInt(this.props.updateInterval, 10) || 100
    );
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.props.reminders.map((remind) => {
        if (
          moment(remind.dueDate).format("YYYY-MM-DD HH:mm:ss") ===
          moment().format("YYYY-MM-DD HH:mm:ss")
        ) {
          toast.success(remind.text);
          console.log(remind.text);
        }
      });
    }, 1000);
  }

  render() {
    const { reminders, deleteReminder } = this.props;
    return (
      <ul className="list-group">
        {/* <ToastContainer /> */}
        {reminders.map((reminder) => (
          <li key={reminder.id} className="list-group-item clearfix">
            <span className="list-item">{reminder.text}</span>
            {/* <span className="list-item">{reminder.dueDate.format()}</span> */}

            <button
              className="list-item btn btn-danger btn-xs pull-right"
              onClick={() => deleteReminder(reminder.id)}
            >
              &#x2715;
            </button>
            <div className="list-item time">
              {moment(new Date(reminder.dueDate))
                // .locale('ru')
                .fromNow()}
            </div>
            <div className="list-item time">
              {moment(new Date(reminder.dueDate))
                // .locale('ru')
                .format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default RemindersList;
