// page for creating flashcards

import React, { useState } from "react";
import CreateGroup from "../../components/CreateGroup";
import { Formik, Form } from "formik";
import Button from "../../components/ui/button/Button";
import { DeckSchema } from "../../schema/DeckSchema";
import Toast from "../../components/ui/toast/Toast";
import { TbFileDescription } from "react-icons/tb";

const CreateDeck = () => {
  const [toast, setToast] = useState(false);
//   send create deck
const createDeckHandler = async (data) => {
  console.log(data)
  try {
        const requestBody = {
         name : data.name,
         description : data.description ,
         userId : "67e4289532cd6538e2b05954"
        };

        console.log("Sending Data:", requestBody);

        const response = await fetch("/api/flash/createdeck/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || "Something went wrong!");
        }

        return response.json();
      
      const results = await Promise.all(promises);
      console.log("All Cards Created:", results);
  } catch (error) {
    console.error("Error creating cards:", error.message);
  }
};

  return (
    <Formik
      initialValues={{
        id: "",
        name:"",
        description:"",
      }}
      // validating and dispatching the form data to redux state on onSubmit
      validationSchema={DeckSchema}
      onSubmit={(values, action) => {
        values.id = Date.now();
        action.resetForm();

        // send the values to the route to add the deck into db
        createDeckHandler(values)

        setToast(true);

        // After 2 seconds, set the toast variable to false to hide the toast message
        setTimeout(() => {
          setToast(false);
        }, 4000);
      }}
      validateOnMount
    >
      {({ values, isValid, setFieldValue, isSubmitting, dirty }) => (
        <Form autoComplete="false">
          <section className="mb-10 flex flex-col gap-10">
            {/* toast component for letting the user know that their flashcard is created */}
            {toast && (
              <Toast
                fn={() => setToast(false)}
                toastClass={!toast ? "-translate-y-96" : "translate-y-0"}
                data={"deck"}
              />
            )}

            {/* Create Group component */}
            <CreateGroup values={values} setFieldValue={setFieldValue} />
          </section>

          <div className="mx-auto text-center">
            {/* button for submiting the flashcard */}
            <Button
              data-testid="submit-form"
              disabled={!(isValid && dirty)}
              type="submit"
              btnclass={`font-semibold rounded-md text-white text-xl px-14 py-4 ${
                !isValid ? "bg-red-200" : "bg-red-600"
              }`}
              text={"Create Deck"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateDeck;
