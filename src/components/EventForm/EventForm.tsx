import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import axios from "axios";
import styles from "./EventForm.module.scss";
import Toast from "../Toast/Toast";
import { formatDateForInput } from "../../utils/dataFormatter";
import { showToast } from "../../utils/showToast";
import { emailRegex } from "../../utils/emailRegex";
import Button from "../Button/Button";
import { apiUrl } from "../../utils/apiUrl";

interface FormFields {
  name: string;
  surname: string;
  email: string;
  date: Date | string;
}

interface EventFormInterface {
  setForceFetchAfterPost: Dispatch<SetStateAction<boolean>>;
  toastInfo: { message: string; color: string };
  setToastInfo: Dispatch<SetStateAction<{ message: string; color: string }>>;
}

export default function EventForm({
  setForceFetchAfterPost,
  toastInfo,
  setToastInfo,
}: EventFormInterface) {
  const [formFields, setFormFields] = useState<FormFields>({
    name: "",
    surname: "",
    email: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { message, color } = toastInfo;
  const fieldsArray = Object.entries(formFields);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: name === "date" ? formatDateForInput(value) : value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const emptyFields = fieldsArray
      .filter(([_key, value]) => !value)
      .map(([key]) => key);
    if (emptyFields.length > 0) {
      const emptyFieldsMessage = `Please fill in the following fields: ${emptyFields.join(
        ", "
      )}.`;
      showToast(emptyFieldsMessage, "red", setToastInfo);
      return;
    }
    if (!emailRegex.test(formFields.email)) {
      showToast("Please provide valid email", "red", setToastInfo);
      return;
    }
    try {
      setIsSubmitting(true);
      await axios.post(`${apiUrl}/api/v1/event`, {
        ...formFields,
      });
      showToast("Event successfully created!", "green", setToastInfo);
      setForceFetchAfterPost(true);
    } catch (error) {
      showToast(
        "Error occurred when data submitting, please try again later.",
        "red",
        setToastInfo
      );
    } finally {
      setIsSubmitting(false);
    }
    setFormFields({
      name: "",
      surname: "",
      email: "",
      date: "",
    });
  };

  return (
    <div className={styles.container}>
      {message && <Toast message={message} color={color} />}
      <form className={styles.form} onSubmit={onSubmit}>
        {fieldsArray.map((el, index) => {
          const [key, value] = el;
          return (
            <div className={styles.formItem} key={index}>
              <label htmlFor={key}>
                {key[0].toUpperCase() + key.slice(1)}:{" "}
              </label>
              <input
                type={key !== "date" ? "text" : "date"}
                value={value}
                id={key}
                name={key}
                onChange={onChange}
              />
            </div>
          );
        })}
        <Button title="Submit" color="blue" />
      </form>
    </div>
  );
}
