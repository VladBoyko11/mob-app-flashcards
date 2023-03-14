import React from "react";
import { Button, Form } from "react-bootstrap";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/FormControl";
import { connect, ConnectedProps } from "react-redux";
import { addDevice, addPhoto } from "../../redux/adminPageSlice";
import redirectToSomePage from "../common/RedirectToSomePage"
import { Device } from "../../redux/types";

const AddNewDevice: React.FC<AddNewDevicePropsType> = (props) => {
  const submitForm: FormSubmitHandler = (formData: {
    deviceName?: string;
    devicePrice?: number;
    deviceBrand?: number;
    deviceType?: number;
  }) => {
      props.addDevice({
        name: formData.deviceName,
        price: formData.devicePrice,
        brandId: formData.deviceBrand,
        typeId: formData.deviceType,
      })
    redirectToSomePage("/admin-page", { replace: true });
  };
  return <AddNewDeviceReduxForm onSubmit={submitForm} {...props} />;
};

const AddNewDeviceForm: React.FC<InjectedFormProps<Device>> = ({handleSubmit}) => {
  const selectPhoto = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement 
    if (target.files) {
      addPhoto(target.files[0]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="name">Device name</Form.Label>
        <Field id="name" placeholder="name" name="deviceName" component={Input} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="price">Device price</Form.Label>
        <Field id="price" placeholder="price" name="devicePrice" component={Input} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="brand">Brand</Form.Label>
        <Field id="brand" placeholder="brand" name="deviceBrand" component={Input} />
      </Form.Group>
      <Form.Group >
        <Form.Label htmlFor="type">Type</Form.Label>
        <Field id="type" placeholder="type" name="deviceType" component={Input} />
      </Form.Group>
      <Form.Group >
        <Form.Label className={"me-3 form-label"} htmlFor={"customFile"}>
          Img
        </Form.Label>
        <input
          type="file"
          className="'mt-1 mb-2 form-control"
          id="customFile"
          onChange={selectPhoto}
        />
      </Form.Group>
      <Button className={"btn-warning"} type="submit">
        Create
      </Button>
    </Form>
  );
};

const AddNewDeviceReduxForm = reduxForm({
  form: "addNewBrand",
})(AddNewDeviceForm);

const connector = connect(() => ({}), {addDevice, addPhoto})
type ReduxPropsType = ConnectedProps<typeof connector>
type AddNewDevicePropsType = ReduxPropsType

export default connector(AddNewDevice);
