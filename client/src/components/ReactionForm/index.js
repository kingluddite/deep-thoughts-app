import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import { ADD_REACTION } from "../../utils/mutations";

const ReactionForm = ({ thoughtId }) => {
  const [addReaction, { error }] = useMutation(ADD_REACTION);
  const [reactionBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addReaction({
        variables: { reactionBody, thoughtId },
      });

      // clear form values
      setBody("");
      setCharacterCount(0);
    } catch (e) {
      /* handle error */
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 200 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          value={reactionBody}
          placeholder="Leave a reaction to this thought..."
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ReactionForm;
