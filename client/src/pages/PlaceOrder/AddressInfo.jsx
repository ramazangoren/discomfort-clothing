import React from "react";

const AddressInfo = ({onChangeHandler, data}) => {
  return (
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input
          name="firstName"
          onChange={onChangeHandler}
          value={data.firstName}
          type="text"
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          onChange={onChangeHandler}
          value={data.lastName}
          type="text"
          placeholder="Last Name"
          required
        />
      </div>
      <input
        name="email"
        onChange={onChangeHandler}
        value={data.email}
        type="email"
        placeholder="Email Address"
        required
      />
      <input
        name="street"
        onChange={onChangeHandler}
        value={data.street}
        type="text"
        placeholder="Street"
        required
      />
      <div className="multi-fields">
        <input
          name="city"
          onChange={onChangeHandler}
          value={data.city}
          type="text"
          placeholder="City"
          required
        />
        <input
          name="state"
          onChange={onChangeHandler}
          value={data.state}
          type="text"
          placeholder="State"
          required
        />
      </div>

      <div className="multi-fields">
        <input
          name="zipcode"
          onChange={onChangeHandler}
          value={data.zipcode}
          type="text"
          placeholder="Zip Code"
          required
        />
        <input
          name="country"
          onChange={onChangeHandler}
          value={data.country}
          type="text"
          placeholder="Country"
          required
        />
      </div>
      <input
        name="phone"
        onChange={onChangeHandler}
        value={data.phone}
        type="text"
        placeholder="Phone"
        required
      />
    </div>
  );
};

export default AddressInfo;
