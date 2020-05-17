﻿import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import UserTemplate from '../templates/UserTemplate';
import { Input, Select, Button } from '../components/atoms';
import { addItem } from '../actions';
import Header from '../components/molecules/Header';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 30vw;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 70px;
  padding-right: 70px;
  justify-content: flex-start;

  @media (max-width: 1355px) {
    width: 40vw;
    padding-left: 50px;
    padding-right: 50px;
  }
  @media (max-width: 700px) {
    padding-left: 30px;
    padding-right: 30px;
    width: 100%;
  }
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 150px 80px;
  align-items: center;
  gap: 10px;

  .grid-label {
    grid-column: 1/2;
  }

  .grid-button {
    justify-self: end;
    align-self: center;
    grid-column: 2/3;
    margin-top: 20px;
  }
  input {
    text-align: center;
  }
`;

const NewPage = ({ handleAddItem, items, history }) => {
  const categoryOptions = [...new Set(items.map((item) => item.category))];
  const unitsOptions = [...new Set(items.map((item) => item.unit))];

  const handleRedirect = (route) => history.push(route);

  return (
    <UserTemplate>
      <StyledWrapper>
        <Header
          titleText="New Item"
          subTitleText="Fill out the form to add a new item"
        />
        <Formik
          initialValues={{
            name: '',
            stock: '',
            maxStock: '',
            minStock: '',
            category: '',
            unit: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
            handleAddItem(values);
            handleRedirect('/');
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'required';
            } else if (!values.category) {
              errors.category = 'required';
            } else if (
              !/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/i.test(
                values.stock,
              )
            ) {
              errors.stock = 'wrong number';
            } else if (
              !/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/i.test(
                values.maxStock,
              )
            ) {
              errors.maxStock = 'wrong number';
            } else if (
              !/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/i.test(
                values.minStock,
              )
            ) {
              errors.minStock = 'wrong number';
            } else if (!values.unit) {
              errors.unit = 'required';
            }
            return errors;
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <StyledForm onSubmit={handleSubmit}>
              <label className="grid-label" htmlFor="name">
                Name:
              </label>
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <ErrorMessage name="name" />
              <label className="grid-label" htmlFor="category">
                Category:
              </label>
              <Select
                label
                options={categoryOptions}
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              />
              <ErrorMessage name="category" />
              <label className="grid-label" htmlFor="stock">
                Stock:
              </label>
              <Input
                type="number"
                name="stock"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.stock}
              />
              <ErrorMessage name="stock" />
              <label className="grid-label" htmlFor="maxStock">
                Max Stock:
              </label>
              <Input
                type="number"
                name="maxStock"
                placeholder="max"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maxStock}
              />
              <ErrorMessage name="maxStock" />
              <label className="grid-label" htmlFor="minStock">
                Min Stock:
              </label>
              <Input
                type="number"
                name="minStock"
                placeholder="min"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.minStock}
              />
              <ErrorMessage name="minStock" />
              <label className="grid-label" htmlFor="unit">
                Units:
              </label>
              <Select
                placeholder="chose unit"
                label
                options={unitsOptions}
                name="unit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.unit}
              />
              <ErrorMessage name="unit" />
              <Button
                className="grid-button"
                type="submit"
                disabled={isSubmitting}
              >
                Add Item
              </Button>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </UserTemplate>
  );
};

NewPage.propTypes = {
  handleAddItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      stock: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      minStock: PropTypes.number.isRequired,
      maxStock: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleAddItem: (item) => dispatch(addItem(item)),
});

const mapStateToProps = (state) => {
  return { items: state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(NewPage));
