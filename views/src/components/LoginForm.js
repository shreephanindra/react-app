import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Toast, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import { login } from "../redux/actions/auth-actions/loginAction";

// form validation useing Yup
const validate = () =>
  Yup.object({
    username: Yup.string()
      .min(2, "Must be more than one character")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("This field is required")
  });

function LoginForm() {
  const dispatch = useDispatch();

  const loginUser = user => {
    dispatch(login(user))
      .then(res => {
        toast.success(res, {
          position: toast.POSITION.BOTTOM_LEFT,
          transition: Slide
        });
      })
      .catch(err => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: false
        });
      });
  };

  return (
    <Container>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          const newUser = {
            username: values.username,
            password: values.password
          };

          loginUser(newUser);
          setSubmitting(false);
        }}>
        <Form>
          <div className='form-group'>
            <Field
              name='username'
              className='form-control'
              placeholder='Enter username'
              required
            />
            <ErrorMessage component={Toast} name='username' />
          </div>
          <div className='form-group'>
            <Field
              type='password'
              name='password'
              className='form-control'
              placeholder='Enter password'
              required
            />
            <ErrorMessage component={Toast} name='password' />
          </div>
          <Button variant='primary' type='submit'>
            Submit{" "}
          </Button>{" "}
        </Form>
      </Formik>
    </Container>
  );
}

export default LoginForm;
