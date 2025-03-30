// page for creating flashcards

import React, { useEffect, useState } from "react";
import CreateGroup from "../../components/CreateGroup";
import CreateTerm from "../../components/CreateTerm";
import { Formik, Form } from "formik";
import Button from "../../components/ui/button/Button";
import { flashcardSchema } from "../../schema/validation";
import Toast from "../../components/ui/toast/Toast";
import DropDown from "../../components/ui/dropdown/DropDown";
import { useLocation } from "react-router-dom";

const CreateFlashcard = () => {
  const location = useLocation();
  let [selectedDecks, setSelectedDecks] = useState(
    location.state?.selectedDeckId ? [location.state.deck] : []
  );
  const [toast, setToast] = useState(false);
  const createCardHandler = async (data) => {
    try {
      const { terms } = data;
      // Loop through each term and send a request
      if(typeof selectedDecks[0]=="object")
          selectedDecks = [selectedDecks[0]._id]
      const promises = terms.map(async (termData) => {
        const requestBody = {
          userId: "67e4289532cd6538e2b05954",
          deckName: selectedDecks,
          term: termData.term,
          defination: termData.defination,
          isImage: termData.image || null,
        };

        console.log("Sending Data:", requestBody);

        const response = await fetch("/api/flash/createcard/create", {
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
      });
      const results = await Promise.all(promises);
      console.log("All Cards Created:", results);
    } catch (error) {
      console.error("Error creating cards:", error.message);
    }
  };

  return (
    <>
      {/* select Group  */}
      <DropDown setSelectedDecks={setSelectedDecks} preSelectedDecks={selectedDecks} />

      <Formik
        initialValues={{
          terms: [
            {
              id: Date.now(),
              deckname: "",
              term: "",
              defination: "",
              image: null,
            },
          ],
        }}
        // validating and dispatching the form data to redux state on onSubmit
        validationSchema={flashcardSchema}
        onSubmit={(values, action) => {
          action.resetForm();

          createCardHandler(values);
          // send the values to the route to add the card into db

          setToast(true);

          // After 2 seconds, set the toast variable to false to hide the toast message
          setTimeout(() => {
            setToast(false);
          }, 2000);
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
                />
              )}

              {/* Create Term component */}
              <CreateTerm setFieldValue={setFieldValue} values={values} />
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
                text={"Create Flashcard"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateFlashcard;
