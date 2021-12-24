import { useRef, useState } from "react";

import "./form.css";
import Message from "./Message";

const Form = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const cityRef = useRef();
  const phoneRef = useRef();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email) => {
    let re = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+.[a-zA-Z]{2,7}$/g;

    return re.test(email.trim());
  };

  const isValidPhone = (phone) => {
    let re = /[0-9]{10}/;

    return re.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    const city = cityRef.current.value;
    const phone = phoneRef.current.value;

    if (
      !name.trim() ||
      !email.trim() ||
      !pass.trim() ||
      !city.trim() ||
      !phone.trim()
    ) {
      setError("Please fill all the below fields.");
      nameRef.current.focus();
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid Email.");
      emailRef.current.focus();
      return;
    }

    if (!isValidPhone(phone) || phone.length > 10) {
      setError(
        "Invalid Phone Number (Only Numbers Allowed AND must be 10 chars)."
      );

      phoneRef.current.focus();

      return;
    }

    if (pass.length < 8) {
      setError("Password must be 8 characters long.");

      phoneRef.current.focus();
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  return (
    <>
      <div className="error">
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">Form Submitted Successfully.</Message>
        )}
      </div>

      <form action="#" className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          placeholder="Enter your Name"
          onChange={() => setError(null)}
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={() => setError(null)}
          type="text"
          id="email"
          ref={emailRef}
          placeholder="Enter your Email"
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={() => setError(null)}
          type="password"
          id="password"
          ref={passRef}
          placeholder="Enter your Password"
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          onChange={() => setError(null)}
          id="city"
          ref={cityRef}
          placeholder="Enter your City"
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          ref={phoneRef}
          onChange={() => setError(null)}
          placeholder="Enter your Phone Number"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
