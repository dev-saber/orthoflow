import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { updateAppointment } from "../../data/appointments/appointmentsThunk";
import ModalContainer from "./ModalContainer";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import SelectInputWithErrorMessage from "../molecules/SelectInputWithErrorMessage";

function EditAppointment({ isOpen, onClose, data, triggerEffect }) {
  const now = moment();
  const dispatch = useDispatch();
  const { start_time, end_time } = useSelector((state) => state.auth.user);

  const editInfo = useFormik({
    initialValues: {
      date: data.date,
      start_time: data.start_time,
      end_time: data.end_time,
      status: data.status,
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required("Required")
        .test("upcoming-date", "invalid date", function (value) {
          const selectedDate = moment(value).startOf("day");
          return selectedDate.isSameOrAfter(now.startOf("day"));
        }),
      start_time: Yup.string()
        .required("Required")
        .test("upcoming-time-start", "invalid time", function (value) {
          const selectedDate = moment(this.parent.date);
          const [hours, minutes] = value.split(":");
          selectedDate.set({ hour: hours, minute: minutes });
          return selectedDate.isAfter(now);
        })
        .test("start-time-boundary", "invalid time", function (value) {
          return value >= start_time;
        }),
      end_time: Yup.string()
        .required("Required")
        .test("upcoming-time-end", "invalid time", function (value) {
          const selectedDate = moment(this.parent.date);
          const [hours, minutes] = value.split(":");
          selectedDate.set({ hour: hours, minute: minutes });
          return selectedDate.isAfter(now);
        })
        .test("is-greater", "Invalid time", function (value) {
          const { start_time } = this.parent;
          return start_time && value ? start_time < value : true;
        })
        .test("end-time-boundary", "invalid time", function (value) {
          return value <= end_time;
        }),
      status: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      await dispatch(updateAppointment({ id: data.id, ...values }));
      await triggerEffect();
      onClose();
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form
        className="flex flex-col items-center gap-8 w-4/5 mx-auto"
        onSubmit={editInfo.handleSubmit}
      >
        <Title text="Edit Appointment" />

        <div className="flex flex-col items-start gap-8">
          <InputWithErrorMessage
            label="Date"
            name="date"
            type="date"
            value={editInfo.values.date}
            onChange={editInfo.handleChange}
            onBlur={editInfo.handleBlur}
            errorCondition={editInfo.errors.date}
            message={editInfo.errors.date}
          />

          <InputWithErrorMessage
            label="Start Time"
            name="start_time"
            type="time"
            value={editInfo.values.start_time}
            onChange={editInfo.handleChange}
            onBlur={editInfo.handleBlur}
            errorCondition={editInfo.errors.start_time}
            message={editInfo.errors.start_time}
          />

          <InputWithErrorMessage
            label="End Time"
            name="end_time"
            type="time"
            value={editInfo.values.end_time}
            onChange={editInfo.handleChange}
            onBlur={editInfo.handleBlur}
            errorCondition={editInfo.errors.end_time}
            message={editInfo.errors.end_time}
          />

          <SelectInputWithErrorMessage
            label="status"
            name="status"
            value={editInfo.values.status}
            onChange={editInfo.handleChange}
            onBlur={editInfo.handleBlur}
            options={[
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "canceled", label: "Canceled" },
            ]}
            errorCondition={editInfo.errors.status}
            message={editInfo.errors.status}
          />
        </div>

        <Button label="Submit" />
      </form>
    </ModalContainer>
  );
}

export default EditAppointment;
