import axios, { AxiosError } from "axios";
import Button from "../Button/Button";
import styles from "./EventListItem.module.scss";
import { showToast } from "../../utils/showToast";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { formatDateForInput } from "../../utils/dataFormatter";
import { apiUrl } from "../../utils/apiUrl";

interface EventListItemProps {
  id: string;
  name: string;
  surname: string;
  email: string;
  date: Date;
  setToastInfo: Dispatch<SetStateAction<{ message: string; color: string }>>;
  setForceFetchAfterDelete: Dispatch<SetStateAction<boolean>>;
  setForceFetchAfterUpdate: Dispatch<SetStateAction<boolean>>;
}

interface FormFields {
  newName: string;
  newSurname: string;
  newEmail: string;
  newDate: string;
}

export default function EventListItem({
  id,
  name,
  surname,
  email,
  date,
  setToastInfo,
  setForceFetchAfterUpdate,
  setForceFetchAfterDelete,
}: EventListItemProps) {
  const [formFields, setFormFields] = useState<FormFields>({
    newName: "",
    newSurname: "",
    newEmail: "",
    newDate: "",
  });
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showUpdateOptions, setShowUpdateOptions] = useState<boolean>(false);

  const fieldsArray: string[][] = Object.entries(formFields);
  const { newName, newSurname, newEmail, newDate } = formFields;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: name === "newDate" ? formatDateForInput(value) : value,
    }));
  };

  const onDeleteHandler = async (): Promise<void> => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`${apiUrl}/api/v1/event/${id}`);
      showToast("Event successfully deleted!", "green", setToastInfo);
      setForceFetchAfterDelete(true);
    } catch (error) {
      showToast(
        "Error occurred when data deleting, please try again later.",
        "red",
        setToastInfo
      );
    } finally {
      setIsDeleting(false);
    }
  };
  const onEnableUpdateHandler = (): void => {
    setShowUpdateOptions(true);
  };
  const onUpdateHandler = async (): Promise<void> => {
    if (!showUpdateOptions) {
      return;
    } else {
      if (isUpdating) {
        return;
      }

      try {
        setIsUpdating(true);
        let url = `${apiUrl}/api/v1/event/${id}?`;
        if (
          newName.length === 0 &&
          newSurname.length === 0 &&
          newEmail.length === 0 &&
          newDate.length === 0
        ) {
          showToast(
            "You have not provided any argument to update.",
            "red",
            setToastInfo
          );
          return;
        }

        const queryParams: string[] = [];
        fieldsArray.forEach(([key, value]) => {
          if (value.length !== 0) {
            queryParams.push(`${key.slice(3).toLowerCase()}=${value}`);
          }
        });
        url += queryParams.join("&");
        await axios.patch(url);
        showToast("Event successfully updated!", "green", setToastInfo);
        setForceFetchAfterUpdate(true);
        setShowUpdateOptions(false);
      } catch (error) {
        if (error instanceof AxiosError && error.message) {
          if (error?.response?.data.message[0] === "Invalid email format") {
            showToast(
              "Invalid email format, please try again",
              "red",
              setToastInfo
            );
          } else {
            showToast(
              "Error occurred when data updating, please try again later.",
              "red",
              setToastInfo
            );
          }
        } else {
          showToast("An unexpected error occurred.", "red", setToastInfo);
        }
      } finally {
        setIsUpdating(false);
      }
      setFormFields({
        newName: "",
        newSurname: "",
        newEmail: "",
        newDate: "",
      });
    }
  };
  const onCancelClickHandler = () => {
    setShowUpdateOptions(false);
  };
  return (
    <div className={styles.container}>
      {!showUpdateOptions ? (
        <div className={styles.dataContainer}>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Surname:</strong> {surname}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Date:</strong> {date.toString().split("T")[0]}
          </p>
        </div>
      ) : (
        <form className={styles.updateContainer}>
          {fieldsArray.map((el, index) => {
            const [key, value] = el;
            return (
              <div className={styles.dataSubContainer} key={index}>
                <label htmlFor={key}>
                  <strong>{key.slice(3)}:</strong>{" "}
                </label>
                <input
                  type={key !== "newDate" ? "text" : "date"}
                  value={value}
                  id={key}
                  name={key}
                  onChange={onChange}
                />
              </div>
            );
          })}
        </form>
      )}
      <div className={styles.btnsContainer}>
        <span className={styles.cancel} onClick={onDeleteHandler}>
          X
        </span>
        <Button
          onClickHandler={onCancelClickHandler}
          title="Cancel"
          color="red"
        />
        {showUpdateOptions ? (
          <Button onClickHandler={onUpdateHandler} title="Save" color="blue" />
        ) : (
          <Button
            onClickHandler={onEnableUpdateHandler}
            title="Update"
            color="blue"
          />
        )}
      </div>
    </div>
  );
}
