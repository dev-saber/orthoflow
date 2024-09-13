import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateStock } from "../../data/stock/stockThunk";
import ModalContainer from "./ModalContainer";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";

function EditStockModal({ isOpen, onClose, data, triggerEffect }) {
  const dispatch = useDispatch();
  const editInfo = useFormik({
    initialValues: {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      reorder_level: data.reorder_level,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      price: Yup.number()
        .required("Required")
        .positive("Price must be positive"),
      quantity: Yup.number().required("Required").min(0, "invalid quantity"),
      reorder_level: Yup.number()
        .required("Required")
        .min(0, "invalid reorder level"),
    }),
    onSubmit: async (values) => {
      await dispatch(updateStock({ id: data.id, ...values }));
      await triggerEffect();
      onClose();
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={editInfo.handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <Title text="Edit Stock" />
        <InputWithErrorMessage
          label="item name"
          type="text"
          name="name"
          value={editInfo.values.name}
        />
        <InputWithErrorMessage
          label="Price"
          name="price"
          type="number"
          step="0.01"
          value={editInfo.values.price}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.touched.price && editInfo.errors.price}
          message={editInfo.errors.price}
        />
        <InputWithErrorMessage
          label="Quantity"
          name="quantity"
          type="number"
          value={editInfo.values.quantity}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.touched.quantity && editInfo.errors.quantity}
          message={editInfo.errors.quantity}
        />
        <InputWithErrorMessage
          label="Reorder Level"
          name="reorder_level"
          type="number"
          value={editInfo.values.reorder_level}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={
            editInfo.touched.reorder_level && editInfo.errors.reorder_level
          }
          message={editInfo.errors.reorder_level}
        />
        <Button label="Update" />
      </form>
    </ModalContainer>
  );
}

export default EditStockModal;
